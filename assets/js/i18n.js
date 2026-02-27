/**
 * i18n.js — Language switcher & translations for inhoyo.github.io
 * Languages: English (en) · German (de) · Korean (ko)
 */

/* ─── CSS (injected once) ──────────────────────────────────────────────── */
(function injectStyle() {
  const s = document.createElement('style');
  s.textContent = `
    #lang-switcher {
      position: fixed;
      bottom: 1.6em;
      right: 1.6em;
      z-index: 10000;
      display: flex;
      gap: 3px;
      background: rgba(20,20,30,0.72);
      padding: 5px 6px;
      border-radius: 8px;
      backdrop-filter: blur(6px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.35);
    }
    .lang-btn {
      background: transparent;
      color: rgba(255,255,255,0.65);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 5px 11px;
      font-size: 0.72em;
      font-family: inherit;
      cursor: pointer;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      transition: background 0.18s, color 0.18s, border-color 0.18s;
      line-height: 1;
    }
    .lang-btn:hover {
      background: rgba(255,255,255,0.12);
      color: #fff;
      border-color: rgba(255,255,255,0.45);
    }
    .lang-btn.active {
      background: rgba(255,255,255,0.22);
      color: #fff;
      border-color: rgba(255,255,255,0.55);
      font-weight: 700;
    }
  `;
  document.head.appendChild(s);
}());

