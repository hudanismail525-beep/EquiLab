import { useEffect, useState } from 'react'
import './App.css'

const learningSections = [
  {
    number: '1.1',
    slug: '1-1',
    title: 'Reaksi searah dan bolak-balik',
    description:
      'Kenali perbedaan reaksi yang berakhir setelah reaktan habis dan reaksi yang dapat berlangsung ke dua arah.',
    formula: 'A → B  /  A ⇌ B',
    label: 'Mengenali jenis reaksi',
    introduction:
      'Reaksi kimia tidak semuanya berjalan dengan cara yang sama. Ada reaksi yang berlangsung menuju produk, dan ada reaksi yang dapat berlangsung maju maupun balik.',
    points: [
      {
        title: 'Reaksi searah',
        text: 'Reaktan berubah menjadi produk dan dalam kondisi pembelajaran dasar tidak kembali membentuk reaktan. Persamaan reaksinya ditulis dengan satu panah.',
        formula: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
      },
      {
        title: 'Reaksi bolak-balik',
        text: 'Produk dapat bereaksi kembali membentuk reaktan. Panah dua arah menunjukkan bahwa reaksi maju dan reaksi balik dapat berlangsung.',
        formula: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
      },
    ],
    takeaway:
      'Perhatikan simbol panah pada persamaan: satu arah (→) berbeda makna dengan panah bolak-balik (⇌).',
  },
  {
    number: '1.2',
    slug: '1-2',
    title: 'Kesetimbangan dinamis',
    description:
      'Pada keadaan setimbang, reaksi maju dan balik tetap berlangsung dengan laju yang sama.',
    formula: 'v maju = v balik',
    label: 'Mengamati proses',
    introduction:
      'Dalam sistem tertutup, reaksi bolak-balik dapat mencapai keadaan ketika perubahan yang berlangsung ke dua arah seimbang. Keadaan ini disebut kesetimbangan dinamis.',
    points: [
      {
        title: 'Reaksi tetap berlangsung',
        text: 'Partikel reaktan masih membentuk produk dan partikel produk masih membentuk reaktan. Kesetimbangan bukan berarti semua reaksi berhenti.',
        formula: 'reaksi maju ⇌ reaksi balik',
      },
      {
        title: 'Laju sama, konsentrasi tetap',
        text: 'Pada kesetimbangan, laju reaksi maju sama dengan laju reaksi balik. Konsentrasi setiap zat menjadi relatif tetap, tetapi konsentrasi reaktan dan produk tidak harus sama.',
        formula: 'v maju = v balik',
      },
    ],
    takeaway:
      'Yang sama saat setimbang adalah laju reaksi maju dan balik—bukan jumlah atau konsentrasi semua zat.',
  },
  {
    number: '1.3',
    slug: '1-3',
    title: 'Syarat dan ciri kesetimbangan',
    description:
      'Periksa sistem tertutup, reaksi bolak-balik, serta konsentrasi yang tetap meskipun partikel terus bereaksi.',
    formula: 'konsentrasi tetap ≠ reaksi berhenti',
    label: 'Menguji pemahaman',
    introduction:
      'Tidak setiap campuran reaksi dapat mencapai kesetimbangan kimia. Kenali kondisi sistem dan perubahan yang dapat diamati.',
    points: [
      {
        title: 'Sistem tertutup',
        text: 'Zat-zat dalam sistem tidak keluar atau masuk selama pengamatan. Kondisi ini memungkinkan reaktan dan produk tetap berinteraksi.',
        formula: 'zat tidak meninggalkan sistem',
      },
      {
        title: 'Reaksi bolak-balik dan dinamis',
        text: 'Reaksi berlangsung ke arah produk dan ke arah reaktan. Saat setimbang, kedua laju sama sehingga konsentrasi masing-masing zat relatif tetap.',
        formula: 'v maju = v balik  →  konsentrasi tetap',
      },
    ],
    takeaway:
      'Keadaan setimbang ditandai oleh laju maju dan balik yang sama serta konsentrasi yang tetap, bukan oleh berhentinya reaksi.',
  },
  {
    number: '1.4',
    slug: '1-4',
    title: 'Homogen dan heterogen',
    description:
      'Kelompokkan kesetimbangan berdasarkan kesamaan atau perbedaan wujud zat-zat yang terlibat.',
    formula: '(g) · (aq) · (l) · (s)',
    label: 'Membaca fasa zat',
    introduction:
      'Fasa atau wujud zat membantu kita mengenali jenis kesetimbangan. Lihat simbol fasa yang ditulis setelah rumus kimia setiap zat.',
    points: [
      {
        title: 'Kesetimbangan homogen',
        text: 'Semua zat yang terlibat berada pada fasa yang sama. Pada contoh berikut, seluruh zat berwujud gas.',
        formula: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
      },
      {
        title: 'Kesetimbangan heterogen',
        text: 'Zat-zat yang terlibat berada pada lebih dari satu fasa. Contoh berikut melibatkan padatan dan gas.',
        formula: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)',
      },
    ],
    takeaway:
      'Bandingkan label fasa (s), (l), (g), dan (aq) pada setiap zat untuk menentukan apakah fasanya sama atau berbeda.',
  },
]

