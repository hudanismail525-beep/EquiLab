import { useEffect, useState } from 'react'
import './App.css'

const chapters = [
  {
    number: '01',
    title: 'Mengenal kesetimbangan',
    description: 'Bedakan reaksi searah dan bolak-balik, lalu amati apa yang terjadi saat keduanya setimbang.',
    duration: '12 menit',
    icon: '⇌',
    color: 'blue',
    tag: 'Konsep dasar',
  },
  {
    number: '02',
    title: 'Tetapan kesetimbangan',
    description: 'Temukan pola hukum aksi massa dan susun nilai Kc dari konsentrasi zat.',
    duration: '18 menit',
    icon: 'K',
    color: 'violet',
    tag: 'Kc & tabel MRS',
  },
  {
    number: '03',
    title: 'Kp dan derajat disosiasi',
    description: 'Hubungkan tekanan parsial dengan konsentrasi dan jelajahi perubahan komposisi gas.',
    duration: '16 menit',
    icon: 'P',
    color: 'orange',
    tag: 'Kp & α',
  },
  {
    number: '04',
    title: 'Pergeseran kesetimbangan',
    description: 'Uji pengaruh konsentrasi, suhu, tekanan, dan katalis melalui lab virtual.',
    duration: '20 menit',
    icon: '↔',
    color: 'green',
    tag: 'Lab virtual',
  },
]

const storageKey = 'equilab11_home_progress_v1'

