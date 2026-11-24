import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, type User } from '@firebase/auth'
import AuthPage from './AuthPage'
import { firebaseAuth, firebaseConfigError } from './firebase'
import Module2Page from './Module2Page'
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
    title: 'Tetapan Kesetimbangan (Kc dan Kp)',
    detail: 'Ekspresi dan perhitungan Kc/Kp, hubungan Kc dan Kp, serta makna nilai K.',
    href: '#modul-2',
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
    id: 'pretest-01',
    questionVersion: 'v1',
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
    id: 'pretest-02',
    questionVersion: 'v1',
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
    id: 'pretest-03',
    questionVersion: 'v1',
    question: 'Berikut ini faktor-faktor yang memengaruhi pergeseran kesetimbangan, kecuali ... .',
    options: ['konsentrasi', 'katalisator', 'suhu', 'tekanan', 'volume'],
    answer: 1,
    explanation:
      'Katalis mempercepat tercapainya kesetimbangan, tetapi tidak menggeser posisi kesetimbangan.',
  },
  {
    id: 'pretest-04',
    questionVersion: 'v1',
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
    id: 'pretest-05',
    questionVersion: 'v1',
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
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(firebaseAuth !== null)
  const [authStatusError, setAuthStatusError] = useState('')
  const [logoutError, setLogoutError] = useState('')
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() =>
    getSlideIndex(window.location.hash),
  )
  const [currentPage, setCurrentPage] = useState(() =>
    getPageType(window.location.hash),
  )
  const [pretestAnswers, setPretestAnswers] = useState<
    Record<string, { answer: number; questionVersion: string }>
  >({})
  const [activePretestIndex, setActivePretestIndex] = useState(0)
  const [isPretestAnswerChecked, setIsPretestAnswerChecked] = useState(false)
  const [pretestSubmitted, setPretestSubmitted] = useState(false)

  useEffect(() => {
    if (!firebaseAuth) return

    return onAuthStateChanged(
      firebaseAuth,
      (user) => {
        setAuthUser(user)
        setAuthLoading(false)
        if (user && ['#login', '#register', '#forgot-password'].includes(window.location.hash)) {
          window.location.hash = '#beranda'
        }
      },
      (error) => {
        setAuthStatusError(`Tidak dapat memeriksa sesi Firebase: ${error.message}`)
        setAuthLoading(false)
      },
    )
  }, [])

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

  async function handleSignOut() {
    if (!firebaseAuth) {
      setLogoutError(firebaseConfigError ?? 'Firebase belum siap dikonfigurasi.')
      return
    }

    setLogoutLoading(true)
    setLogoutError('')
    try {
      await signOut(firebaseAuth)
      window.location.hash = '#login'
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? `Tidak dapat keluar dari akun: ${error.message}`
          : 'Tidak dapat keluar dari akun. Silakan coba lagi.',
      )
    } finally {
      setLogoutLoading(false)
    }
  }

  if (authLoading) {
    return (
      <main className="auth-loading" role="status">
        <span className="auth-loading-mark" aria-hidden="true">⇌</span>
        <p>Memeriksa sesi belajar...</p>
      </main>
    )
  }

  if (authStatusError) {
    return (
      <main className="auth-loading" role="alert">
        <span className="auth-loading-mark" aria-hidden="true">!</span>
        <p>{authStatusError}</p>
      </main>
    )
  }

  if (!authUser) {
    return (
      <AuthPage
        mode={getAuthPageMode(window.location.hash) ?? 'login'}
        onAuthenticated={() => { window.location.hash = '#beranda' }}
      />
    )
  }

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
          <a className={`nav-link${currentPage === 'module2' ? ' active' : ''}`} href="#modul-2">Modul 2</a>
        </nav>
        <div className="auth-user-actions">
          <span className="auth-user-email" title={authUser.email ?? undefined}>{authUser.email}</span>
          <button className="auth-logout" type="button" onClick={handleSignOut} disabled={logoutLoading}>
            {logoutLoading ? 'Keluar...' : 'Keluar'}
          </button>
        </div>
      </header>
      {logoutError && <p className="auth-message auth-message-error auth-session-error" role="alert">{logoutError}</p>}

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
      ) : currentPage === 'module2' ? (
        <Module2Page />
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
            <p>Pilih modul yang tersedia untuk mulai belajar. Modul lainnya akan dibuka bertahap.</p>
          </div>
          <div className="roadmap-grid">
            {futureModules.map((module) => (
              module.href ? (
                <a className="roadmap-card roadmap-card-link" href={module.href} key={module.number}>
                  <div className="roadmap-card-top"><span className="roadmap-number">{module.number}</span><span className="availability available"><i aria-hidden="true" /> SIAP DIPELAJARI</span></div>
                  <h2>{module.title}</h2>
                  <p>{module.detail}</p>
                </a>
              ) : (
                <article className="roadmap-card" key={module.number} aria-label={`${module.title}, belum tersedia`}>
                  <div className="roadmap-card-top"><span className="roadmap-number">{module.number}</span><span className="availability unavailable">BELUM TERSEDIA</span></div>
                  <h2>{module.title}</h2>
                  <p>{module.detail}</p>
                </article>
              )
            ))}
          </div>
        </main>
      ) : currentPage === 'pretest' ? (
        <main className="pretest-page" id="pretest">
          <div className="page-heading pretest-heading">
            <a className="back-link" href="#beranda"><span aria-hidden="true">←</span> Beranda</a>
            <div className="section-kicker">CEK PEMAHAMAN AWAL <span className="kicker-line" /></div>
            <h1>Pretest <span>Kesetimbangan Kimia</span></h1>
            <p>Jawab satu per satu untuk memetakan pemahaman awalmu.</p>
          </div>

          {pretestSubmitted && (
            <section className="pretest-result" aria-labelledby="pretest-result-title">
              <div className="pretest-result-summary" role="status">
                <b id="pretest-result-title">Hasil pretest</b>
                <span>
                  {pretestQuestions.filter((question) => pretestAnswers[question.id]?.answer === question.answer).length}
                  {' '}dari {pretestQuestions.length} jawaban benar
                </span>
              </div>
              <button
                type="button"
                className="button button-primary reset-pretest"
                onClick={() => {
                  setPretestAnswers({})
                  setActivePretestIndex(0)
                  setIsPretestAnswerChecked(false)
                  setPretestSubmitted(false)
                }}
              >
                Ulangi
              </button>
            </section>
          )}

          {pretestSubmitted ? (
            <section className="pretest-review" aria-label="Rangkuman jawaban dan pembahasan">
              {pretestQuestions.map((question, questionIndex) => {
                const studentAnswer = pretestAnswers[question.id]?.answer
                const isCorrect = studentAnswer === question.answer
                const studentAnswerText = studentAnswer === undefined
                  ? 'Belum dijawab'
                  : `${String.fromCharCode(65 + studentAnswer)}. ${question.options[studentAnswer]}`

                return (
                  <article
                    className="pretest-review-question"
                    data-question-version={question.questionVersion}
                    key={question.id}
                  >
                    <div className="pretest-review-heading">
                      <span className="question-number">{questionIndex + 1}</span>
                      <span className={`pretest-status ${isCorrect ? 'pretest-status-correct' : 'pretest-status-incorrect'}`}>
                        {isCorrect ? 'Benar' : 'Belum tepat'}
                      </span>
                    </div>
                    <h2>{question.question}</h2>
                    <dl className="pretest-review-answers">
                      <div>
                        <dt>Jawabanmu</dt>
                        <dd>{studentAnswerText}</dd>
                      </div>
                      <div>
                        <dt>Jawaban benar</dt>
                        <dd>{String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}</dd>
                      </div>
                    </dl>
                    <p className="answer-explanation"><b>Pembahasan</b>{question.explanation}</p>
                  </article>
                )
              })}
            </section>
          ) : (
            <section className="pretest-questions" aria-label="Soal pretest">
              {pretestQuestions[activePretestIndex] && (() => {
                const question = pretestQuestions[activePretestIndex]
                const selectedAnswer = pretestAnswers[question.id]?.answer
                const isCorrect = selectedAnswer === question.answer

                return (
                  <fieldset
                    className="pretest-question"
                    data-question-version={question.questionVersion}
                    disabled={isPretestAnswerChecked}
                    key={question.id}
                  >
                    <legend>
                      <span className="question-progress">Soal {activePretestIndex + 1} dari {pretestQuestions.length}</span>
                      <span>{question.question}</span>
                    </legend>
                    <div className="answer-options">
                      {question.options.map((option, optionIndex) => (
                        <label className="answer-option" key={option}>
                          <input
                            className="answer-radio"
                            type="radio"
                            name={`answer-${question.id}`}
                            value={optionIndex}
                            checked={selectedAnswer === optionIndex}
                            onChange={() => setPretestAnswers((answers) => ({
                              ...answers,
                              [question.id]: {
                                answer: optionIndex,
                                questionVersion: question.questionVersion,
                              },
                            }))}
                          />
                          <span className="option-letter" aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
                          <span className="answer-option-text">{option}</span>
                        </label>
                      ))}
                    </div>

                    {isPretestAnswerChecked && selectedAnswer !== undefined && (
                      <div className={`pretest-feedback ${isCorrect ? 'pretest-feedback-correct' : 'pretest-feedback-incorrect'}`} role="status" aria-live="polite">
                        <b>{isCorrect ? 'Benar' : 'Belum tepat'}</b>
                        <p><strong>Jawabanmu:</strong> {String.fromCharCode(65 + selectedAnswer)}. {question.options[selectedAnswer]}</p>
                        <p><strong>Jawaban benar:</strong> {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}</p>
                        <p className="answer-explanation"><strong>Pembahasan:</strong> {question.explanation}</p>
                      </div>
                    )}
                  </fieldset>
                )
              })()}

              {!isPretestAnswerChecked ? (
                <button
                  className="button button-primary submit-pretest"
                  type="button"
                  disabled={pretestAnswers[pretestQuestions[activePretestIndex].id] === undefined}
                  onClick={() => setIsPretestAnswerChecked(true)}
                >
                  Periksa jawaban <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  className="button button-primary submit-pretest"
                  type="button"
                  onClick={() => {
                    if (activePretestIndex === pretestQuestions.length - 1) {
                      setPretestSubmitted(true)
                    } else {
                      setActivePretestIndex((index) => index + 1)
                      setIsPretestAnswerChecked(false)
                    }
                  }}
                >
                  {activePretestIndex === pretestQuestions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya'}
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </section>
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
              <span>
                N<sub>2</sub>(g) + 3H<sub>2</sub>(g) <span className="equation-arrow">⇌</span> 2NH<sub>3</sub>(g)
              </span>
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

          <article className="module-card module2-home-card">
            <div className="module-number" aria-hidden="true">02</div>
            <div className="module-content">
              <div className="module-meta"><span>MODUL 2</span><span className="meta-separator">·</span><span>TETAPAN KESETIMBANGAN</span></div>
              <h3>Tetapan Kesetimbangan (Kc dan Kp)</h3>
              <p>
                Menuliskan dan menghitung Kc dan Kp, menghubungkan Kc dan Kp, serta menafsirkan nilai K.
              </p>
              <a className="button button-module" href="#modul-2">Mulai Belajar <span aria-hidden="true">→</span></a>
            </div>
            <div className="module-equation" aria-label="Kp sama dengan Kc dikali RT pangkat delta n">
              <span>Kp = Kc (RT)<sup>Δn</sup></span>
              <small>TETAPAN KESETIMBANGAN</small>
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

function getPageType(hash: string): 'home' | 'sections' | 'roadmap' | 'pretest' | 'module2' {
  if (hash === '#bagian-belajar') return 'sections'
  if (hash === '#rencana-belajar') return 'roadmap'
  if (hash === '#pretest') return 'pretest'
  if (hash === '#modul-2') return 'module2'
  return 'home'
}

function getAuthPageMode(hash: string) {
  if (hash === '#register') return 'register'
  if (hash === '#forgot-password') return 'forgot-password'
  if (hash === '#login' || !hash) return 'login'
  return null
}

export default App