const futureModules = [
  {
    number: '02',
    title: 'Hukum kesetimbangan dan Kc',
    detail: 'Hukum aksi massa, ekspresi Kc, dan tabel M-R-S.',
  },
  {
    number: '03',
    title: 'Kp dan derajat disosiasi',
    detail: 'Tekanan parsial, hubungan Kp–Kc, dan derajat disosiasi (α).',
  },
  {
    number: '04',
    title: 'Pergeseran kesetimbangan',
    detail: 'Asas Le Chatelier dan penerapannya pada reaksi kimia.',
  },
]

const pretestQuestions = [
  {
    question: 'Berikut ini adalah ciri-ciri terjadinya reaksi kesetimbangan, kecuali ... .',
    options: [
      'reaksi reversibel',
      'terjadi dalam ruang tertutup',
      'laju reaksi ke kiri sama dengan laju reaksi ke kanan',
      'reaksinya tidak dapat balik',
      'tidak terjadi perubahan makroskopis',
    ],
    answer: 3,
    explanation:
      'Kesetimbangan terjadi pada reaksi reversibel (bolak-balik), bukan reaksi yang tidak dapat balik.',
  },
  {
    question: 'Di bawah ini adalah contoh peristiwa alam yang menggunakan prinsip kesetimbangan, kecuali ... .',
    options: [
      'siklus air',
      'siklus oksigen',
      'siklus nitrogen',
      'siklus karbon',
      'siklus peredaran darah',
    ],
    answer: 4,
    explanation:
      'Siklus air, oksigen, nitrogen, dan karbon merupakan siklus alam. Peredaran darah adalah sistem biologis, bukan siklus kesetimbangan kimia yang dimaksud.',
  },
  {
    question: 'Berikut ini faktor-faktor yang memengaruhi pergeseran kesetimbangan, kecuali ... .',
    options: ['konsentrasi', 'katalisator', 'suhu', 'tekanan', 'volume'],
    answer: 1,
    explanation:
      'Katalis mempercepat tercapainya kesetimbangan, tetapi tidak menggeser posisi kesetimbangan.',
  },
  {
    question:
      'Bila dalam kesetimbangan dilakukan aksi, sistem akan mengadakan reaksi dengan mengurangi pengaruh aksi tersebut. Pernyataan tersebut dikemukakan oleh ... .',
    options: [
      'Fritz Haber',
      'Carl Bosch',
      'Wilhelm Ostwald',
      'Henri Louis Le Chatelier',
      'Lavoisier',
    ],
    answer: 3,
    explanation:
      'Pernyataan tersebut dikenal sebagai asas Le Chatelier, yang menjelaskan respons sistem kesetimbangan terhadap gangguan.',
  },
  {
    question:
      'Suatu reaksi kesetimbangan 2CO(g) + O₂(g) ⇌ 2CO₂(g), ΔH = −x kJ/mol. Agar kesetimbangan bergeser ke kanan, hal-hal berikut dapat dilakukan, kecuali ... .',
    options: [
      'pada suhu tetap, konsentrasi gas CO ditambah',
      'pada suhu tetap, tekanan sistem diturunkan',
      'pada suhu tetap, volume diturunkan',
      'pada suhu tetap, konsentrasi gas oksigen ditambah',
      'suhu diturunkan',
    ],
    answer: 1,
    explanation:
      'Tekanan diturunkan menggeser kesetimbangan ke sisi dengan jumlah mol gas lebih banyak, yaitu ke kiri (3 mol gas dibanding 2 mol gas).',
  },
]

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() =>
    getSlideIndex(window.location.hash),
  )
  const [currentPage, setCurrentPage] = useState(() =>
    getPageType(window.location.hash),
  )
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [pretestSubmitted, setPretestSubmitted] = useState(false)

  useEffect(() => {
    function syncPageWithHash() {
      setCurrentSlideIndex(getSlideIndex(window.location.hash))
      setCurrentPage(getPageType(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', syncPageWithHash)
    return () => window.removeEventListener('hashchange', syncPageWithHash)
  }, [])

  const slides = learningSections.flatMap((section) =>
    section.points.map((point, pointIndex) => ({
      section,
      point,
      pointIndex,
    })),
  )
  const currentSlide = currentSlideIndex >= 0 ? slides[currentSlideIndex] : null
  const currentSection = currentSlide?.section ?? null

  return (
    <div className="app-shell" id="beranda">
      <header className="topbar">
        <a className="brand" href="#beranda" aria-label="EquiLab 11, beranda">
          <span className="brand-mark" aria-hidden="true">⇌</span>
          <span className="brand-name">EquiLab <b>11</b></span>
        </a>
        <nav className="main-nav" aria-label="Navigasi utama">
          <a className={`nav-link${!currentSlide && currentPage === 'home' ? ' active' : ''}`} href="#beranda">Beranda</a>
          <a className={`nav-link${currentPage === 'pretest' ? ' active' : ''}`} href="#pretest">Pretest</a>
          {currentSection ? (
            <span className="nav-link current-nav-label">Modul 1 · Bagian {currentSection.number}</span>
          ) : (
            <>
              <a className="nav-link" href="#bagian-belajar">Modul 1</a>
              <a className="nav-link" href="#rencana-belajar">Rencana belajar</a>
            </>
          )}
        </nav>
        <span className="course-label">KIMIA · FASE F</span>
      </header>

      {currentSlide ? (
        <main className="lesson-page" aria-labelledby="lesson-title">
          <div className="lesson-breadcrumb">
            <a href="#modul-1">Modul 1</a><span aria-hidden="true">/</span><span>{currentSlide.section.number}</span><span aria-hidden="true">/</span><span>Slide {currentSlide.pointIndex + 1}</span>
          </div>
          <div className="lesson-progress-row">
            <span>FENOMENA REAKSI KESETIMBANGAN</span>
            <span>Slide {currentSlideIndex + 1} dari {slides.length}</span>
          </div>
          <div className="lesson-progress" role="progressbar" aria-label="Progres materi Modul 1" aria-valuemin={0} aria-valuemax={slides.length} aria-valuenow={currentSlideIndex + 1}>
            <span style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }} />
          </div>
          <section className="lesson-content" aria-live="polite">
            <div className="slide-heading">
              <span className="lesson-number">{currentSlide.section.number}</span>
              <p className="section-kicker">BAGIAN {currentSlide.section.number} <span className="kicker-line" /></p>
              <h1 id="lesson-title">{currentSlide.section.title}</h1>
              <p className="lesson-introduction">{currentSlide.section.introduction}</p>
            </div>
            <article className="lesson-point">
              <div className="lesson-point-heading"><span>{String(currentSlide.pointIndex + 1).padStart(2, '0')}</span><h2>{currentSlide.point.title}</h2></div>
              <p>{currentSlide.point.text}</p>
              <div className="lesson-formula">{currentSlide.point.formula}</div>
            </article>
            <aside className="lesson-takeaway">
              <span className="takeaway-mark" aria-hidden="true">!</span>
              <div><b>INTI BAGIAN INI</b><p>{currentSlide.section.takeaway}</p></div>
            </aside>
          </section>
          <nav className="lesson-pagination" aria-label="Navigasi slide materi">
            {currentSlideIndex > 0 ? (
              <a className="page-nav-button page-nav-previous" href={getSlideHref(slides[currentSlideIndex - 1])}>
                <span aria-hidden="true">←</span><span><small>SLIDE SEBELUMNYA</small><b>{slides[currentSlideIndex - 1].point.title}</b></span>
              </a>
            ) : (
              <a className="page-nav-button page-nav-previous" href="#modul-1">
                <span aria-hidden="true">←</span><span><small>KEMBALI KE</small><b>Beranda Modul 1</b></span>
              </a>
            )}
            {currentSlideIndex < slides.length - 1 ? (
              <a className="page-nav-button page-nav-next" href={getSlideHref(slides[currentSlideIndex + 1])}>
                <span><small>SLIDE BERIKUTNYA</small><b>{slides[currentSlideIndex + 1].point.title}</b></span><span aria-hidden="true">→</span>
              </a>
            ) : (
              <a className="page-nav-button page-nav-next" href="#modul-1">
                <span><small>SELESAI MEMBACA</small><b>Kembali ke beranda Modul 1</b></span><span aria-hidden="true">→</span>
              </a>
            )}
          </nav>
        </main>
      ) : currentPage === 'sections' ? (
        <main className="section-menu-page" id="bagian-belajar">
          <div className="page-heading">
            <a className="back-link" href="#beranda"><span aria-hidden="true">←</span> Beranda</a>
            <div className="section-kicker">PERTEMUAN 1 <span className="kicker-line" /></div>
            <h1>Bagian belajar <span>Modul 1</span></h1>
            <p>Pilih satu bagian untuk membukanya sebagai halaman belajar. Gunakan tombol slide untuk melanjutkan materi.</p>
          </div>
          <div className="learning-grid">
            {learningSections.map((section) => (
              <a className="learning-card" key={section.number} href={`#materi/${section.slug}/1`} aria-label={`Buka bagian ${section.number}: ${section.title}`}>
                <div className="learning-card-top"><span className="learning-number">{section.number}</span><span className="learning-label">{section.label}</span></div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="learning-formula">{section.formula}</div>
                <span className="learning-card-link">Buka bagian <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </main>
      ) : currentPage === 'roadmap' ? (
        <main className="roadmap-page" id="rencana-belajar">
          <div className="page-heading">
            <a className="back-link" href="#beranda"><span aria-hidden="true">←</span> Beranda</a>
            <div className="section-kicker">PETA BELAJAR <span className="kicker-line" /></div>
            <h1>Rencana materi <span>selanjutnya</span></h1>
            <p>Materi berikutnya akan dibuka bertahap setelah siap dipelajari.</p>
          </div>
          <div className="roadmap-grid">
            {futureModules.map((module) => (
              <article className="roadmap-card" key={module.number} aria-label={`${module.title}, belum tersedia`}>
                <div className="roadmap-card-top"><span className="roadmap-number">{module.number}</span><span className="availability unavailable">BELUM TERSEDIA</span></div>
                <h2>{module.title}</h2>
                <p>{module.detail}</p>
              </article>
            ))}
          </div>
        </main>
      ) : currentPage === 'pretest' ? (
        <main className="pretest-page" id="pretest">
          <div className="page-heading pretest-heading">
            <a className="back-link" href="#beranda"><span aria-hidden="true">←</span> Beranda</a>
            <div className="section-kicker">CEK PEMAHAMAN AWAL <span className="kicker-line" /></div>
            <h1>Pretest <span>Kesetimbangan Kimia</span></h1>
            <p>Jawab lima soal berikut untuk memetakan pemahaman awalmu. Hasil hanya ditampilkan di halaman ini.</p>
          </div>

          {pretestSubmitted && (
            <div className="pretest-result" role="status">
              <div><b>Hasil pretest</b><span>{pretestQuestions.filter((question, index) => selectedAnswers[index] === question.answer).length} dari {pretestQuestions.length} jawaban benar</span></div>
              <button type="button" className="reset-pretest" onClick={() => { setSelectedAnswers({}); setPretestSubmitted(false) }}>Ulangi pretest</button>
            </div>
          )}

          <div className="pretest-questions">
            {pretestQuestions.map((question, questionIndex) => (
              <fieldset className="pretest-question" key={question.question}>
                <legend><span className="question-number">{questionIndex + 1}</span><span>{question.question}</span></legend>
                <div className="answer-options">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.answer
                    const isSelected = selectedAnswers[questionIndex] === optionIndex
                    const answerClass = pretestSubmitted
                      ? isCorrect
                        ? ' answer-correct'
                        : isSelected
                          ? ' answer-incorrect'
                          : ''
                      : isSelected
                        ? ' answer-selected'
                        : ''

                    return (
                      <button
                        className={`answer-option${answerClass}`}
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        disabled={pretestSubmitted}
                        onClick={() => setSelectedAnswers((answers) => ({ ...answers, [questionIndex]: optionIndex }))}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option}</span>
                        {pretestSubmitted && isCorrect && <span className="correct-label">Jawaban benar</span>}
                        {pretestSubmitted && isSelected && !isCorrect && <span className="incorrect-label">Pilihanmu</span>}
                      </button>
                    )
                  })}
                </div>
                {pretestSubmitted && <p className="answer-explanation">{question.explanation}</p>}
              </fieldset>
            ))}
          </div>

          {!pretestSubmitted && (
            <button
              className="button button-primary submit-pretest"
              type="button"
              disabled={Object.keys(selectedAnswers).length !== pretestQuestions.length}
              onClick={() => setPretestSubmitted(true)}
            >
              Periksa Jawaban <span aria-hidden="true">→</span>
            </button>
          )}
        </main>
      ) : (
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> LEMBAR BELAJAR KIMIA <span className="eyebrow-line" /> KELAS XI</div>
            <h1 id="hero-title">Kesetimbangan: <span>diam terlihat,</span> terus bereaksi.</h1>
            <p className="hero-audience">Untuk siswa kelas XI SMA yang sedang mempelajari kesetimbangan kimia.</p>
            <p className="hero-description">
              Amati bagaimana reaksi maju dan balik berlangsung bersamaan. Mulai dari mengenali jenis reaksi hingga memahami mengapa konsentrasi tetap bukan berarti reaksi berhenti.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#materi/1-1">Mulai Belajar <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#pretest">Kerjakan pretest <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#bagian-belajar">Lihat bagian belajar <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <aside className="formula-sheet" aria-label="Catatan konsep mol pada persamaan reaksi">
            <div className="sheet-heading">
              <span className="sheet-icon" aria-hidden="true">∑</span>
              <span><b>CATATAN LAB</b><small>Reaksi pembentukan amonia</small></span>
              <span className="sheet-index">01 / 04</span>
            </div>
            <div className="sheet-equation" aria-label="N dua gas ditambah tiga H dua gas setimbang dengan dua NH tiga gas">
              N<sub>2</sub>(g) + 3H<sub>2</sub>(g) <span>⇌</span> 2NH<sub>3</sub>(g)
            </div>
            <div className="sheet-divider" />
            <div className="mol-note">
              <span className="mol-mark">mol</span>
              <div>
                <b>Koefisien menunjukkan perbandingan mol</b>
                <p>1 mol N<sub>2</sub> bereaksi dengan 3 mol H<sub>2</sub> membentuk 2 mol NH<sub>3</sub>.</p>
              </div>
            </div>
            <div className="sheet-footnote"><span className="forward-key">→ reaksi maju</span><span className="reverse-key">← reaksi balik</span></div>
          </aside>
        </section>

        <section className="module-section" id="modul-1" aria-labelledby="module-title">
          <div className="section-heading">
            <div>
              <div className="section-kicker">MATERI YANG TERSEDIA <span className="kicker-line" /></div>
              <h2 id="module-title">Mulai dari <span>fenomena reaksi.</span></h2>
              <p>Pelajari satu konsep secara bertahap, dengan istilah dan rumus yang dekat dengan materi kimia.</p>
            </div>
            <span className="availability available"><i aria-hidden="true" /> SIAP DIPELAJARI</span>
          </div>

          <article className="module-card">
            <div className="module-number" aria-hidden="true">01</div>
            <div className="module-content">
              <div className="module-meta"><span>PERTEMUAN 1</span><span className="meta-separator">·</span><span>FENOMENA REAKSI KESETIMBANGAN</span></div>
              <h3>Memahami reaksi yang terus berlangsung</h3>
              <p>
                Kenali reaksi bolak-balik dan keadaan dinamisnya. Perhatikan bahwa pada kesetimbangan, laju reaksi sama sementara konsentrasi tiap zat relatif tetap—nilainya tidak harus sama.
              </p>
              <a className="button button-module" href="#materi/1-1">Mulai Belajar <span aria-hidden="true">→</span></a>
              <a className="module-sections-link" href="#bagian-belajar">Lihat semua bagian <span aria-hidden="true">→</span></a>
            </div>
            <div className="module-equation" aria-label="A gas setimbang dengan B gas">
              <span>A<sub>(g)</sub></span><b>⇌</b><span>B<sub>(g)</sub></span>
              <small>REAKSI BOLAK-BALIK</small>
            </div>
          </article>

        </section>
      </main>
      )}

      {!currentSlide && <footer className="footer">
        <a className="brand footer-brand" href="#beranda"><span className="brand-mark" aria-hidden="true">⇌</span><span className="brand-name">EquiLab <b>11</b></span></a>
        <span>Belajar kesetimbangan kimia, satu konsep dalam satu waktu.</span>
        <span>© 2026 EquiLab</span>
      </footer>}
    </div>
  )
}

function getSlideIndex(hash: string) {
  const match = hash.match(/^#materi\/(1-[1-4])(?:\/([1-2]))?$/)
  if (!match) return -1
  const sectionIndex = learningSections.findIndex((section) => section.slug === match[1])
  const pointIndex = Number(match[2] ?? '1') - 1
  return sectionIndex * 2 + pointIndex
}

function getSlideHref(slide: { section: (typeof learningSections)[number]; pointIndex: number }) {
  return `#materi/${slide.section.slug}/${slide.pointIndex + 1}`
}

function getPageType(hash: string): 'home' | 'sections' | 'roadmap' | 'pretest' {
  if (hash === '#bagian-belajar') return 'sections'
  if (hash === '#rencana-belajar') return 'roadmap'
  if (hash === '#pretest') return 'pretest'
  return 'home'
}

export default App