/* ─── Translations ─────────────────────────────────────────────────────── */
const TRANSLATIONS = {

  /* ── ENGLISH ─────────────────────────────────────────────────────────── */
  en: {
    /* Navigation */
    'nav.home':         'Home',
    'nav.about':        'About',
    'nav.research':     'Research',
    'nav.publications': 'Publications',
    'nav.contact':      'Contact',

    /* Banner */
    'banner.role.scientist': 'Scientist',
    'banner.role.phd':       'PhD Candidate',
    'banner.role.lecturer':  'University Lecturer',
    'banner.institution':    'Fraunhofer Heinrich Hertz Institute (HHI), Berlin',
    'banner.tagline':        'Terahertz Communications &amp; Photonic Networks',
    'banner.btn.about':      'About Me',
    'banner.btn.research':   'Research',
    'banner.more':           'Learn More',

    /* Intro */
    'intro.title': 'Research Overview',
    'intro.text':  'My work is centred on high-capacity Terahertz (THz) wireless communications<br />and their integration into future 6G photonic network infrastructures.<br />At Fraunhofer HHI I develop advanced digital signal processing techniques<br />and experimental systems pushing beyond 100&thinsp;Gbit/s over THz wireless links.<br />I also serve as a <strong>University Lecturer</strong> at HTW Berlin and BHT Berlin,<br />teaching communications engineering at Bachelor&rsquo;s and Master&rsquo;s level.',
    'intro.icon.thz':     'THz Wireless',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'Photonic Networks',

    /* Affiliations */
    'affiliations.title': 'Affiliations &amp; Memberships',

    /* Research spotlights */
    'research.1.title': 'Terahertz Wireless<br />Communications',
    'research.1.text':  'I design and characterise experimental high-speed wireless transmission systems operating in the 300&thinsp;GHz band (WR-3). My research covers the full signal chain &mdash; from photonic upconversion using PIN photodiode and WR3-coupled transmitters through to receiver-side DSP and link characterisation &mdash; with demonstrated throughputs exceeding 109&thinsp;Gbit/s over fiber-integrated point-to-point THz links, and a record <strong>221&thinsp;Gb/s dual-polarisation</strong> transmission over 500&thinsp;m.',
    'research.2.title': 'Probabilistic Constellation<br />Shaping &amp; Rate Adaptation',
    'research.2.text':  'A central theme of my research is Probabilistic Constellation Shaping (PCS) applied to THz wireless links. PCS enables flexible, rate-adaptive modulation by biasing the symbol distribution toward the Shannon limit. I study time-adaptive PCS for combined optical/THz links, the impact of photodiode nonlinearities on shaped transmissions, and their mitigation via neural-network-based DSP.',
    'research.3.title': 'Converged Optical &amp; THz<br />Links for 6G Networks',
    'research.3.text':  'I investigate the seamless integration of THz wireless segments into fiber-optic backhaul networks targeting future 6G requirements. This includes analysis of weather-related link availability for outdoor THz deployments, high-capacity system design supporting 6G transport, and adaptive baseband techniques for converged optical/THz links &mdash; the subject of my PhD dissertation at TU Berlin.',

    /* Publications */
    'pub.title':     'Publications',
    'pub.subtitle':  'Complete list of first-author and co-authored publications.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': 'Submitted',
    'pub.coauthor':  'Co-Author',

    /* Contact */
    'contact.title':      'Get in Touch',
    'contact.text':       'I welcome discussions on research collaborations, project inquiries,<br />and opportunities in THz communications and photonic networks.',
    'contact.dept':       'Department of Photonic Networks and Systems',
    'contact.city':       'Berlin, Germany',
    'contact.btn.about':  'About Me',
    'contact.btn.scholar':'Google Scholar Profile',

    /* ── About page ─────────────────────────────────────── */
    'about.page.title':   'About | In-Ho Baek',
    'about.header':       'About Me',
    'about.subtitle':     'Scientist &amp; PhD Candidate &mdash; Fraunhofer HHI, Berlin',

    'about.profile.title':'Professional Profile',
    'about.profile.p1':   'I am a Scientist at the <strong>Fraunhofer Institute for Telecommunications, Heinrich Hertz Institute (HHI)</strong>, Berlin, within the Department of Photonic Networks and Systems, where I have been working since July 2021. In parallel, I am pursuing a <strong>PhD (Dr.-Ing.)</strong> at <strong>Technische Universit&auml;t Berlin (TUB)</strong> under the working title <em>&ldquo;Investigating Adaptive Baseband Techniques for Converged Optical / THz Wireless Links.&rdquo;</em>',
    'about.profile.p2':   'My research focuses on high-capacity Terahertz (THz) wireless communications and their integration into next-generation 6G photonic network infrastructures. I develop advanced Digital Signal Processing (DSP) algorithms for rate-adaptive THz links and conduct experimental characterisation of photonic transmitter components &mdash; including PIN photodiode and WR3-coupled transmitter configurations &mdash; for probabilistically shaped, high-speed THz wireless transmission beyond 100&thinsp;Gbit/s. I am also actively exploring neural-network-based approaches to mitigate transceiver nonlinearities in THz systems.',
    'about.profile.p3':   'Alongside my research role, I have served as a lecturer for Information and Communication programmes at Berlin universities, covering topics at the intersection of communications engineering and signal processing.',

    'about.edu.title':              'Education',
    'about.edu.phd.title':          'PhD &mdash; Electrical Engineering / Information Technology',
    'about.edu.phd.body':           '<strong>Technische Universit&auml;t Berlin (TUB)</strong>, Berlin &mdash; 2021&ndash;2026<br />Working title: <em>Investigating Adaptive Baseband Techniques for Converged Optical / THz Wireless Links</em><br />Desired degree: Dr.-Ing.',
    'about.edu.msc.title':          'M.Sc. &mdash; Electrical Engineering / Information Technology',
    'about.edu.msc.body':           '<strong>Karlsruhe Institute of Technology (KIT)</strong>, Karlsruhe &mdash; 2018&ndash;2021<br />Focal points: Communication Engineering &amp; Optical Communications<br />Master Thesis (at IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':     'Exchange Programme &mdash; Electrical Engineering &amp; Philosophy',
    'about.edu.exchange.body':      '<strong>Korea Advanced Institute of Science and Technology (KAIST)</strong>, Daejeon, South Korea &mdash; 2018&ndash;2019<br />Courses: Radar Systems Engineering &bull; MIMO Wireless Communications &bull; Philosophy of Science<br />Supported by the <strong>Baden-Württemberg Scholarship 2018</strong>',
    'about.edu.bsc.title':          'B.Sc. &mdash; Electrical / Information Engineering',
    'about.edu.bsc.body':           '<strong>Karlsruhe Institute of Technology (KIT)</strong>, Karlsruhe &mdash; 2013&ndash;2018<br />Bachelor Thesis (at IMN, KIT): <em>Investigation of the Timing Jitter of Superconducting Single Photon Detectors with Varying Meander Shapes</em>',

    'about.exp.title':              'Professional Experience',
    'about.exp.hhi.title':          'Scientist &mdash; Fraunhofer Heinrich Hertz Institute (HHI), Berlin',
    'about.exp.hhi.period':         'July 2021 &ndash; present',
    'about.exp.hhi.dept':           'Department of Photonic Networks and Systems',
    'about.exp.hhi.intro':          'Research in optical and THz communications, including:',
    'about.exp.hhi.li1':            'Advanced DSP development for rate-adaptive THz wireless communications',
    'about.exp.hhi.li2':            'DSP on chip for high-speed coherent 800G ASICs',
    'about.exp.hhi.li3':            'Device and experimental setup characterisation',
    'about.exp.hhi.li4':            'Project management and scientific collaboration',
    'about.exp.htw.title':          'Lecturer &mdash; HTW Berlin University of Applied Sciences (HTW Berlin)',
    'about.exp.htw.period':         'October 2025 &ndash; March 2026',
    'about.exp.htw.prog':           'B.Sc. programme: Information and Communication Technology',
    'about.exp.htw.intro':          'Preparation and delivery of lectures, exercises, and assessments covering:',
    'about.exp.htw.li1':            'Fundamentals of telecommunications and communication systems',
    'about.exp.htw.li2':            'Digital signal processing and modulation schemes',
    'about.exp.htw.li3':            'Introduction to wireless and optical transmission systems',
    'about.exp.bht.title':          'Lecturer &mdash; Berlin University of Applied Sciences and Technology (BHT Berlin)',
    'about.exp.bht.period':         'October 2022 &ndash; March 2024',
    'about.exp.bht.prog':           'M.Sc. programme: Information and Communication Technology',
    'about.exp.bht.intro':          'Design and delivery of advanced graduate-level lectures and exercises covering:',
    'about.exp.bht.li1':            'Advanced communications engineering and system design',
    'about.exp.bht.li2':            'Optical and wireless transmission technologies',
    'about.exp.bht.li3':            'Channel coding, adaptive modulation, and probabilistic shaping concepts',
    'about.exp.thesis.title':       'Master Thesis &mdash; Institute of Photonics and Quantum Electronics (IPQ), KIT',
    'about.exp.thesis.period':      'October 2020 &ndash; April 2021',
    'about.exp.thesis.body':        'Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems',

    'about.pub.title':      'Publications',
    'about.pub.first':      'First Author',
    'about.pub.co':         'Co-Author',
    'about.pub.submitted':  '[Submitted &amp; In Review]',
    'about.pub.links':      '<a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Full list on Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore Profile</a>',

    'about.skills.title': 'Technical Skills',
    'about.skills.li1':   '<strong>Research Areas:</strong> Terahertz (THz) wireless communications, probabilistic constellation shaping (PCS), advanced digital signal processing, photonic upconversion, free-space and fiber-integrated optical communications',
    'about.skills.li2':   '<strong>Technologies:</strong> High-speed THz transmission systems (WR-3 band), PIN photodiode transmitters, WR3-coupled transmitters, coherent optical ASICs (800G), quadrature amplitude modulation (QAM)',
    'about.skills.li3':   '<strong>Engineering Tools:</strong> MATLAB (simulation &amp; DSP), experimental optical/THz testbeds, oscilloscopes and spectrum analysers, signal generators',
    'about.skills.li4':   '<strong>General:</strong> Electrical &amp; electronics engineering, communication system design, experimental characterisation, project management',

    'about.lang.title': 'Languages',
    'about.lang.li1':   '<strong>German</strong> &mdash; Native',
    'about.lang.li2':   '<strong>Korean</strong> (&#54620;&#44397;&#50612;) &mdash; Mother tongue',
    'about.lang.li3':   '<strong>English</strong> &mdash; Fluent (spoken and written)',

    'about.contact.title': 'Contact',
    'about.contact.body':  'Fraunhofer Institute for Telecommunications &mdash; Heinrich Hertz Institute (HHI)<br />Department of Photonic Networks and Systems, Berlin, Germany<br /><br />Email: <a href="mailto:in-ho.baek@hhi.fraunhofer.de">in-ho.baek@hhi.fraunhofer.de</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar Profile</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Author Profile</a>',
  },

  /* ── GERMAN ──────────────────────────────────────────────────────────── */
  de: {
    'nav.home':         'Startseite',
    'nav.about':        'Über mich',
    'nav.research':     'Forschung',
    'nav.publications': 'Publikationen',
    'nav.contact':      'Kontakt',

    'banner.role.scientist': 'Wissenschaftler',
    'banner.role.phd':       'Doktorand',
    'banner.role.lecturer':  'Lehrbeauftragter',
    'banner.institution':    'Fraunhofer Heinrich-Hertz-Institut (HHI), Berlin',
    'banner.tagline':        'Terahertz-Kommunikation &amp; Photonische Netzwerke',
    'banner.btn.about':      'Über mich',
    'banner.btn.research':   'Forschung',
    'banner.more':           'Mehr erfahren',

    'intro.title': 'Forschungsüberblick',
    'intro.text':  'Meine Forschung konzentriert sich auf hochkapazitive Terahertz (THz)-Funkkommunikation<br />und deren Integration in zukünftige 6G-Photoniknetzwerkinfrastrukturen.<br />Am Fraunhofer HHI entwickle ich fortschrittliche digitale Signalverarbeitungstechniken<br />und experimentelle Systeme für Datenraten über 100&thinsp;Gbit/s auf THz-Funkstrecken.<br />Darüber hinaus bin ich als <strong>Lehrbeauftragter</strong> an der HTW Berlin und BHT Berlin t&auml;tig<br />und unterrichte Kommunikationstechnik auf Bachelor- und Masterniveau.',
    'intro.icon.thz':     'THz-Funk',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'Photonische Netzwerke',

    'affiliations.title': 'Zugeh&ouml;rigkeiten &amp; Mitgliedschaften',

    'research.1.title': 'Terahertz-<br />Funkkommunikation',
    'research.1.text':  'Ich entwickle und charakterisiere experimentelle Hochgeschwindigkeits-Funkübertragungs&shy;systeme im 300&thinsp;GHz-Band (WR-3). Meine Forschung umfasst die gesamte Signalkette &mdash; von der photonischen Aufwärtskonvertierung mit PIN-Photodioden- und WR3-Senderbaugruppen bis zur empf&auml;ngerseitigen DSP und Streckencharakterisierung &mdash; mit nachgewiesenen Durchs&auml;tzen über 109&thinsp;Gbit/s und einem Rekordwert von <strong>221&thinsp;Gb/s Dual-Polarisation</strong> über 500&thinsp;m.',
    'research.2.title': 'Probabilistisches Konstellationsshaping<br />&amp; Ratenadaption',
    'research.2.text':  'Ein zentrales Thema meiner Forschung ist das probabilistische Konstellationsshaping (PCS) für THz-Funkverbindungen. PCS erm&ouml;glicht eine flexible, ratenadaptive Modulation durch Verschiebung der Symbolverteilung in Richtung der Shannon-Grenze. Ich untersuche zeitadaptives PCS für kombinierte optische/THz-Strecken, den Einfluss von Photodioden-Nichtlinearit&auml;ten und deren Kompensation mittels neuronaler Netzwerke.',
    'research.3.title': 'Konvergierte optische &amp; THz-<br />Verbindungen für 6G-Netze',
    'research.3.text':  'Ich untersuche die nahtlose Integration von THz-Funksegmenten in Glasfaser-Backhaul&shy;netzwerke für zukünftige 6G-Anforderungen. Dies umfasst die Analyse wetterabh&auml;ngiger Streckenverfügbarkeiten, Systementwicklung für hochkapazitive 6G-Transportnetze sowie adaptive Basisband&shy;techniken für konvergierte optische/THz-Verbindungen &mdash; das Thema meiner Doktorarbeit an der TU Berlin.',

    'pub.title':     'Publikationen',
    'pub.subtitle':  'Vollst&auml;ndige Liste der Erst- und Mitautoren-Publikationen.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': 'Eingereicht',
    'pub.coauthor':  'Mitautor',

    'contact.title':       'Kontakt aufnehmen',
    'contact.text':        'Ich freue mich über Anfragen zu Forschungskooperationen, Projekten<br />und M&ouml;glichkeiten im Bereich THz-Kommunikation und photonische Netzwerke.',
    'contact.dept':        'Abteilung Photonische Netze und Systeme',
    'contact.city':        'Berlin, Deutschland',
    'contact.btn.about':   'über mich',
    'contact.btn.scholar': 'Google Scholar Profil',

    'about.page.title':  'über mich | In-Ho Baek',
    'about.header':      'über mich',
    'about.subtitle':    'Wissenschaftler &amp; Doktorand &mdash; Fraunhofer HHI, Berlin',

    'about.profile.title':'Berufliches Profil',
    'about.profile.p1':   'Ich bin Wissenschaftler am <strong>Fraunhofer-Institut für Nachrichtentechnik, Heinrich-Hertz-Institut (HHI)</strong>, Berlin, in der Abteilung Photonische Netze und Systeme, wo ich seit Juli 2021 t&auml;tig bin. Parallel dazu promoviere ich an der <strong>Technischen Universit&auml;t Berlin (TUB)</strong> unter dem Arbeitstitel <em>&ldquo;Untersuchung adaptiver Basisbandtechniken für konvergierte optische/THz-Funkverbindungen.&rdquo;</em>',
    'about.profile.p2':   'Meine Forschung konzentriert sich auf hochkapazitive THz-Funkkommunikation und deren Integration in 6G-Photoniknetzwerke. Ich entwickle fortschrittliche DSP-Algorithmen für ratenadaptive THz-Strecken und führe experimentelle Charakterisierungen photonischer Sendebaugruppen durch &mdash; für probabilistisch geformte THz-Funkübertragungen über 100&thinsp;Gbit/s. Zudem erforsche ich neuronalnetzbasierte Ans&auml;tze zur Kompensation von Nichtlinearit&auml;ten.',
    'about.profile.p3':   'Neben meiner Forschungst&auml;tigkeit bin ich als Lehrbeauftragter für Informations- und Kommunikationsprogramme an Berliner Hochschulen t&auml;tig.',

    'about.edu.title':           'Ausbildung',
    'about.edu.phd.title':       'Promotion &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.phd.body':        '<strong>Technische Universit&auml;t Berlin (TUB)</strong>, Berlin &mdash; 2021&ndash;2026<br />Arbeitstitel: <em>Untersuchung adaptiver Basisbandtechniken für konvergierte optische/THz-Funkverbindungen</em><br />Angestrebter Abschluss: Dr.-Ing.',
    'about.edu.msc.title':       'M.Sc. &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.msc.body':        '<strong>Karlsruher Institut für Technologie (KIT)</strong>, Karlsruhe &mdash; 2018&ndash;2021<br />Schwerpunkte: Kommunikationstechnik &amp; Optische Kommunikation<br />Masterarbeit (am IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':  'Austauschprogramm &mdash; Elektrotechnik &amp; Philosophie',
    'about.edu.exchange.body':   '<strong>Korea Advanced Institute of Science and Technology (KAIST)</strong>, Daejeon, Südkorea &mdash; 2018&ndash;2019<br />Kurse: Radarsystemtechnik &bull; MIMO Funkübertragung &bull; Wissenschaftsphilosophie<br />Gef&ouml;rdert durch das <strong>Baden-Württemberg-Stipendium 2018</strong>',
    'about.edu.bsc.title':       'B.Sc. &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.bsc.body':        '<strong>Karlsruher Institut für Technologie (KIT)</strong>, Karlsruhe &mdash; 2013&ndash;2018<br />Bachelorarbeit (am IMN, KIT): <em>Untersuchung des Zeitjitters von supraleitenden Einzelphotonen-Detektoren mit verschiedenen M&auml;anderformen</em>',

    'about.exp.title':           'Berufliche Erfahrung',
    'about.exp.hhi.title':       'Wissenschaftler &mdash; Fraunhofer Heinrich-Hertz-Institut (HHI), Berlin',
    'about.exp.hhi.period':      'Juli 2021 &ndash; heute',
    'about.exp.hhi.dept':        'Abteilung Photonische Netze und Systeme',
    'about.exp.hhi.intro':       'Forschung in optischer und THz-Kommunikation, einschlie&szlig;lich:',
    'about.exp.hhi.li1':         'Entwicklung fortschrittlicher DSP für ratenadaptive THz-Funkkommunikation',
    'about.exp.hhi.li2':         'DSP auf Chip für hochgeschwindige koh&auml;rente 800G-ASICs',
    'about.exp.hhi.li3':         'Charakterisierung von Ger&auml;ten und experimentellen Aufbauten',
    'about.exp.hhi.li4':         'Projektmanagement und wissenschaftliche Zusammenarbeit',
    'about.exp.htw.title':       'Lehrbeauftragter &mdash; HTW Berlin, Berlin',
    'about.exp.htw.period':      'Oktober 2025 &ndash; M&auml;rz 2026',
    'about.exp.htw.prog':        'B.Sc.-Studiengang: Informations- und Kommunikationstechnik',
    'about.exp.htw.intro':       'Vorbereitung und Durchführung von Vorlesungen, übungen und Prüfungen, Kerninhalte:',
    'about.exp.htw.li1':         'Grundlagen der Telekommunikation und Kommunikationssysteme',
    'about.exp.htw.li2':         'Digitale Signalverarbeitung und Modulationsverfahren',
    'about.exp.htw.li3':         'Einführung in drahtlose und optische übertragungssysteme',
    'about.exp.bht.title':       'Lehrbeauftragter &mdash; BHT Berlin, Berlin',
    'about.exp.bht.period':      'Oktober 2022 &ndash; M&auml;rz 2024',
    'about.exp.bht.prog':        'M.Sc.-Studiengang: Informations- und Kommunikationstechnik',
    'about.exp.bht.intro':       'Konzeption und Durchführung fortgeschrittener Vorlesungen auf Masterniveau, Themen:',
    'about.exp.bht.li1':         'Fortgeschrittene Kommunikationstechnik und Systementwurf',
    'about.exp.bht.li2':         'Optische und drahtlose übertragungstechnologien',
    'about.exp.bht.li3':         'Kanalcodierung, adaptive Modulation und probabilistisches Shaping',
    'about.exp.thesis.title':    'Masterarbeit &mdash; Institut für Photonik und Quantenelektronik (IPQ), KIT',
    'about.exp.thesis.period':   'Oktober 2020 &ndash; April 2021',
    'about.exp.thesis.body':     'Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems',

    'about.pub.title':     'Publikationen',
    'about.pub.first':     'Erstautor',
    'about.pub.co':        'Mitautor',
    'about.pub.submitted': '[Eingereicht &amp; In Begutachtung]',
    'about.pub.links':     '<a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Vollst&auml;ndige Liste bei Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore Profil</a>',

    'about.skills.title': 'Technische Kompetenzen',
    'about.skills.li1':   '<strong>Forschungsgebiete:</strong> THz-Funkkommunikation, probabilistisches Konstellationsshaping (PCS), fortgeschrittene digitale Signalverarbeitung, photonische Aufwärtskonvertierung, freiraumoptische und faserbasierte Kommunikation',
    'about.skills.li2':   '<strong>Technologien:</strong> Hochgeschwindige THz-übertragungssysteme (WR-3-Band), PIN-Photodiodensender, WR3-Senderbaugruppen, koh&auml;rente optische ASICs (800G), Quadratur-Amplitudenmodulation (QAM)',
    'about.skills.li3':   '<strong>Werkzeuge:</strong> MATLAB (Simulation &amp; DSP), experimentelle optische/THz-Prüfst&auml;nde, Oszilloskope und Spektrumanalysatoren, Signalgeneratoren',
    'about.skills.li4':   '<strong>Allgemein:</strong> Elektro- &amp; Elektroniktechnik, Kommunikationssystementwurf, experimentelle Charakterisierung, Projektmanagement',

    'about.lang.title': 'Sprachkenntnisse',
    'about.lang.li1':   '<strong>Deutsch</strong> &mdash; Muttersprache',
    'about.lang.li2':   '<strong>Koreanisch</strong> (&#54620;&#44397;&#50612;) &mdash; Muttersprache',
    'about.lang.li3':   '<strong>Englisch</strong> &mdash; Flie&szlig;end (mündlich und schriftlich)',

    'about.contact.title': 'Kontakt',
    'about.contact.body':  'Fraunhofer-Institut für Nachrichtentechnik &mdash; Heinrich-Hertz-Institut (HHI)<br />Abteilung Photonische Netze und Systeme, Berlin, Deutschland<br /><br />E-Mail: <a href="mailto:in-ho.baek@hhi.fraunhofer.de">in-ho.baek@hhi.fraunhofer.de</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar-Profil</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE-Autorenprofil</a>',
  },

  /* ── KOREAN ──────────────────────────────────────────────────────────── */
  ko: {
    'nav.home':         '홈',
    'nav.about':        '소개',
    'nav.research':     '연구',
    'nav.publications': '논문',
    'nav.contact':      '연락처',

    'banner.role.scientist': '연구원',
    'banner.role.phd':       '박사 과정생',
    'banner.role.lecturer':  '대학 강사',
    'banner.institution':    '프라운호퍼 하인리히 헤르츠 연구소 (HHI), 베를린',
    'banner.tagline':        '테라헤르츠 통신 &amp; 포토닉 네트워크',
    'banner.btn.about':      '소개',
    'banner.btn.research':   '연구',
    'banner.more':           '더 알아보기',

    'intro.title': '연구 개요',
    'intro.text':  '저의 연구는 고용량 테라헤르츠(THz) 무선 통신과<br />미래 6G 포토닉 네트워크 인프라로의 통합에 초점을 맞추고 있습니다.<br />프라운호퍼 HHI에서 THz 무선 링크에서 100&thinsp;Gbit/s를 초과하는<br />고급 디지털 신호 처리 기술과 실험 시스템을 개발합니다.<br />또한 HTW 베를린과 BHT 베를린에서 <strong>대학 강사</strong>로서<br />학사 및 석사 수준의 통신 공학을 가르치고 있습니다.',
    'intro.icon.thz':     'THz 무선',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'포토닉 네트워크',

    'affiliations.title': '소속 및 회원 자격',

    'research.1.title': '테라헤르츠<br />무선 통신',
    'research.1.text':  '300&thinsp;GHz 대역(WR-3)에서 동작하는 실험적 고속 무선 전송 시스템을 설계하고 특성화합니다. 연구는 PIN 광검출기 및 WR3 결합 송신기를 이용한 광자 업변환부터 수신단 DSP 및 링크 특성화까지 전체 신호 체인을 포함합니다. 광섬유 집적 THz 링크에서 109&thinsp;Gbit/s를 초과하는 전송률과 500&thinsp;m 거리에서 기록적인 <strong>221&thinsp;Gb/s 이중 편파</strong> 전송을 시연했습니다.',
    'research.2.title': '확률적 성상 형성<br />&amp; 전송률 적응',
    'research.2.text':  '연구의 핵심 주제는 THz 무선 링크에 적용된 확률적 성상 형성(PCS)입니다. PCS는 심볼 분포를 섀넌 한계 방향으로 편향시켜 유연한 전송률 적응 변조를 가능하게 합니다. 광/THz 결합 링크를 위한 시간 적응형 PCS, 광검출기 비선형성의 영향, 그리고 신경망 기반 DSP를 통한 완화를 연구합니다.',
    'research.3.title': '6G 네트워크를 위한<br />광/THz 통합 링크',
    'research.3.text':  '미래 6G 요구사항을 목표로 광섬유 백홀 네트워크에 THz 무선 세그먼트를 원활히 통합하는 방법을 연구합니다. 야외 THz 배포를 위한 날씨 관련 링크 가용성 분석, 고용량 시스템 설계, 그리고 수렴된 광/THz 링크를 위한 적응형 기저대역 기술을 포함하며 &mdash; TU 베를린 박사 논문의 주제입니다.',

    'pub.title':     '논문',
    'pub.subtitle':  '제1저자 및 공동 저자 논문 전체 목록.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': '제출됨',
    'pub.coauthor':  '공동 저자',

    'contact.title':       '연락하기',
    'contact.text':        'THz 통신 및 포토닉 네트워크 분야의 연구 협력,<br />프로젝트 문의 및 기회에 대한 논의를 환영합니다.',
    'contact.dept':        '광자 네트워크 및 시스템 부서',
    'contact.city':        '베를린, 독일',
    'contact.btn.about':   '소개',
    'contact.btn.scholar': 'Google Scholar 프로필',

    'about.page.title':  '소개 | In-Ho Baek',
    'about.header':      '소개',
    'about.subtitle':    '연구원 &amp; 박사 과정생 &mdash; 프라운호퍼 HHI, 베를린',

    'about.profile.title':'전문 프로필',
    'about.profile.p1':   '저는 2021년 7월부터 베를린의 <strong>프라운호퍼 통신 연구소, 하인리히 헤르츠 연구소(HHI)</strong> 광자 네트워크 및 시스템 부서에서 연구원으로 근무하고 있습니다. 동시에 <strong>베를린 공과대학교(TUB)</strong>에서 <em>&ldquo;수렴된 광/THz 무선 링크를 위한 적응형 기저대역 기술 연구&rdquo;</em>라는 주제로 박사(Dr.-Ing.) 학위 과정 중입니다.',
    'about.profile.p2':   '연구는 고용량 테라헤르츠(THz) 무선 통신과 차세대 6G 포토닉 네트워크 인프라로의 통합에 초점을 맞춥니다. PIN 광검출기 및 WR3 결합 송신기를 포함한 광자 송신기 부품의 실험적 특성화와 100&thinsp;Gbit/s를 초과하는 고속 THz 무선 전송을 위한 고급 DSP 알고리즘을 개발합니다. 또한 THz 시스템의 비선형성 완화를 위한 신경망 기반 접근법을 연구합니다.',
    'about.profile.p3':   '연구 업무 외에도 베를린 대학에서 통신 공학과 신호 처리를 다루는 정보통신 프로그램의 강사로 활동하고 있습니다.',

    'about.edu.title':           '학력',
    'about.edu.phd.title':       '박사 &mdash; 전기공학 / 정보기술',
    'about.edu.phd.body':        '<strong>베를린 공과대학교 (TUB)</strong>, 베를린 &mdash; 2021&ndash;2026<br />논문 제목: <em>수렴된 광/THz 무선 링크를 위한 적응형 기저대역 기술 연구</em><br />목표 학위: Dr.-Ing.',
    'about.edu.msc.title':       '석사 &mdash; 전기공학 / 정보기술',
    'about.edu.msc.body':        '<strong>카를스루에 공과대학교 (KIT)</strong>, 카를스루에 &mdash; 2018&ndash;2021<br />전공: 통신 공학 &amp; 광통신<br />석사 논문 (IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':  '교환 프로그램 &mdash; 전기공학 &amp; 철학',
    'about.edu.exchange.body':   '<strong>한국과학기술원 (KAIST)</strong>, 대전, 대한민국 &mdash; 2018&ndash;2019<br />수강 과목: 레이더 시스템 공학 &bull; MIMO 무선 통신 &bull; 과학철학<br /><strong>바덴뷔르템베르크 장학금 2018</strong> 수혜',
    'about.edu.bsc.title':       '학사 &mdash; 전기 / 정보 공학',
    'about.edu.bsc.body':        '<strong>카를스루에 공과대학교 (KIT)</strong>, 카를스루에 &mdash; 2013&ndash;2018<br />학사 논문 (IMN, KIT): <em>Investigation of the Timing Jitter of Superconducting Single Photon Detectors with Varying Meander Shapes</em>',

    'about.exp.title':           '경력',
    'about.exp.hhi.title':       '연구원 &mdash; 프라운호퍼 하인리히 헤르츠 연구소 (HHI), 베를린',
    'about.exp.hhi.period':      '2021년 7월 &ndash; 현재',
    'about.exp.hhi.dept':        '광자 네트워크 및 시스템 부서',
    'about.exp.hhi.intro':       '광학 및 THz 통신 연구:',
    'about.exp.hhi.li1':         '전송률 적응형 THz 무선 통신을 위한 고급 DSP 개발',
    'about.exp.hhi.li2':         '고속 코히런트 800G ASIC을 위한 칩 기반 DSP',
    'about.exp.hhi.li3':         '장치 및 실험 설비 특성화',
    'about.exp.hhi.li4':         '프로젝트 관리 및 과학적 협력',
    'about.exp.htw.title':       '대학 강사 &mdash; HTW 베를린',
    'about.exp.htw.period':      '2025년 10월 &ndash; 2026년 3월',
    'about.exp.htw.prog':        '학사 과정: 정보통신기술',
    'about.exp.htw.intro':       '디지털 통신 및 신호 처리 분야 강의, 연습 및 평가 진행:',
    'about.exp.htw.li1':         '통신 및 통신 시스템 기초',
    'about.exp.htw.li2':         '디지털 신호 처리 및 변조 방식',
    'about.exp.htw.li3':         '무선 및 광학 전송 시스템 입문',
    'about.exp.bht.title':       '대학 강사 &mdash; BHT 베를린',
    'about.exp.bht.period':      '2022년 10월 &ndash; 2024년 3월',
    'about.exp.bht.prog':        '석사 과정: 정보통신기술',
    'about.exp.bht.intro':       '대학원 수준 고급 강의 및 연습 진행:',
    'about.exp.bht.li1':         '고급 통신 공학 및 시스템 설계',
    'about.exp.bht.li2':         '광학 및 무선 전송 기술',
    'about.exp.bht.li3':         '채널 코딩, 적응형 변조 및 확률적 성상 형성 개념',
    'about.exp.thesis.title':    '석사 논문 &mdash; 광자공학 및 양자전자학 연구소 (IPQ), KIT',
    'about.exp.thesis.period':   '2020년 10월 &ndash; 2021년 4월',
    'about.exp.thesis.body':     'Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems',

    'about.pub.title':     '논문',
    'about.pub.first':     '제1저자',
    'about.pub.co':        '공동 저자',
    'about.pub.submitted': '[제출됨 &amp; 심사 중]',
    'about.pub.links':     '<a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar에서 전체 목록 보기</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore 저자 프로필</a>',

    'about.skills.title': '기술 역량',
    'about.skills.li1':   '<strong>연구 분야:</strong> 테라헤르츠(THz) 무선 통신, 확률적 성상 형성(PCS), 고급 디지털 신호 처리, 광자 업변환, 자유 공간 및 광섬유 광통신',
    'about.skills.li2':   '<strong>기술:</strong> 고속 THz 전송 시스템(WR-3 대역), PIN 광검출기 송신기, WR3 결합 송신기, 코히런트 광학 ASIC(800G), 직교 진폭 변조(QAM)',
    'about.skills.li3':   '<strong>도구:</strong> MATLAB(시뮬레이션 및 DSP), 실험적 광학/THz 테스트베드, 오실로스코프 및 스펙트럼 분석기, 신호 발생기',
    'about.skills.li4':   '<strong>일반:</strong> 전기 및 전자 공학, 통신 시스템 설계, 실험적 특성화, 프로젝트 관리',

    'about.lang.title': '언어 능력',
    'about.lang.li1':   '<strong>독일어</strong> &mdash; 모국어',
    'about.lang.li2':   '<strong>한국어</strong> &mdash; 모국어',
    'about.lang.li3':   '<strong>영어</strong> &mdash; 유창 (말하기 및 쓰기)',

    'about.contact.title': '연락처',
    'about.contact.body':  '프라운호퍼 통신 연구소 &mdash; 하인리히 헤르츠 연구소 (HHI)<br />광자 네트워크 및 시스템 부서, 베를린, 독일<br /><br />이메일: <a href="mailto:in-ho.baek@hhi.fraunhofer.de">in-ho.baek@hhi.fraunhofer.de</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar 프로필</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE 저자 프로필</a>',
  },
};