function App() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? (JSON.parse(saved) as string[]) : []
    } catch {
      return []
    }
  })
  const [simulationRunning, setSimulationRunning] = useState(true)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedChapters))
    } catch {
      // Keep the page usable when browser storage is unavailable.
    }
  }, [completedChapters])

  const progress = Math.round((completedChapters.length / chapters.length) * 100)
  const currentChapter = chapters[activeChapter]

  function markChapterComplete() {
    const chapterId = currentChapter.number
    const updated = completedChapters.includes(chapterId)
      ? completedChapters.filter((id) => id !== chapterId)
      : [...completedChapters, chapterId]
    setCompletedChapters(updated)
    setNotice(
      updated.includes(chapterId)
        ? `${currentChapter.title} ditandai selesai.`
        : `Progres ${currentChapter.title} diperbarui.`,
    )
    window.setTimeout(() => setNotice(''), 2800)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#beranda" aria-label="EquiLab 11, beranda">
          <span className="brand-mark" aria-hidden="true"><span>⇌</span></span>
          <span className="brand-name">EquiLab <b>11</b></span>
        </a>
        <nav className="main-nav" aria-label="Navigasi utama">
          <a className="nav-link active" href="#beranda">Beranda</a>
          <a className="nav-link" href="#perjalanan">Materi</a>
          <a className="nav-link" href="#simulasi">Lab virtual</a>
        </nav>
        <a className="profile-chip" href="#progres">
          <span className="profile-avatar">S</span>
          <span>Ruang belajar</span>
          <span className="chevron" aria-hidden="true">⌄</span>
        </a>
      </header>

      <main id="beranda">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> KIMIA KELAS 11 <span className="eyebrow-line" /> FASE F</div>
            <h1 id="hero-title">Yang terlihat diam,<br />ternyata <span>terus bergerak.</span></h1>
            <p className="hero-description">Jelajahi kesetimbangan kimia lewat eksperimen virtual, visualisasi partikel, dan latihan yang membantumu paham langkah demi langkah.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#perjalanan">Lanjutkan belajar <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#simulasi"><span className="play-small" aria-hidden="true">▶</span> Coba simulasi</a>
            </div>
            <div className="hero-proof"><div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>N</span><span>+</span></div><span>Belajar konsep dengan cara yang lebih nyata</span></div>
          </div>

          <div className="hero-art" id="simulasi">
            <div className="art-glow" />
            <div className="art-label label-forward"><i /> REAKSI MAJU</div>
            <div className="art-label label-reverse"><i /> REAKSI BALIK</div>
            <div className={`particle-stage${simulationRunning ? ' is-running' : ''}`}>
              <div className="stage-topline"><span>SIMULASI PARTIKEL</span><span className="live-indicator"><i /> {simulationRunning ? 'BERLANGSUNG' : 'DIJEDA'}</span></div>
              <div className="equation"><span className="formula-reactant">N<sub>2</sub> + 3H<sub>2</sub></span><span className="equilibrium-arrow">⇌</span><span className="formula-product">2NH<sub>3</sub></span></div>
              <div className="particle-box" role="img" aria-label="Ilustrasi partikel reaktan biru dan produk ungu dalam simulasi kesetimbangan">
                <span className="orbit orbit-one" /><span className="orbit orbit-two" />
                <i className="particle p1" /><i className="particle p2" /><i className="particle p3" />
                <i className="particle p4" /><i className="particle p5" /><i className="particle p6" />
                <i className="particle p7" /><i className="particle p8" /><i className="particle p9" />
                <i className="particle p10" /><i className="particle p11" /><i className="particle p12" />
                <span className="equilibrium-core">⇌</span>
                <span className="particle-caption caption-left">REAKTAN</span><span className="particle-caption caption-right">PRODUK</span>
              </div>
              <div className="chart-wrap">
                <div className="chart-legend"><span><i className="legend-blue" /> Reaksi maju</span><span><i className="legend-orange" /> Reaksi balik</span><b>LAJU REAKSI</b></div>
                <svg className="rate-chart" viewBox="0 0 440 88" role="img" aria-label="Grafik laju reaksi maju dan balik bertemu saat setimbang">
                  <path className="chart-grid" d="M0 14H440M0 43H440M0 72H440" />
                  <path className="chart-line chart-forward" d="M5 12 C45 14 55 58 105 64 S170 67 220 68 S330 68 435 68" />
                  <path className="chart-line chart-reverse" d="M5 74 C50 74 65 30 115 22 S175 18 220 17 S330 17 435 17" />
                  <path className="chart-dash" d="M220 8V80" />
                  <text x="228" y="12">setimbang</text>
                </svg>
                <div className="chart-axis"><span>awal reaksi</span><span>waktu</span></div>
              </div>
              <div className="stage-controls">
                <span className="equilibrium-status"><i /> Laju maju = laju balik</span>
                <button className="simulation-button" type="button" onClick={() => setSimulationRunning(!simulationRunning)} aria-label={simulationRunning ? 'Jeda simulasi partikel' : 'Jalankan simulasi partikel'}>{simulationRunning ? 'Ⅱ' : '▶'}</button>
              </div>
            </div>
            <div className="floating-note note-one"><span className="note-icon blue-icon">↗</span><span><b>Konsentrasi tetap</b><small>bukan berarti reaksinya berhenti</small></span></div>
            <div className="floating-note note-two"><span className="note-icon violet-icon">⇌</span><span><b>Dinamis</b><small>partikel terus berubah</small></span></div>
            <div className="decor decor-dot-one" /><div className="decor decor-dot-two" /><div className="decor decor-star">✳</div>
          </div>
        </section>

        <section className="overview-grid" id="progres" aria-label="Ringkasan perjalanan belajar">
          <article className="continue-card">
            <div className="section-kicker">PERJALANAN BELAJARMU <span className="kicker-line" /></div>
            <div className="continue-content">
              <div className="chapter-number">{currentChapter.number}<span>/04</span></div>
              <div className="continue-details">
                <div className="lesson-meta"><span className={`lesson-tag tag-${currentChapter.color}`}>{currentChapter.tag}</span><span>{currentChapter.duration}</span></div>
                <h2>{currentChapter.title}</h2>
                <p>{currentChapter.description}</p>
                <button className="continue-link" type="button" onClick={markChapterComplete}>
                  {completedChapters.includes(currentChapter.number) ? 'Batalkan tanda selesai' : 'Tandai sesi selesai'} <span aria-hidden="true">→</span>
                </button>
              </div>
              <div className="progress-ring" style={{ '--progress': `${progress}%` } as React.CSSProperties} aria-label={`Progres kursus ${progress}%`}><div><b>{progress}<small>%</small></b><span>progres</span></div></div>
            </div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="progress-caption"><span>{completedChapters.length} dari 4 pertemuan selesai</span><span>{progress}%</span></div>
          </article>
          <aside className="insight-card">
            <div className="insight-top"><span className="insight-spark">✳</span><span>CATATAN KECIL</span><span className="insight-dots">•••</span></div>
            <p>Di titik setimbang, reaksi <em>tidak berhenti</em>—laju maju dan balik hanya sama besar.</p>
            <div className="insight-bottom"><span>INGAT INI SAAT BELAJAR</span><span className="insight-arrow">↗</span></div>
          </aside>
        </section>

        <section className="journey-section" id="perjalanan" aria-labelledby="journey-title">
          <div className="section-heading">
            <div><div className="section-kicker">PETA BELAJAR <span className="kicker-line" /></div><h2 id="journey-title">Empat langkah menuju <span>setimbang.</span></h2><p>Ikuti alurnya, lakukan eksperimennya, lalu cek pemahamanmu.</p></div>
            <a className="all-lessons-link" href="#perjalanan">Lihat seluruh materi <span aria-hidden="true">↗</span></a>
          </div>
          <div className="chapter-grid">
            {chapters.map((chapter, index) => {
              const isComplete = completedChapters.includes(chapter.number)
              const isCurrent = activeChapter === index
              return (
                <button className={`chapter-card ${isCurrent ? 'chapter-current' : ''}`} key={chapter.number} type="button" onClick={() => { setActiveChapter(index); document.getElementById('progres')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} aria-pressed={isCurrent}>
                  <div className="chapter-card-top"><span className={`chapter-icon icon-${chapter.color}`}>{chapter.icon}</span><span className={`chapter-status ${isComplete ? 'status-complete' : ''}`}>{isComplete ? '✓ SELESAI' : `PERTEMUAN ${chapter.number}`}</span></div>
                  <h3>{chapter.title}</h3><p>{chapter.description}</p>
                  <div className="chapter-card-bottom"><span>{chapter.duration}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="bottom-banner">
          <div className="banner-mark" aria-hidden="true">⇌</div><div><span>SIAP MENGUJI RASA INGIN TAHU?</span><h2>Kesetimbangan menunggumu.</h2></div><a href="#perjalanan" className="button button-light">Mulai dari awal <span aria-hidden="true">→</span></a>
          <div className="banner-decoration" aria-hidden="true">✳</div>
        </section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#beranda"><span className="brand-mark" aria-hidden="true"><span>⇌</span></span><span className="brand-name">EquiLab <b>11</b></span></a><span>Belajar kimia, satu eksperimen dalam satu waktu.</span><span>© 2026 EquiLab</span></footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App
