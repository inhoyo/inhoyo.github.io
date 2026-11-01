import json
import os
import urllib.request
from datetime import date, datetime, time, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import icalendar
import recurring_ical_events


TIME_ZONE = ZoneInfo("Europe/Berlin")
ICS_URL = os.environ["ICS_URL"]
OUTPUT_FILE = Path("events.json")


def next_month(year: int, month: int) -> tuple[int, int]:
    if month == 12:
        return year + 1, 1
    return year, month + 1


def as_berlin_datetime(value) -> datetime:
    if isinstance(value, datetime):
        if value.tzinfo is None:
            return value.replace(tzinfo=TIME_ZONE)
        return value.astimezone(TIME_ZONE)

    if isinstance(value, date):
        return datetime.combine(value, time.min, tzinfo=TIME_ZONE)

    raise TypeError(f"Unsupported calendar date: {value!r}")


def main() -> None:
    now = datetime.now(TIME_ZONE)

    # Match the website: current month through the start of the month
    # twelve months later.
    start_year = now.year
    start_month = now.month
    end_year, end_month = start_year, start_month

    for _ in range(12):
        end_year, end_month = next_month(end_year, end_month)

    period_start = datetime(start_year, start_month, 1, tzinfo=TIME_ZONE)
    period_end = datetime(end_year, end_month, 1, tzinfo=TIME_ZONE)

    request = urllib.request.Request(
        ICS_URL,
        headers={"User-Agent": "GitHub-Pages-calendar-date-sync/1.0"}
    )

    with urllib.request.urlopen(request, timeout=30) as response:
        calendar_data = response.read()

    calendar = icalendar.Calendar.from_ical(calendar_data)

    raw_events = [
        component
        for component in calendar.walk()
        if component.name == "VEVENT"
    ]
    print(f"VEVENT-Einträge im ICS-Feed: {len(raw_events)}")

    # Nur Startdatum und Wiederholungsstatus protokollieren – keine Termintitel.
    for component in raw_events:
        start = component.get("DTSTART")
        if start:
            print(
                f"Terminstart: {start.dt}; "
                f"wiederkehrend: {bool(component.get('RRULE'))}"
            )

    dates_with_events: set[str] = set()

    occurrences = recurring_ical_events.of(calendar).between(
        period_start,
        period_end
    )
    print(f"Termine im gesuchten Zeitraum: {len(occurrences)}")

    for event in occurrences:
        start_property = event.get("DTSTART")
        if start_property is None:
            continue

        event_start = as_berlin_datetime(start_property.dt)
        start_day = event_start.date()

        end_property = event.get("DTEND")

        if end_property is None:
            last_day = start_day
        else:
            event_end = as_berlin_datetime(end_property.dt)
            last_day = event_end.date()

            # Calendar end times are exclusive when the event ends at midnight.
            if event_end.time() == time.min and last_day > start_day:
                last_day -= timedelta(days=1)

            # Ensure that a same-day event marks its date.
            if last_day < start_day:
                last_day = start_day

        day = start_day
        while day <= last_day:
            if period_start.date() <= day < period_end.date():
                dates_with_events.add(day.isoformat())
            day += timedelta(days=1)

    result = {
        "dates": sorted(dates_with_events),
        "updated": now.isoformat()
    }

    OUTPUT_FILE.write_text(
        json.dumps(result, indent=2) + "\n",
        encoding="utf-8"
    )

    print(f"Wrote {len(dates_with_events)} event dates to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()