/* ─── Engine ───────────────────────────────────────────────────────────── */
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.getAttribute('data-i18n')];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t[el.getAttribute('data-i18n-html')];
    if (v !== undefined) el.innerHTML = v;
  });
  /* Update page title if key exists */
  const titleKey = t['about.page.title'];
  if (titleKey && window.location.pathname.includes('about')) {
    document.title = titleKey;
  }
  /* Sync switcher buttons */
  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang)
  );
}

function setLanguage(lang) {
  localStorage.setItem('preferred-lang', lang);
  applyTranslations(lang);
}

/* ─── Init ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Build switcher UI */
  const sw = document.createElement('div');
  sw.id = 'lang-switcher';
  sw.setAttribute('aria-label', 'Language selector');
  sw.innerHTML =
    '<button class="lang-btn" data-lang="en"  title="English">EN</button>' +
    '<button class="lang-btn" data-lang="de"  title="Deutsch">DE</button>' +
    '<button class="lang-btn" data-lang="ko"  title="한국어">한국어</button>';
  document.body.appendChild(sw);

  sw.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')))
  );

  /* Apply preferred or browser language */
  const saved    = localStorage.getItem('preferred-lang');
  const browser  = (navigator.language || 'en').slice(0, 2);
  const fallback = ['en', 'de', 'ko'].includes(browser) ? browser : 'en';
  applyTranslations(saved || fallback);
});
