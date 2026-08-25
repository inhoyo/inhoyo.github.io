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
      bottom: 1.5em;
      right: 1.5em;
      z-index: 10000;
      display: flex;
      gap: 2px;
      background: rgba(12,10,9,0.88);
      padding: 4px 5px;
      border-radius: 8px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(61,58,53,0.7);
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .lang-btn {
      background: transparent;
      color: rgba(237,232,227,0.38);
      border: 1px solid transparent;
      padding: 5px 10px;
      font-size: 0.65em;
      font-family: inherit;
      cursor: pointer;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      transition: all 0.18s ease;
      line-height: 1;
    }
    .lang-btn:hover {
      color: rgba(237,232,227,0.85);
      background: rgba(61,58,53,0.45);
    }
    .lang-btn.active {
      background: rgba(79,195,247,0.12);
      color: #4FC3F7;
      border-color: rgba(79,195,247,0.28);
      font-weight: 600;
    }
    @media (max-width: 480px) {
      #lang-switcher {
        right: 50%;
        bottom: 0.75rem;
        transform: translateX(50%);
      }
      .lang-btn {
        padding: 5px 8px;
        font-size: 0.6em;
      }
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
    'nav.venture':      'Venture',
    'nav.publications': 'Publications',
    'nav.news':         'News',
    'nav.contact':      'Contact',

    /* Banner */
    'banner.role.scientist': 'Scientist',
    'banner.role.phd':       'PhD',
    'banner.role.lecturer':  'University Lecturer',
    'banner.institution':    'Fraunhofer Heinrich Hertz Institute (HHI), Berlin',
    'banner.tagline':        'Terahertz Communications &amp; Photonic Networks',
    'banner.btn.about':      'About Me',
    'banner.btn.research':   'Research',
    'banner.more':           'Learn More',

    /* Intro */
    'intro.title': 'Research Overview',
    'intro.text':  'My work is centred on high-capacity Terahertz (THz) wireless communications<br />and their integration into future 6G photonic network infrastructures.<br />At Fraunhofer HHI I develop advanced digital signal processing techniques<br />and experimental systems pushing beyond 200&thinsp;Gbit/s over THz wireless links.<br />I also serve as a <strong>University Lecturer</strong> at HTW Berlin and BHT Berlin,<br />teaching communications engineering at Bachelor&rsquo;s and Master&rsquo;s level.',
    'intro.icon.thz':     'THz Wireless',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'Photonic Networks',

    /* Affiliations */
    'affiliations.title': 'Affiliations &amp; Memberships',

    /* Research spotlights */
    'research.1.title': 'Terahertz Wireless<br />Communications',
    'research.1.text':  'Experimental 300&thinsp;GHz (WR-3) transmission systems built on photonic upconversion, from PIN-photodiode transmitters to receiver-side DSP. Demonstrated throughputs beyond 200&thinsp;Gbit/s, with a record <strong>221&thinsp;Gb/s dual-polarisation</strong> link over 500&thinsp;m.',
    'research.2.title': 'Adaptive Modulation &amp;<br />Converged 6G Links',
    'research.2.text':  'Rate-adaptive probabilistic shaping approaching the Shannon limit, integrated into converged fiber&ndash;THz backhaul architectures for 6G. The subject of my PhD dissertation at TU Berlin.',
    'research.3.title': 'Neuromorphic<br />Photonic Computing',
    'research.3.text':  'Optical signal processing on integrated photonic chips using neural networks: modulation format identification, signal correction, and feature extraction, entirely in the optical domain at sub-nanosecond latency.',

    /* Publications */
    'pub.title':     'Publications',
    'pub.subtitle':  'Complete list of first-author and co-authored publications.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': 'Submitted',
    'pub.coauthor':  'Co-Author',
    'pub.toggle.show': 'Show 3 more publications',
    'pub.toggle.hide': 'Show fewer',
    'pub.award':     'Best Student Paper Award — OECC 2026',

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
    'about.subtitle':     'Scientist &amp; PhD &mdash; Fraunhofer HHI, Berlin',

    'about.profile.title':'Professional Profile',
    'about.profile.p1':   'I am a Scientist at the <strong>Fraunhofer Institute for Telecommunications, Heinrich Hertz Institute (HHI)</strong> in Berlin, within the Department of Photonic Networks and Systems, since July 2021. I completed my <strong>PhD (Dr.-Ing.)</strong> at <strong>Technische Universit&auml;t Berlin (TUB)</strong>, titled <em>&ldquo;Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping.&rdquo;</em>',
    'about.profile.p2':   'My research spans THz wireless communications, 6G photonic networks, and neuromorphic computing for optical systems. I also lead German&ndash;Korean research collaborations, connecting institutions across both countries.',
    'about.profile.p3':   'Alongside my research role, I serve as a University Lecturer at HTW Berlin and BHT Berlin, teaching communications engineering and signal processing at Bachelor&rsquo;s and Master&rsquo;s level.',

    'about.edu.title':              'Education',
    'about.edu.phd.title':          'PhD (Dr.-Ing.) &mdash; Electrical Engineering / Information Technology',
    'about.edu.phd.body':           '<strong>Technische Universit&auml;t Berlin (TUB)</strong>, Berlin &mdash; 2026<br />PhD Thesis: <em>Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping</em>',
    'about.edu.msc.title':          'M.Sc. &mdash; Electrical Engineering / Information Technology',
    'about.edu.msc.body':           '<strong>Karlsruhe Institute of Technology (KIT)</strong>, Karlsruhe &mdash; 2021<br />Focal points: Communication Engineering &amp; Optical Communications<br />Master Thesis (at IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':     'Exchange Programme &mdash; Electrical Engineering &amp; Philosophy',
    'about.edu.exchange.body':      '<strong>Korea Advanced Institute of Science and Technology (KAIST)</strong>, Daejeon, South Korea &mdash; 2018&ndash;2019<br />Courses: Radar Systems Engineering &bull; MIMO Wireless Communications &bull; Philosophy of Science<br />Supported by the <strong>Baden-Württemberg Scholarship 2018</strong>',
    'about.edu.bsc.title':          'B.Sc. &mdash; Electrical / Information Engineering',
    'about.edu.bsc.body':           '<strong>Karlsruhe Institute of Technology (KIT)</strong>, Karlsruhe &mdash; 2018<br />Bachelor Thesis (at IMS, KIT): <em>Investigation of the Timing Jitter of Superconducting Single Photon Detectors with Varying Meander Shapes</em>',

    'about.exp.title':              'Professional Experience',
    'about.exp.hhi.title':          'Scientist &mdash; Fraunhofer Heinrich Hertz Institute (HHI), Berlin',
    'about.exp.hhi.period':         'July 2021 &ndash; present',
    'about.exp.hhi.dept':           'Department of Photonic Networks and Systems',
    'about.exp.hhi.intro':          'Research in optical and THz communications, including:',
    'about.exp.hhi.li1':            'Advanced DSP development for rate-adaptive THz wireless communications',
    'about.exp.hhi.li2':            'DSP on chip for high-speed coherent 800G ASICs',
    'about.exp.hhi.li3':            'Device and experimental setup characterisation',
    'about.exp.hhi.li4':            'Leading German–Korean research collaborations and project acquisition',
    'about.exp.hhi.li5':            'Research on neuromorphic computing for photonic systems',
    'about.exp.htw.title':          'Lecturer &mdash; HTW Berlin University of Applied Sciences (HTW Berlin)',
    'about.exp.htw.period':         'October 2025 &ndash; present',
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
    'about.exp.enbw.title':         'Student Trainee, Project Engineer &mdash; EnBW, Karlsruhe',
    'about.exp.enbw.period':        'April 2020 &ndash; June 2021',
    'about.exp.enbw.dept':          'Rheinhafen Steam Power Plant RDK',
    'about.exp.enbw.li1':           'Calculation, reconstruction, and infrastructure adjustments of the power plant high-voltage site grid',
    'about.exp.siemens.title':      'Working Student &mdash; Siemens, Karlsruhe',
    'about.exp.siemens.period':     'April 2019 &ndash; March 2020',
    'about.exp.siemens.dept':       'Digital Industries &mdash; Factory Automation',
    'about.exp.kit_ta.title':       'Teaching Assistant &mdash; Karlsruhe Institute of Technology (KIT)',
    'about.exp.kit_ta.period':      '2015 &ndash; 2016',
    'about.exp.kit_ta.course':      'Teaching Assistant for the course Electric Circuits',
    'about.exp.kit_ta.li1':         'Held tutorial classes',
    'about.exp.kit_ta.li2':         'Corrected and graded exercise sheets',

    'about.pub.title':      'Publications',
    'about.pub.first':      'First Author',
    'about.pub.co':         'Co-Author',
    'about.pub.co.show':    'Show co-authored papers',
    'about.pub.co.hide':    'Show fewer',
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
    'about.contact.body':  'Fraunhofer Institute for Telecommunications &mdash; Heinrich Hertz Institute (HHI)<br />Department of Photonic Networks and Systems, Berlin, Germany<br /><br />Email: <a href="mailto:in-ho.baek@proton.me">in-ho.baek@proton.me</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar Profile</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Author Profile</a>',

    /* ── Redesigned page sections ─────────────────────── */
    'hero.eyebrow':         'Scientist &nbsp;·&nbsp; PhD &nbsp;·&nbsp; Co-Founder &amp; CEO, LUXONNIC',
    'hero.headline':        'Advancing <span class="accent-text">6G Photonic</span><br>Networks &amp;<br>THz Wireless',
    'hero.desc':            'At Fraunhofer HHI in Berlin, I build experimental THz systems beyond 200&thinsp;Gbit/s at 300&thinsp;GHz. I&rsquo;m also Co-Founder &amp; CEO of <strong>LUXONNIC</strong>, reinventing the optical transceiver for AI infrastructure.',
    'hero.btn.collab':      'Let\'s Collaborate',
    'affils.label':         'Affiliated with',
    'sec.00.label':         '01 &mdash; Latest News',
    'sec.00.title':         'Latest News',
    'sec.00.desc':          'Recent updates on publications, awards, and teaching.',
    'sec.01.label':         '02 &mdash; Research',
    'sec.01.title':         'Areas of Focus',
    'sec.01.desc':          'From experimental 300&thinsp;GHz THz links to neuromorphic photonics. Building the physical layer of 6G.',
    'sec.venture.label':    '03 &mdash; Venture',
    'sec.venture.title':    'Building LUXONNIC',
    'sec.venture.desc':     'Co-Founder &amp; CEO of an early-stage deep-tech venture, developed at Fraunhofer HHI, working to reinvent the optical transceiver for AI data centers.',
    'sec.02.label':         '04 &mdash; Publications',
    'sec.02.title':         'Research Output',
    'sec.02.desc':          'First-author papers highlighted. Full list on Google Scholar and IEEE Xplore.',
    'sec.04.label':         '05 &mdash; Contact',
    'contact.statement':    'Let\'s build<br><span class="accent-text">what\'s next</span><br>in photonics.',
    'contact.btn.email':    'Send an Email',
    'contact.btn.about':    'About Me',
    'footer.tagline':       'On a Mission for Light',
    'pub.first.label':      'First Author',
    'pub.co.label':         'Co-Author',
    'news.tag.publication': 'Publication',
    'news.tag.award':       'Award',
    'news.tag.teaching':    'Teaching',
    'news.tag.venture':     'Venture',
    'news.tag.talk':        'Talk',
    'news.0.date':          'Aug 2026',
    'news.0.text':          'Speaking at <strong>Deep Tech Night: Quantum &amp; Photonics</strong> in Berlin, presenting <strong>LUXONNIC</strong> to investors, researchers, and founders alongside four other photonics and quantum startups.',
    'news.0.link':          'View Event',
    'news.5.date':          'Oct 2026',
    'news.5.text':          'Returning as <strong>Lecturer at HTW Berlin</strong> this winter semester, teaching <strong>Nachrichtenübertragung 2 (NUE2)</strong>.',
    'news.1.date':          'Jul 2026',
    'news.1.text':          'Paper accepted to <strong>IEEE Photonics Technology Letters (PTL)</strong>: &ldquo;Neural-Network Based Transceiver Nonlinearity Mitigation for Probabilistically Shaped Photonic THz Wireless Transmission.&rdquo;',
    'news.2.date':          '2026',
    'news.2.text':          'Awarded the <strong>Best Student Paper Award at OECC 2026</strong> for a record 221&thinsp;Gb/s dual-polarization THz wireless transmission over 500&thinsp;m in urban Berlin, a rate&ndash;distance product exceeding 100&thinsp;Tb/s&middot;m in the 300&thinsp;GHz band.',
    'news.2.link':          'View on LinkedIn',
    'news.venture.date':    'Mar 2026',
    'news.venture.text':    'Started co-founding <strong>LUXONNIC</strong> as CEO, an early-stage venture at Fraunhofer HHI developing photonic neural transceivers for AI data centers, and submitted a funding proposal to the <strong>BMFTR xG-Incubator</strong> programme (StartUpConnect).',
    'news.3.date':          'Oct 2025',
    'news.3.text':          'Started as <strong>Lecturer at HTW Berlin</strong>, teaching the B.Sc. programme in Information and Communication Technology.',
    'news.4.date':          '2025',
    'news.4.text':          'Two papers published in the <strong>Journal of Lightwave Technology (JLT)</strong>.',
    'venture.role':         'Co-Founder & CEO',
    'venture.tagline':      '&ldquo;Becoming the secret sauce of next-gen transceivers.&rdquo;',
    'venture.desc':         '<strong>LUXONNIC</strong> is developing the <strong>LUXONNICore</strong>, a photonic integrated circuit that performs signal equalization directly in the optical domain using photonic neural networks, replacing the power-hungry DSP chips inside next-generation (LPO/CPO) transceivers.',
    'venture.stat1.label':  'of an AI factory’s power goes to optical transceivers',
    'venture.stat2.label':  'per site, mostly spent on digital signal correction',
    'venture.stat3.label':  'target bit-per-Joule efficiency gain',
    'venture.meta':         'In development at <strong>Fraunhofer HHI</strong>, Department of Photonic Networks and Systems. A funding proposal has been submitted to the <strong>BMFTR xG-Incubator</strong> programme (StartUpConnect).',
    'venture.visit':        'Visit luxonnic.com',
    'about.page.hero.eyebrow': 'Fraunhofer HHI &nbsp;·&nbsp; LUXONNIC &nbsp;·&nbsp; TU Berlin',
    'about.page.desc':         'Scientist at the Department of Photonic Networks and Systems, Fraunhofer HHI, and Co-Founder &amp; CEO of LUXONNIC, developing high-capacity THz wireless systems and photonic neural transceivers for 6G and AI infrastructure.',
    'about.page.profile.label':'Profile',
    'about.page.edu.label':    'Education',
    'about.page.exp.label':    'Experience',
    'about.page.pub.label':    'Publications',
    'about.page.connect':      'Connect',
    'about.page.affils':       'Affiliations',
    'about.page.venture':      'Venture',
    'about.page.focus':        'Research Focus',
    'about.profile.p4':        'Since March 2026, I have been co-founding <strong>LUXONNIC</strong> with colleagues at Fraunhofer HHI, where I serve as <strong>Co-Founder &amp; CEO</strong>. We are building the <strong>LUXONNICore</strong>, a photonic integrated circuit that replaces power-hungry digital signal processors in AI data-center optical transceivers with an optical neural network, targeting up to 30&times; higher energy efficiency. We have submitted a funding proposal to the BMFTR <strong>xG-Incubator</strong> programme.',
    'about.exp.luxonnic.title':  'Co-Founder &amp; CEO &mdash; LUXONNIC',
    'about.exp.luxonnic.period': 'March 2026 &ndash; present',
    'about.exp.luxonnic.dept':   'Photonic Neural Transceivers for AI Data Centers & 6G Infrastructure · Fraunhofer HHI',
    'about.exp.luxonnic.li1':    'Co-founding and leading strategy and technical direction for an early-stage deep-tech venture developed at Fraunhofer HHI',
    'about.exp.luxonnic.li2':    'Co-developing the LUXONNICore concept, a photonic integrated circuit performing optical signal equalization to replace DSP in next-generation (LPO/CPO) transceivers',
    'about.exp.luxonnic.li3':    'Submitted a funding proposal to the BMFTR xG-Incubator (StartUpConnect) programme',
    'about.exp.luxonnic.li4':    'Building the founding team with Mahdi Kaveh (CTO) and Dr. Colja Schubert (Scientific Advisor), Fraunhofer HHI',
    'about.venture.card':      '<strong style="color:var(--text-1)">LUXONNIC</strong><br><span style="color:var(--text-2);">Co-Founder &amp; CEO</span><br><span style="color:var(--text-3); font-size:0.78rem;">Photonic neural transceivers &middot; in development at Fraunhofer HHI</span>',
  },

  /* ── GERMAN ──────────────────────────────────────────────────────────── */
  de: {
    'nav.home':         'Startseite',
    'nav.about':        '\u00DCber mich',
    'nav.research':     'Forschung',
    'nav.venture':      'Venture',
    'nav.publications': 'Publikationen',
    'nav.news':         'Neuigkeiten',
    'nav.contact':      'Kontakt',

    'banner.role.scientist': 'Wissenschaftler',
    'banner.role.phd':       'Promotion',
    'banner.role.lecturer':  'Lehrbeauftragter',
    'banner.institution':    'Fraunhofer Heinrich-Hertz-Institut (HHI), Berlin',
    'banner.tagline':        'Terahertz-Kommunikation &amp; Photonische Netzwerke',
    'banner.btn.about':      '\u00DCber mich',
    'banner.btn.research':   'Forschung',
    'banner.more':           'Mehr erfahren',

    'intro.title': 'Forschungs\u00FCberblick',
    'intro.text':  'Meine Forschung konzentriert sich auf hochkapazitive Terahertz (THz)-Funkkommunikation<br />und deren Integration in zuk\u00FCnftige 6G-Photoniknetzwerkinfrastrukturen.<br />Am Fraunhofer HHI entwickle ich fortschrittliche digitale Signalverarbeitungstechniken<br />und experimentelle Systeme f\u00FCr Datenraten \u00FCber 200&thinsp;Gbit/s auf THz-Funkstrecken.<br />Dar\u00FCber hinaus bin ich als <strong>Lehrbeauftragter</strong> an der HTW Berlin und BHT Berlin t&auml;tig<br />und unterrichte Kommunikationstechnik auf Bachelor- und Masterniveau.',
    'intro.icon.thz':     'THz-Funk',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'Photonische Netzwerke',

    'affiliations.title': 'Zugeh&ouml;rigkeiten &amp; Mitgliedschaften',

    'research.1.title': 'Terahertz-<br />Funkkommunikation',
    'research.1.text':  'Experimentelle 300&thinsp;GHz-Funk\u00FCbertragungssysteme (WR-3) mit photonischer Aufw\u00E4rtskonvertierung, von PIN-Photodioden-Sendern bis zur empf&auml;ngerseitigen DSP. Durchs&auml;tze \u00FCber 200&thinsp;Gbit/s sowie ein Rekordwert von <strong>221&thinsp;Gb/s Dual-Polarisation</strong> \u00FCber 500&thinsp;m.',
    'research.2.title': 'Adaptive Modulation &amp;<br />Konvergierte 6G-Verbindungen',
    'research.2.text':  'Ratenadaptives probabilistisches Shaping nahe der Shannon-Grenze, integriert in konvergierte Glasfaser-THz-Backhaul-Architekturen f\u00FCr 6G. Das Thema meiner Doktorarbeit an der TU Berlin.',
    'research.3.title': 'Neuromorphe<br />Photonische Datenverarbeitung',
    'research.3.text':  'Optische Signalverarbeitung auf integrierten photonischen Chips mit neuronalen Netzwerken: Modulationsformaterkennung, Signalkorrektur und Merkmalsgewinnung, vollst\u00E4ndig im optischen Bereich mit Sub-Nanosekunden-Latenz.',

    'pub.title':     'Publikationen',
    'pub.subtitle':  'Vollst&auml;ndige Liste der Erst- und Mitautoren-Publikationen.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': 'Eingereicht',
    'pub.coauthor':  'Mitautor',
    'pub.toggle.show': '3 weitere Publikationen anzeigen',
    'pub.toggle.hide': 'Weniger anzeigen',
    'pub.award':     'Auszeichnung für die beste studentische Arbeit — OECC 2026',

    'contact.title':       'Kontakt aufnehmen',
    'contact.text':        'Ich freue mich \u00FCber Anfragen zu Forschungskooperationen, Projekten<br />und M&ouml;glichkeiten im Bereich THz-Kommunikation und photonische Netzwerke.',
    'contact.dept':        'Abteilung Photonische Netze und Systeme',
    'contact.city':        'Berlin, Deutschland',
    'contact.btn.about':   '\u00FCber mich',
    'contact.btn.scholar': 'Google Scholar Profil',

    'about.page.title':  '\u00FCber mich | In-Ho Baek',
    'about.header':      '\u00FCber mich',
    'about.subtitle':    'Wissenschaftler &amp; Promotion &mdash; Fraunhofer HHI, Berlin',

    'about.profile.title':'Berufliches Profil',
    'about.profile.p1':   'Ich bin Wissenschaftler am <strong>Fraunhofer-Institut f\u00FCr Nachrichtentechnik, Heinrich-Hertz-Institut (HHI)</strong>, Berlin, in der Abteilung Photonische Netze und Systeme, wo ich seit Juli 2021 t&auml;tig bin. Meine Promotion (Dr.-Ing.) habe ich an der <strong>Technischen Universit&auml;t Berlin (TUB)</strong> abgeschlossen, mit dem Titel <em>&ldquo;Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping.&rdquo;</em>',
    'about.profile.p2':   'Meine Forschung umfasst hochkapazitive THz-Funkkommunikation, 6G-Photoniknetzwerke und neuromorphes Computing f\u00FCr optische Systeme. Au\u00DFerdem leite ich deutsch-koreanische Forschungskooperationen und Projektakquise, um gemeinsam mit Partnern beider L\u00E4nder Kommunikationstechnologien der n\u00E4chsten Generation voranzutreiben.',
    'about.profile.p3':   'Neben meiner Forschungst&auml;tigkeit bin ich als Lehrbeauftragter f\u00FCr Informations- und Kommunikationsprogramme an Berliner Hochschulen t&auml;tig.',

    'about.edu.title':           'Ausbildung',
    'about.edu.phd.title':       'Promotion (Dr.-Ing.) &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.phd.body':        '<strong>Technische Universit&auml;t Berlin (TUB)</strong>, Berlin &mdash; 2026<br />Dissertationstitel: <em>Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping</em>',
    'about.edu.msc.title':       'M.Sc. &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.msc.body':        '<strong>Karlsruher Institut f\u00FCr Technologie (KIT)</strong>, Karlsruhe &mdash; 2021<br />Schwerpunkte: Kommunikationstechnik &amp; Optische Kommunikation<br />Masterarbeit (am IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':  'Austauschprogramm &mdash; Elektrotechnik &amp; Philosophie',
    'about.edu.exchange.body':   '<strong>Korea Advanced Institute of Science and Technology (KAIST)</strong>, Daejeon, S\u00FCdkorea &mdash; 2019<br />Kurse: Radarsystemtechnik &bull; MIMO Funk\u00FCbertragung &bull; Wissenschaftsphilosophie<br />Gef&ouml;rdert durch das <strong>Baden-W\u00FCrttemberg-Stipendium 2018</strong>',
    'about.edu.bsc.title':       'B.Sc. &mdash; Elektrotechnik / Informationstechnik',
    'about.edu.bsc.body':        '<strong>Karlsruher Institut f\u00FCr Technologie (KIT)</strong>, Karlsruhe &mdash; 2018<br />Bachelorarbeit (am IMS, KIT): <em>Untersuchung des Zeitjitters von supraleitenden Einzelphotonen-Detektoren mit verschiedenen M&auml;anderformen</em>',

    'about.exp.title':           'Berufliche Erfahrung',
    'about.exp.hhi.title':       'Wissenschaftler &mdash; Fraunhofer Heinrich-Hertz-Institut (HHI), Berlin',
    'about.exp.hhi.period':      'Juli 2021 &ndash; heute',
    'about.exp.hhi.dept':        'Abteilung Photonische Netze und Systeme',
    'about.exp.hhi.intro':       'Forschung in optischer und THz-Kommunikation, einschlie\u00DFlich:',
    'about.exp.hhi.li1':         'Entwicklung fortschrittlicher DSP f\u00FCr ratenadaptive THz-Funkkommunikation',
    'about.exp.hhi.li2':         'DSP auf Chip f\u00FCr hochgeschwindige koh\u00E4rente 800G-ASICs',
    'about.exp.hhi.li3':         'Charakterisierung von Ger\u00E4ten und experimentellen Aufbauten',
    'about.exp.hhi.li4':         'Leitung deutsch-koreanischer Forschungskooperationen und Projektakquise',
    'about.exp.hhi.li5':         'Forschung zu neuromorphem Computing für photonische Systeme',
    'about.exp.htw.title':       'Lehrbeauftragter &mdash; HTW Berlin, Berlin',
    'about.exp.htw.period':      'Oktober 2025 &ndash; heute',
    'about.exp.htw.prog':        'B.Sc.-Studiengang: Informations- und Kommunikationstechnik',
    'about.exp.htw.intro':       'Vorbereitung und Durchf\u00FChrung von Vorlesungen, \u00FCbungen und Pr\u00FCfungen, Kerninhalte:',
    'about.exp.htw.li1':         'Grundlagen der Telekommunikation und Kommunikationssysteme',
    'about.exp.htw.li2':         'Digitale Signalverarbeitung und Modulationsverfahren',
    'about.exp.htw.li3':         'Einf\u00FChrung in drahtlose und optische \u00FCbertragungssysteme',
    'about.exp.bht.title':       'Lehrbeauftragter &mdash; BHT Berlin, Berlin',
    'about.exp.bht.period':      'Oktober 2022 &ndash; M&auml;rz 2024',
    'about.exp.bht.prog':        'M.Sc.-Studiengang: Informations- und Kommunikationstechnik',
    'about.exp.bht.intro':       'Konzeption und Durchf\u00FChrung fortgeschrittener Vorlesungen auf Masterniveau, Themen:',
    'about.exp.bht.li1':         'Fortgeschrittene Kommunikationstechnik und Systementwurf',
    'about.exp.bht.li2':         'Optische und drahtlose \u00FCbertragungstechnologien',
    'about.exp.bht.li3':         'Kanalcodierung, adaptive Modulation und probabilistisches Shaping',
    'about.exp.thesis.title':    'Masterarbeit &mdash; Institut f\u00FCr Photonik und Quantenelektronik (IPQ), KIT',
    'about.exp.thesis.period':   'Oktober 2020 &ndash; April 2021',
    'about.exp.thesis.body':     'Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems',
    'about.exp.enbw.title':      'Werkstudent, Projektengineering &mdash; EnBW, Karlsruhe',
    'about.exp.enbw.period':     'April 2020 &ndash; Juni 2021',
    'about.exp.enbw.dept':       'Rheinhafen-Dampfkraftwerk RDK',
    'about.exp.enbw.li1':        'Berechnung, Rekonstruktion und infrastrukturelle Anpassungen des Hochspannungs&shy;standortnetzes des Kraftwerks',
    'about.exp.siemens.title':   'Werkstudent &mdash; Siemens, Karlsruhe',
    'about.exp.siemens.period':  'April 2019 &ndash; M&auml;rz 2020',
    'about.exp.siemens.dept':    'Digital Industries &mdash; Factory Automation',
    'about.exp.kit_ta.title':    'Tutor / Teaching Assistant &mdash; Karlsruher Institut f&uuml;r Technologie (KIT)',
    'about.exp.kit_ta.period':   '2015 &ndash; 2016',
    'about.exp.kit_ta.course':   'Tutor f&uuml;r die Lehrveranstaltung Elektrische Schaltungen',
    'about.exp.kit_ta.li1':      'Durchf&uuml;hrung von Tutorien',
    'about.exp.kit_ta.li2':      'Korrektur und Bewertung von &Uuml;bungsbl&auml;ttern',

    'about.pub.title':     'Publikationen',
    'about.pub.first':     'Erstautor',
    'about.pub.co':        'Mitautor',
    'about.pub.co.show':   'Mitautorenschaften anzeigen',
    'about.pub.co.hide':   'Weniger anzeigen',
    'about.pub.submitted': '[Eingereicht &amp; In Begutachtung]',
    'about.pub.links':     '<a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Vollst&auml;ndige Liste bei Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore Profil</a>',

    'about.skills.title': 'Technische Kompetenzen',
    'about.skills.li1':   '<strong>Forschungsgebiete:</strong> THz-Funkkommunikation, probabilistisches Konstellationsshaping (PCS), fortgeschrittene digitale Signalverarbeitung, photonische Aufw\u00E4rtskonvertierung, freiraumoptische und faserbasierte Kommunikation',
    'about.skills.li2':   '<strong>Technologien:</strong> Hochgeschwindige THz-\u00FCbertragungssysteme (WR-3-Band), PIN-Photodiodensender, WR3-Senderbaugruppen, koh&auml;rente optische ASICs (800G), Quadratur-Amplitudenmodulation (QAM)',
    'about.skills.li3':   '<strong>Werkzeuge:</strong> MATLAB (Simulation &amp; DSP), experimentelle optische/THz-Pr\u00FCfst&auml;nde, Oszilloskope und Spektrumanalysatoren, Signalgeneratoren',
    'about.skills.li4':   '<strong>Allgemein:</strong> Elektro- &amp; Elektroniktechnik, Kommunikationssystementwurf, experimentelle Charakterisierung, Projektmanagement',

    'about.lang.title': 'Sprachkenntnisse',
    'about.lang.li1':   '<strong>Deutsch</strong> &mdash; Muttersprache',
    'about.lang.li2':   '<strong>Koreanisch</strong> (&#54620;&#44397;&#50612;) &mdash; Muttersprache',
    'about.lang.li3':   '<strong>Englisch</strong> &mdash; Flie\u00DFend (m\u00FCndlich und schriftlich)',

    'about.contact.title': 'Kontakt',
    'about.contact.body':  'Fraunhofer-Institut f\u00FCr Nachrichtentechnik &mdash; Heinrich-Hertz-Institut (HHI)<br />Abteilung Photonische Netze und Systeme, Berlin, Deutschland<br /><br />E-Mail: <a href="mailto:in-ho.baek@proton.me">in-ho.baek@proton.me</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar-Profil</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE-Autorenprofil</a>',

    'hero.eyebrow':         'Wissenschaftler &nbsp;·&nbsp; Promotion &nbsp;·&nbsp; Mitgründer &amp; CEO, LUXONNIC',
    'hero.headline':        'Fortschritte in <span class="accent-text">6G Photonik</span><br>Netzwerken &amp;<br>THz-Kommunikation',
    'hero.desc':            'Am Fraunhofer HHI in Berlin baue ich experimentelle THz-Systeme \u00FCber 200&thinsp;Gbit/s bei 300&thinsp;GHz. Zudem bin ich Mitgr\u00FCnder &amp; CEO von <strong>LUXONNIC</strong>, das den optischen Transceiver f\u00FCr KI-Infrastruktur neu erfindet.',
    'hero.btn.collab':      'Zusammenarbeiten',
    'affils.label':         'Zugeh\u00F6rigkeiten',
    'sec.00.label':         '01 &mdash; Neuigkeiten',
    'sec.00.title':         'Neuigkeiten',
    'sec.00.desc':          'Aktuelle Neuigkeiten zu Publikationen, Auszeichnungen und Lehre.',
    'sec.01.label':         '02 &mdash; Forschung',
    'sec.01.title':         'Forschungsgebiete',
    'sec.01.desc':          'Von experimentellen 300&thinsp;GHz-THz-Strecken bis zur neuromorphen Photonik. Ich baue die physikalische Schicht von 6G.',
    'sec.venture.label':    '03 &mdash; Venture',
    'sec.venture.title':    'LUXONNIC aufbauen',
    'sec.venture.desc':     'Mitgr\u00FCnder &amp; CEO eines jungen Deep-Tech-Vorhabens am Fraunhofer HHI, das den optischen Transceiver f\u00FCr KI-Rechenzentren neu erfinden soll.',
    'sec.02.label':         '04 &mdash; Publikationen',
    'sec.02.title':         'Forschungsoutput',
    'sec.02.desc':          'Erstautor-Publikationen hervorgehoben. Vollst\u00E4ndige Liste auf Google Scholar und IEEE Xplore.',
    'sec.04.label':         '05 &mdash; Kontakt',
    'contact.statement':    'Lass uns <span class="accent-text">das N&auml;chste</span><br>in der Photonik gestalten.',
    'contact.btn.email':    'E-Mail senden',
    'contact.btn.about':    '\u00DCber mich',
    'footer.tagline':       'Auf einer Mission f&uuml;r Licht',
    'pub.first.label':      'Erstautor',
    'pub.co.label':         'Mitautor',
    'news.tag.publication': 'Publikation',
    'news.tag.award':       'Auszeichnung',
    'news.tag.teaching':    'Lehre',
    'news.tag.venture':     'Venture',
    'news.tag.talk':        'Vortrag',
    'news.0.date':          'Aug 2026',
    'news.0.text':          'Vortrag bei der <strong>Deep Tech Night: Quantum &amp; Photonics</strong> in Berlin, wo <strong>LUXONNIC</strong> gemeinsam mit vier weiteren Photonik- und Quanten-Startups Investor:innen, Forschenden und Gründer:innen vorgestellt wird.',
    'news.0.link':          'Veranstaltung ansehen',
    'news.5.date':          'Okt 2026',
    'news.5.text':          'Rückkehr als <strong>Lehrbeauftragter an der HTW Berlin</strong> im kommenden Wintersemester mit der Vorlesung <strong>Nachrichtenübertragung 2 (NUE2)</strong>.',
    'news.1.date':          'Jul 2026',
    'news.1.text':          'Beitrag angenommen bei <strong>IEEE Photonics Technology Letters (PTL)</strong>: &bdquo;Neural-Network Based Transceiver Nonlinearity Mitigation for Probabilistically Shaped Photonic THz Wireless Transmission.&ldquo;',
    'news.2.date':          '2026',
    'news.2.text':          '<strong>Best Student Paper Award bei der OECC 2026</strong> f\u00FCr eine rekordverd\u00E4chtige 221&thinsp;Gb/s Dual-Polarisations-THz-Funk\u00FCbertragung \u00FCber 500&thinsp;m im urbanen Berlin, ein Raten-Distanz-Produkt von \u00FCber 100&thinsp;Tb/s&middot;m im 300&thinsp;GHz-Band.',
    'news.2.link':          'Auf LinkedIn ansehen',
    'news.venture.date':    'März 2026',
    'news.venture.text':    'Als CEO begonnen, <strong>LUXONNIC</strong> mitzugründen, ein junges Vorhaben am Fraunhofer HHI für photonische neuronale Transceiver für KI-Rechenzentren, und Förderantrag beim <strong>BMFTR xG-Incubator</strong>-Programm (StartUpConnect) eingereicht.',
    'news.3.date':          'Okt 2025',
    'news.3.text':          'Beginn als <strong>Lehrbeauftragter an der HTW Berlin</strong> im B.Sc.-Studiengang Informations- und Kommunikationstechnik.',
    'news.4.date':          '2025',
    'news.4.text':          'Zwei Beitr\u00E4ge im <strong>Journal of Lightwave Technology (JLT)</strong> ver\u00F6ffentlicht.',
    'about.page.hero.eyebrow': 'Fraunhofer HHI &nbsp;·&nbsp; LUXONNIC &nbsp;·&nbsp; TU Berlin',
    'about.page.desc':         'Wissenschaftler in der Abteilung Photonische Netze und Systeme, Fraunhofer HHI, und Mitgr\u00FCnder &amp; CEO von LUXONNIC, mit Fokus auf hochkapazitive THz-Systeme und photonische neuronale Transceiver f\u00FCr 6G- und KI-Infrastruktur.',
    'about.page.profile.label':'Profil',
    'about.page.edu.label':    'Ausbildung',
    'about.page.exp.label':    'Erfahrung',
    'about.page.pub.label':    'Publikationen',
    'about.page.connect':      'Kontakt',
    'about.page.affils':       'Zugeh\u00F6rigkeiten',
    'about.page.venture':      'Venture',
    'about.page.focus':        'Forschungsschwerpunkte',
    'about.profile.p4':        'Seit März 2026 gründe ich gemeinsam mit Kolleg:innen am Fraunhofer HHI <strong>LUXONNIC</strong> mit, wo ich als <strong>Mitgründer &amp; CEO</strong> tätig bin. Entwickelt in der HHI-Abteilung Photonische Netze und Systeme, baut LUXONNIC den <strong>LUXONNICore</strong> auf &mdash; einen photonischen integrierten Schaltkreis, der energiehungrige digitale Signalprozessoren in optischen Transceivern von KI-Rechenzentren durch ein optisches neuronales Netz ersetzen soll, mit dem Ziel einer bis zu 30-fach höheren Energieeffizienz &mdash; und hat einen Förderantrag beim BMFTR-Programm <strong>xG-Incubator</strong> eingereicht.',
    'about.exp.luxonnic.title':  'Mitgründer &amp; CEO &mdash; LUXONNIC',
    'about.exp.luxonnic.period': 'März 2026 &ndash; heute',
    'about.exp.luxonnic.dept':   'Photonische neuronale Transceiver für KI-Rechenzentren & 6G-Infrastruktur · Fraunhofer HHI',
    'about.exp.luxonnic.li1':    'Mitgründung und Verantwortung für Strategie und technische Ausrichtung eines jungen Deep-Tech-Vorhabens am Fraunhofer HHI',
    'about.exp.luxonnic.li2':    'Mitentwicklung des LUXONNICore-Konzepts, eines photonischen integrierten Schaltkreises zur optischen Signalentzerrung als Ersatz für DSP in Transceivern der nächsten Generation (LPO/CPO)',
    'about.exp.luxonnic.li3':    'Förderantrag beim Programm BMFTR xG-Incubator (StartUpConnect) eingereicht',
    'about.exp.luxonnic.li4':    'Aufbau des Gründungsteams mit Mahdi Kaveh (CTO) und Dr. Colja Schubert (Wissenschaftlicher Berater), Fraunhofer HHI',
    'venture.role':         'Mitgründer & CEO',
    'venture.tagline':      '&bdquo;Die Geheimzutat der Next-Gen-Transceiver werden.&ldquo;',
    'venture.desc':         '<strong>LUXONNIC</strong> entwickelt den <strong>LUXONNICore</strong>, einen photonischen integrierten Schaltkreis, der die Signalentzerrung mittels photonischer neuronaler Netze direkt in der optischen Domäne durchführt und so die energiehungrigen DSP-Chips in Transceivern der nächsten Generation (LPO/CPO) ersetzt.',
    'venture.stat1.label':  'der Energie einer KI-Fabrik entfällt auf optische Transceiver',
    'venture.stat2.label':  'pro Standort, größtenteils für digitale Signalentzerrung',
    'venture.stat3.label':  'angestrebte Bit-pro-Joule-Effizienzsteigerung',
    'venture.meta':         'In Entwicklung am <strong>Fraunhofer HHI</strong>, Abteilung Photonische Netze und Systeme. Ein Förderantrag beim <strong>BMFTR xG-Incubator</strong>-Programm (StartUpConnect) wurde eingereicht.',
    'venture.visit':        'luxonnic.com besuchen',
    'about.venture.card':      '<strong style="color:var(--text-1)">LUXONNIC</strong><br><span style="color:var(--text-2);">Mitgründer &amp; CEO</span><br><span style="color:var(--text-3); font-size:0.78rem;">Photonische neuronale Transceiver &middot; in Entwicklung am Fraunhofer HHI</span>',
  },

  /* ── KOREAN ──────────────────────────────────────────────────────────── */
  ko: {
    'nav.home':         '홈',
    'nav.about':        '소개',
    'nav.research':     '연구',
    'nav.venture':      '벤처',
    'nav.publications': '논문',
    'nav.news':         '소식',
    'nav.contact':      '연락처',

    'banner.role.scientist': '연구원',
    'banner.role.phd':       '박사',
    'banner.role.lecturer':  '겸임교수',
    'banner.institution':    '프라운호퍼 하인리히 헤르츠 연구소 (HHI), 베를린',
    'banner.tagline':        '테라헤르츠 통신 &amp; 포토닉 네트워크',
    'banner.btn.about':      '소개',
    'banner.btn.research':   '연구',
    'banner.more':           '더 알아보기',

    'intro.title': '연구 개요',
    'intro.text':  '저의 연구는 고용량 테라헤르츠(THz) 무선 통신과<br />미래 6G 포토닉 네트워크 인프라로의 통합에 초점을 맞추고 있습니다.<br />프라운호퍼 HHI에서 THz 무선 링크에서 200&thinsp;Gbit/s를 초과하는<br />고급 디지털 신호 처리 기술과 실험 시스템을 개발합니다.<br />또한 HTW 베를린과 BHT 베를린에서 <strong>겸임교수</strong>로서<br />학사 및 석사 수준의 통신 공학을 가르치고 있습니다.',
    'intro.icon.thz':     'THz 무선',
    'intro.icon.dsp':     'DSP',
    'intro.icon.photonic':'포토닉 네트워크',

    'affiliations.title': '소속 및 회원 자격',

    'research.1.title': '테라헤르츠<br />무선 통신',
    'research.1.text':  '광자 업변환 기반의 실험적 300&thinsp;GHz(WR-3) 무선 전송 시스템으로, PIN 광검출기 송신기부터 수신단 DSP까지 다룹니다. 200&thinsp;Gbit/s를 넘는 전송률과 500&thinsp;m 거리에서 기록적인 <strong>221&thinsp;Gb/s 이중 편파</strong> 전송을 시연했습니다.',
    'research.2.title': '적응형 변조 &amp;<br />융합형 6G 링크',
    'research.2.text':  '섀넌 한계에 근접하는 전송률 적응형 확률적 성상 형성을 융합형 광섬유&ndash;THz 백홀 아키텍처에 적용합니다. TU 베를린 박사 논문의 주제입니다.',
    'research.3.title': '뉴로모픽<br />포토닉 컴퓨팅',
    'research.3.text':  '신경망을 활용한 집적 포토닉 칩 기반 광학 신호 처리로, 변조 형식 식별, 신호 보정, 특징 추출을 나노초 이하의 지연 시간으로 완전히 광 영역에서 수행합니다.',

    'pub.title':     '논문',
    'pub.subtitle':  '제1저자 및 공동 저자 논문 전체 목록.<br /><a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>&nbsp;&bull;&nbsp;<a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE Xplore</a>',
    'pub.submitted': '제출됨',
    'pub.coauthor':  '공동 저자',
    'pub.toggle.show': '논문 3개 더 보기',
    'pub.toggle.hide': '간략히 보기',
    'pub.award':     'OECC 2026 최우수 논문상',

    'contact.title':       '연락하기',
    'contact.text':        'THz 통신 및 포토닉 네트워크 분야의 연구 협력,<br />프로젝트 문의 및 기회에 대한 논의를 환영합니다.',
    'contact.dept':        '광자 네트워크 및 시스템 부서',
    'contact.city':        '베를린, 독일',
    'contact.btn.about':   '소개',
    'contact.btn.scholar': 'Google Scholar 프로필',

    'about.page.title':  '소개 | In-Ho Baek',
    'about.header':      '소개',
    'about.subtitle':    '연구원 &amp; 박사 &mdash; 프라운호퍼 HHI, 베를린',

    'about.profile.title':'전문 프로필',
    'about.profile.p1':   '저는 2021년 7월부터 베를린의 <strong>프라운호퍼 통신 연구소, 하인리히 헤르츠 연구소(HHI)</strong> 광자 네트워크 및 시스템 부서에서 연구원으로 근무하고 있습니다. <strong>베를린 공과대학교(TUB)</strong>에서 박사(Dr.-Ing.) 학위를 취득했으며, 논문 제목은 <em>&ldquo;Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping&rdquo;</em>입니다.',
    'about.profile.p2':   '제 연구는 고용량 THz 무선 통신, 6G 포토닉 네트워크, 그리고 광학 시스템을 위한 뉴로모픽 컴퓨팅을 아우릅니다. 또한 한독 연구 협력과 프로젝트 수주를 주도하며 양국 기관과 협력해 차세대 통신 기술을 발전시키고 있습니다.',
    'about.profile.p3':   '연구 업무 외에도 베를린 대학에서 통신 공학과 신호 처리를 다루는 정보통신 프로그램의 겸임교수로 활동하고 있습니다.',

    'about.edu.title':           '학력',
    'about.edu.phd.title':       '박사(Dr.-Ing.) &mdash; 전기공학 / 정보기술',
    'about.edu.phd.body':        '<strong>베를린 공과대학교 (TUB)</strong>, 베를린 &mdash; 2026<br />논문 제목: <em>Experimental Investigations of High-Capacity THz Wireless Links Using Probabilistic Constellation Shaping</em>',
    'about.edu.msc.title':       '석사 &mdash; 전기공학 / 정보기술',
    'about.edu.msc.body':        '<strong>카를스루에 공과대학교 (KIT)</strong>, 카를스루에 &mdash; 2021<br />전공: 통신 공학 &amp; 광통신<br />석사 논문 (IPQ, KIT): <em>Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems</em>',
    'about.edu.exchange.title':  '교환 프로그램 &mdash; 전기공학 &amp; 철학',
    'about.edu.exchange.body':   '<strong>한국과학기술원 (KAIST)</strong>, 대전, 대한민국 &mdash; 2019<br />수강 과목: 레이더 시스템 공학 &bull; MIMO 무선 통신 &bull; 과학철학<br /><strong>바덴뷔르템베르크 장학금 2018</strong> 수혜',
    'about.edu.bsc.title':       '학사 &mdash; 전기 / 정보 공학',
    'about.edu.bsc.body':        '<strong>카를스루에 공과대학교 (KIT)</strong>, 카를스루에 &mdash; 2018<br />학사 논문 (IMS, KIT): <em>Investigation of the Timing Jitter of Superconducting Single Photon Detectors with Varying Meander Shapes</em>',

    'about.exp.title':           '경력',
    'about.exp.hhi.title':       '연구원 &mdash; 프라운호퍼 하인리히 헤르츠 연구소 (HHI), 베를린',
    'about.exp.hhi.period':      '2021년 7월 &ndash; 현재',
    'about.exp.hhi.dept':        '광자 네트워크 및 시스템 부서',
    'about.exp.hhi.intro':       '광학 및 THz 통신 연구:',
    'about.exp.hhi.li1':         '전송률 적응형 THz 무선 통신을 위한 고급 DSP 개발',
    'about.exp.hhi.li2':         '고속 코히런트 800G ASIC을 위한 칩 기반 DSP',
    'about.exp.hhi.li3':         '장치 및 실험 설비 특성화',
    'about.exp.hhi.li4':         '한독 연구 협력 및 프로젝트 수주 주도',
    'about.exp.hhi.li5':         '광자 시스템을 위한 뉴로모픽 컴퓨팅 연구',
    'about.exp.htw.title':       '겸임교수 &mdash; HTW 베를린',
    'about.exp.htw.period':      '2025년 10월 &ndash; 현재',
    'about.exp.htw.prog':        '학사 과정: 정보통신기술',
    'about.exp.htw.intro':       '디지털 통신 및 신호 처리 분야 강의, 연습 및 평가 진행:',
    'about.exp.htw.li1':         '통신 및 통신 시스템 기초',
    'about.exp.htw.li2':         '디지털 신호 처리 및 변조 방식',
    'about.exp.htw.li3':         '무선 및 광학 전송 시스템 입문',
    'about.exp.bht.title':       '겸임교수 &mdash; BHT 베를린',
    'about.exp.bht.period':      '2022년 10월 &ndash; 2024년 3월',
    'about.exp.bht.prog':        '석사 과정: 정보통신기술',
    'about.exp.bht.intro':       '대학원 수준 고급 강의 및 연습 진행:',
    'about.exp.bht.li1':         '고급 통신 공학 및 시스템 설계',
    'about.exp.bht.li2':         '광학 및 무선 전송 기술',
    'about.exp.bht.li3':         '채널 코딩, 적응형 변조 및 확률적 성상 형성 개념',
    'about.exp.thesis.title':    '석사 논문 &mdash; 광자공학 및 양자전자학 연구소 (IPQ), KIT',
    'about.exp.thesis.period':   '2020년 10월 &ndash; 2021년 4월',
    'about.exp.thesis.body':     'Data-Aided Carrier Phase Recovery Algorithms for Coherent Optical Communication Systems',
    'about.exp.enbw.title':      '학생 연수생, 프로젝트 엔지니어 &mdash; EnBW, 카를스루에',
    'about.exp.enbw.period':     '2020년 4월 &ndash; 2021년 6월',
    'about.exp.enbw.dept':       '라인하펜 증기발전소 RDK',
    'about.exp.enbw.li1':        '발전소 고전압 부지 전력망 계산, 재구축 및 인프라 조정',
    'about.exp.siemens.title':   '워킹 스튜던트 &mdash; Siemens, 카를스루에',
    'about.exp.siemens.period':  '2019년 4월 &ndash; 2020년 3월',
    'about.exp.siemens.dept':    'Digital Industries &mdash; Factory Automation',
    'about.exp.kit_ta.title':    '조교 &mdash; 카를스루에 공과대학교 (KIT)',
    'about.exp.kit_ta.period':   '2015년 &ndash; 2016년',
    'about.exp.kit_ta.course':   'Electric Circuits 과목 조교',
    'about.exp.kit_ta.li1':      '튜토리얼 수업 진행',
    'about.exp.kit_ta.li2':      '연습 문제지 채점 및 평가',

    'about.pub.title':     '논문',
    'about.pub.first':     '제1저자',
    'about.pub.co':        '공동 저자',
    'about.pub.co.show':   '공동 저자 논문 보기',
    'about.pub.co.hide':   '간략히 보기',
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
    'about.contact.body':  '프라운호퍼 통신 연구소 &mdash; 하인리히 헤르츠 연구소 (HHI)<br />광자 네트워크 및 시스템 부서, 베를린, 독일<br /><br />이메일: <a href="mailto:in-ho.baek@proton.me">in-ho.baek@proton.me</a><br />LinkedIn: <a href="https://www.linkedin.com/in/in-ho-baek/" target="_blank" rel="noopener">linkedin.com/in/in-ho-baek</a><br />Google Scholar: <a href="https://scholar.google.ch/citations?user=-MAAoUIAAAAJ&amp;hl=en" target="_blank" rel="noopener">Scholar 프로필</a><br />IEEE Xplore: <a href="https://ieeexplore.ieee.org/author/695481177653011" target="_blank" rel="noopener">IEEE 저자 프로필</a>',

    'hero.eyebrow':         '연구원 &nbsp;·&nbsp; 박사 &nbsp;·&nbsp; LUXONNIC 공동창업자 &amp; CEO',
    'hero.headline':        '<span class="accent-text">6G 포토닉</span> 네트워크와<br>THz 무선 통신의<br>발전을 선도하다',
    'hero.desc':            '프라운호퍼 HHI 베를린에서 300&thinsp;GHz 대역 200&thinsp;Gbit/s 이상의 실험적 THz 시스템을 구축하고 있습니다. 또한 AI 인프라용 광 트랜시버를 혁신하는 <strong>LUXONNIC</strong>의 공동창업자 &amp; CEO입니다.',
    'hero.btn.collab':      '협력 문의',
    'affils.label':         '소속',
    'sec.00.label':         '01 &mdash; 최신 소식',
    'sec.00.title':         '최신 소식',
    'sec.00.desc':          '논문, 수상, 강의에 관한 최신 소식입니다.',
    'sec.01.label':         '02 &mdash; 연구',
    'sec.01.title':         '연구 분야',
    'sec.01.desc':          '실험적 300&thinsp;GHz THz 링크부터 뉴로모픽 포토닉스까지, 6G의 물리 계층을 구축합니다.',
    'sec.venture.label':    '03 &mdash; 벤처',
    'sec.venture.title':    'LUXONNIC 구축하기',
    'sec.venture.desc':     '프라운호퍼 HHI에서 키우고 있는 초기 단계 딥테크 벤처의 공동창업자 &amp; CEO로서, AI 데이터센터용 광 트랜시버를 혁신하고자 합니다.',
    'sec.02.label':         '04 &mdash; 논문',
    'sec.02.title':         '연구 성과',
    'sec.02.desc':          '제1저자 논문 강조 표시. 전체 목록은 Google Scholar 및 IEEE Xplore에서 확인하세요.',
    'sec.04.label':         '05 &mdash; 연락처',
    'contact.statement':    '<span class="accent-text">포토닉스의 다음 단계</span>를<br>함께 만들어 갑시다.',
    'contact.btn.email':    '이메일 보내기',
    'contact.btn.about':    '소개 보기',
    'footer.tagline':       '빛을 위한 미션',
    'pub.first.label':      '제1저자',
    'pub.co.label':         '공동 저자',
    'news.tag.publication': '논문',
    'news.tag.award':       '수상',
    'news.tag.teaching':    '강의',
    'news.tag.venture':     '벤처',
    'news.tag.talk':        '강연',
    'news.0.date':          '2026년 8월',
    'news.0.text':          '베를린에서 열리는 <strong>Deep Tech Night: Quantum &amp; Photonics</strong>에서 다른 포토닉스&middot;양자 스타트업 4곳과 함께 투자자, 연구자, 창업자들에게 <strong>LUXONNIC</strong>을 소개하는 강연 예정.',
    'news.0.link':          '이벤트 보기',
    'news.5.date':          '2026년 10월',
    'news.5.text':          '이번 겨울학기 <strong>HTW 베를린 겸임교수</strong>로 복귀하여 <strong>Nachrichtenübertragung 2 (NUE2)</strong> 강의 예정.',
    'news.1.date':          '2026년 7월',
    'news.1.text':          '<strong>IEEE Photonics Technology Letters (PTL)</strong>에 &ldquo;Neural-Network Based Transceiver Nonlinearity Mitigation for Probabilistically Shaped Photonic THz Wireless Transmission&rdquo; 논문 게재 승인.',
    'news.2.date':          '2026년',
    'news.2.text':          '베를린 도심에서 500&thinsp;m 구간, 300&thinsp;GHz 대역에서 100&thinsp;Tb/s&middot;m를 초과하는 전송률&middot;거리 곱을 달성한 기록적인 221&thinsp;Gb/s 이중 편파 THz 무선 전송으로 <strong>OECC 2026 최우수 학생 논문상</strong> 수상.',
    'news.2.link':          'LinkedIn에서 보기',
    'news.venture.date':    '2026년 3월',
    'news.venture.text':    'CEO로서 <strong>LUXONNIC</strong> 공동창업을 시작했습니다. AI 데이터센터용 광자 신경망 트랜시버를 개발하는 프라운호퍼 HHI의 초기 단계 벤처이며, <strong>BMFTR xG-Incubator</strong> 프로그램(StartUpConnect)에 지원서를 제출했습니다.',
    'news.3.date':          '2025년 10월',
    'news.3.text':          '<strong>HTW 베를린 겸임교수</strong>로 임용되어 정보통신기술 학사 과정을 강의 시작.',
    'news.4.date':          '2025년',
    'news.4.text':          '<strong>Journal of Lightwave Technology (JLT)</strong>에 논문 2편 게재.',
    'about.page.hero.eyebrow': '프라운호퍼 HHI &nbsp;·&nbsp; LUXONNIC &nbsp;·&nbsp; TU 베를린',
    'about.page.desc':         '프라운호퍼 HHI 광자 네트워크 및 시스템 부서 연구원이자 LUXONNIC 공동창업자 &amp; CEO로, 6G 및 AI 인프라를 위한 고용량 THz 시스템과 광자 신경망 트랜시버를 개발합니다.',
    'about.page.profile.label':'전문 프로필',
    'about.page.edu.label':    '학력',
    'about.page.exp.label':    '경력',
    'about.page.pub.label':    '논문',
    'about.page.connect':      '연락처',
    'about.page.affils':       '소속',
    'about.page.venture':      '벤처',
    'about.page.focus':        '연구 중점 분야',
    'about.profile.p4':        '2026년 3월부터 프라운호퍼 HHI 동료들과 함께 <strong>LUXONNIC</strong>을 공동창업하고 있으며, <strong>공동창업자 &amp; CEO</strong>로 활동하고 있습니다. HHI 광자 네트워크 및 시스템 부서에서 개발 중인 LUXONNIC은 AI 데이터센터 광 트랜시버의 전력 소모가 큰 디지털 신호 프로세서를 광학 신경망으로 대체하는 광집적회로 <strong>LUXONNICore</strong>를 만들고 있으며, 최대 30배 높은 에너지 효율을 목표로 BMFTR <strong>xG-Incubator</strong> 프로그램에 지원서를 제출했습니다.',
    'about.exp.luxonnic.title':  '공동창업자 &amp; CEO &mdash; LUXONNIC',
    'about.exp.luxonnic.period': '2026년 3월 &ndash; 현재',
    'about.exp.luxonnic.dept':   'AI 데이터센터 & 6G 인프라를 위한 광자 신경망 트랜시버 · 프라운호퍼 HHI',
    'about.exp.luxonnic.li1':    '프라운호퍼 HHI에서 초기 단계 딥테크 벤처를 공동창업하며 전략과 기술 방향을 총괄',
    'about.exp.luxonnic.li2':    '차세대(LPO/CPO) 트랜시버의 DSP를 대체하는 광학 신호 등화용 광집적회로 LUXONNICore 개념 공동 개발',
    'about.exp.luxonnic.li3':    'BMFTR xG-Incubator(StartUpConnect) 프로그램에 지원서 제출',
    'about.exp.luxonnic.li4':    'Mahdi Kaveh(CTO), Dr. Colja Schubert(과학 자문, 프라운호퍼 HHI)와 함께 창업팀 구성 중',
    'venture.role':         '공동창업자 & CEO',
    'venture.tagline':      '&ldquo;차세대 트랜시버의 비밀 병기가 되다.&rdquo;',
    'venture.desc':         '<strong>LUXONNIC</strong>은 광자 신경망을 이용해 광 영역에서 직접 신호 등화를 수행하는 광집적회로 <strong>LUXONNICore</strong>를 개발하고 있으며, 이는 차세대(LPO/CPO) 트랜시버 내부의 전력 소모가 큰 DSP 칩을 대체합니다.',
    'venture.stat1.label':  'AI 팩토리 전력 중 광 트랜시버가 차지하는 비중',
    'venture.stat2.label':  '사이트당 소비 전력, 대부분 디지털 신호 보정에 사용',
    'venture.stat3.label':  '목표 비트당 에너지 효율 개선',
    'venture.meta':         '<strong>프라운호퍼 HHI</strong> 광자 네트워크 및 시스템 부서에서 개발 중이며, <strong>BMFTR xG-Incubator</strong> 프로그램(StartUpConnect)에 지원서를 제출했습니다.',
    'venture.visit':        'luxonnic.com 방문하기',
    'about.venture.card':      '<strong style="color:var(--text-1)">LUXONNIC</strong><br><span style="color:var(--text-2);">공동창업자 &amp; CEO</span><br><span style="color:var(--text-3); font-size:0.78rem;">광자 신경망 트랜시버 &middot; 프라운호퍼 HHI에서 개발 중</span>',
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
