import { useState, type FormEvent } from 'react'
import { FirebaseError } from '@firebase/app'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@firebase/auth'
import { firebaseAuth, firebaseConfigError } from './firebase'
import './auth.css'

export type AuthPageMode = 'login' | 'register' | 'forgot-password'

type AuthPageProps = {
  mode: AuthPageMode
  onAuthenticated: () => void
}

type PasswordInputProps = {
  id: string
  autoComplete: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  minLength: number
  required: boolean
}

function PasswordInput({
  id,
  autoComplete,
  placeholder,
  value,
  onChange,
  minLength,
  required,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="auth-password-input">
      <input
        id={id}
        type={isVisible ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minLength={minLength}
        required={required}
      />
      <button
        className="auth-password-toggle"
        type="button"
        aria-label={isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {isVisible ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3l18 18" />
            <path d="M10.6 10.6a2 2 0 002.8 2.8" />
            <path d="M9.9 5.2A10.7 10.7 0 0112 5c5.5 0 9 7 9 7a15.7 15.7 0 01-3.1 3.9" />
            <path d="M6.2 6.2C3.9 7.7 2 12 2 12s3.5 7 10 7a10.7 10.7 0 003.1-.5" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}

const pageContent: Record<AuthPageMode, { title: string; description: string }> = {
  login: {
    title: 'Selamat datang kembali',
    description: 'Masuk untuk melanjutkan perjalanan belajarmu.',
  },
  register: {
    title: 'Buat akun EquiLab',
    description: 'Daftar untuk mulai belajar kesetimbangan kimia.',
  },
  'forgot-password': {
    title: 'Atur ulang kata sandi',
    description: 'Kami akan mengirimkan tautan untuk membuat kata sandi baru.',
  },
}

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.'
  }

  switch (error.code) {
    case 'auth/invalid-email':
      return 'Format alamat email belum benar.'
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan masuk dengan akun tersebut.'
    case 'auth/weak-password':
      return 'Kata sandi terlalu lemah. Gunakan minimal 6 karakter.'
    case 'auth/user-disabled':
      return 'Akun ini dinonaktifkan. Hubungi administrator.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau kata sandi tidak cocok.'
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'
    case 'auth/network-request-failed':
      return 'Tidak dapat terhubung. Periksa koneksi internet lalu coba lagi.'
    case 'auth/operation-not-allowed':
      return 'Metode Email/Password belum diaktifkan di Firebase Console.'
    default:
      return `Firebase tidak dapat menyelesaikan permintaan (${error.code}).`
  }
}

function AuthPage({ mode, onAuthenticated }: AuthPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const content = pageContent[mode]
  const isConfigured = firebaseAuth !== null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!firebaseAuth) {
      setErrorMessage(firebaseConfigError ?? 'Firebase belum siap dikonfigurasi.')
      return
    }

    if (mode === 'register' && password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi belum sama.')
      return
    }

    setIsSubmitting(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
        onAuthenticated()
      } else if (mode === 'register') {
        await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
        onAuthenticated()
      } else {
        await sendPasswordResetEmail(firebaseAuth, email.trim())
        setSuccessMessage('Jika email tersebut terdaftar, tautan untuk mengatur ulang kata sandi akan segera dikirim.')
      }
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand-row">
          <a className="brand auth-brand" href="#login" aria-label="EquiLab 11">
            <span className="brand-mark" aria-hidden="true">⇌</span>
            <span className="brand-name">EquiLab <b>11</b></span>
          </a>
          <span className="auth-course-label">KIMIA · FASE F</span>
        </div>

        <div className="auth-card-body">
          <div className="auth-intro">
            <span className="auth-kicker"><span className="eyebrow-dot" /> RUANG BELAJAR KIMIA</span>
            <h1 id="auth-title">{content.title}</h1>
            <p>{content.description}</p>
          </div>

          {mode === 'register' && (
            <div className="auth-benefit">
              <span className="auth-benefit-mark" aria-hidden="true">⇌</span>
              <span>Belajar kesetimbangan kimia, satu konsep dalam satu waktu.</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="auth-email">Alamat email</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {mode !== 'forgot-password' && (
              <>
                <div className="auth-label-row">
                  <label htmlFor="auth-password">Kata sandi</label>
                  {mode === 'login' && <a href="#forgot-password">Lupa kata sandi?</a>}
                </div>
                <PasswordInput
                  id="auth-password"
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={setPassword}
                  minLength={6}
                  required
                />
              </>
            )}

            {mode === 'register' && (
              <>
                <label htmlFor="auth-confirm-password">Konfirmasi kata sandi</label>
                <PasswordInput
                  id="auth-confirm-password"
                  autoComplete="new-password"
                  placeholder="Ulangi kata sandi"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  minLength={6}
                  required
                />
              </>
            )}

            {firebaseConfigError && (
              <p className="auth-message auth-message-error" role="alert">
                {firebaseConfigError} Lengkapi variabel Firebase di `.env.local`, lalu jalankan ulang aplikasi.
              </p>
            )}
            {errorMessage && <p className="auth-message auth-message-error" role="alert">{errorMessage}</p>}
            {successMessage && <p className="auth-message auth-message-success" role="status">{successMessage}</p>}

            <button className="auth-submit" type="submit" disabled={!isConfigured || isSubmitting}>
              {isSubmitting
                ? 'Memproses...'
                : mode === 'login'
                  ? 'Masuk'
                  : mode === 'register'
                    ? 'Buat akun'
                    : 'Kirim tautan reset'}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="auth-alternate">
            {mode === 'login' ? (
              <p>Belum punya akun? <a href="#register">Daftar sekarang</a></p>
            ) : mode === 'register' ? (
              <p>Sudah punya akun? <a href="#login">Masuk</a></p>
            ) : (
              <p>Ingat kata sandi? <a href="#login">Kembali ke masuk</a></p>
            )}
          </div>
        </div>

        <footer className="auth-footer">
          <span>© 2026 EquiLab 11</span>
          <span>Belajar dengan rasa ingin tahu.</span>
        </footer>
      </section>

      <aside className="auth-side-note" aria-label="Tentang EquiLab">
        <span className="auth-side-symbol" aria-hidden="true">⇌</span>
        <p>Diam terlihat,<br /><b>terus bereaksi.</b></p>
        <span>Jelajahi konsep kesetimbangan kimia melalui pembelajaran yang bertahap.</span>
      </aside>
    </main>
  )
}

export default AuthPage
