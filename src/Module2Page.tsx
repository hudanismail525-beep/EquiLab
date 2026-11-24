import { useState } from 'react'
import { module2Questions, module2Sections, type Module2ContentBlock } from './data/module2'

function FormulaText({ text }: { text: string }) {
  const parts = text.split(/_([A-Za-z0-9₂₃]+)/g)

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <sub key={`${part}-${index}`}>{part}</sub> : part,
      )}
    </>
  )
}

function ContentBlock({ block }: { block: Module2ContentBlock }) {
  if (block.type === 'paragraph') {
    return <p className="module2-paragraph">{block.text}</p>
  }

  if (block.type === 'formula') {
    return <div className="module2-formula"><FormulaText text={block.text} /></div>
  }

  if (block.type === 'list') {
    return (
      <ul className="module2-list">
        {block.items.map((item) => <li key={item}><FormulaText text={item} /></li>)}
      </ul>
    )
  }

  return (
    <article className="module2-example">
      <h3>{block.title}</h3>
      <div className="module2-formula"><FormulaText text={block.reaction} /></div>
      <div className="module2-formula"><FormulaText text={block.expression} /></div>
      {block.data && <p className="module2-example-detail"><FormulaText text={block.data} /></p>}
      {block.calculation && <div className="module2-formula"><FormulaText text={block.calculation} /></div>}
    </article>
  )
}

function Module2Page() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({})
  const allQuestionsChecked = module2Questions.every((question) => checkedQuestions[question.id])
  const score = module2Questions.filter(
    (question) => selectedAnswers[question.id] === question.answer,
  ).length

  function restartPractice() {
    setSelectedAnswers({})
    setCheckedQuestions({})
  }

  return (
    <main className="module2-page">
      <div className="page-heading module2-heading">
        <a className="back-link" href="#beranda"><span aria-hidden="true">←</span> Beranda</a>
        <div className="section-kicker">MODUL 2 <span className="kicker-line" /></div>
        <h1>Tetapan Kesetimbangan <span>(Kc dan Kp)</span></h1>
      </div>

      <div className="module2-sections">
        {module2Sections.map((section) => (
          <section className="module2-section" id={section.id} key={section.id}>
            <div className="module2-section-heading">
              <span className="module2-section-number">{section.number.padStart(2, '0')}</span>
              <h2>{section.title}</h2>
            </div>
            <div className="module2-section-content">
              {section.blocks.map((block, index) => (
                <ContentBlock key={`${section.id}-${block.type}-${index}`} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="module2-practice" aria-labelledby="module2-practice-title">
        <div className="module2-section-heading">
          <span className="module2-section-number">07</span>
          <h2 id="module2-practice-title">Cek pemahaman</h2>
        </div>

        {allQuestionsChecked && (
          <div className="module2-practice-result" role="status">
            <p>Hasil latihan: {score} dari {module2Questions.length} jawaban benar</p>
            <button type="button" className="button button-module2-reset" onClick={restartPractice}>
              Ulangi latihan
            </button>
          </div>
        )}

        <div className="module2-questions">
          {module2Questions.map((question, questionIndex) => {
            const selectedAnswer = selectedAnswers[question.id]
            const isChecked = checkedQuestions[question.id] === true
            const isCorrect = selectedAnswer === question.answer

            return (
              <fieldset className="module2-question" key={question.id} disabled={isChecked}>
                <legend>
                  <span className="module2-question-number">Soal {questionIndex + 1}</span>
                  <span>{question.question}</span>
                </legend>
                <div className="module2-options">
                  {question.options.map((option) => (
                    <label className="module2-option" key={option.id}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={selectedAnswer === option.id}
                        onChange={() => setSelectedAnswers((answers) => ({
                          ...answers,
                          [question.id]: option.id,
                        }))}
                      />
                      <span className="module2-option-id">{option.id}</span>
                      <span className="module2-option-text"><FormulaText text={option.text} /></span>
                    </label>
                  ))}
                </div>

                {isChecked && (
                  <div
                    className={`module2-feedback ${isCorrect ? 'module2-feedback-correct' : 'module2-feedback-incorrect'}`}
                    role="status"
                    aria-live="polite"
                  >
                    <b>{isCorrect ? 'Benar' : 'Belum tepat'}</b>
                    <p><strong>Jawaban benar:</strong> {question.answer}. <FormulaText text={question.options.find((option) => option.id === question.answer)?.text ?? ''} /></p>
                    <p><strong>Pembahasan:</strong> {question.explanation}</p>
                  </div>
                )}

                {!isChecked && (
                  <button
                    type="button"
                    className="button button-primary module2-check-answer"
                    disabled={!selectedAnswer}
                    onClick={() => setCheckedQuestions((questions) => ({
                      ...questions,
                      [question.id]: true,
                    }))}
                  >
                    Periksa jawaban
                  </button>
                )}
              </fieldset>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Module2Page
