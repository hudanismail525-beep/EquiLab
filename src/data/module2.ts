export type Module2ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'formula'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'example'
      title: string
      reaction: string
      expression: string
      data: string
      calculation: string
    }

export type Module2Question = {
  id: string
  question: string
  options: { id: string; text: string }[]
  answer: string
  explanation: string
}

export const module2Sections: {
  id: string
  number: string
  title: string
  blocks: Module2ContentBlock[]
}[] = [
  {
    id: 'module2-learning-objectives',
    number: '1',
    title: 'Tujuan pembelajaran',
    blocks: [
      {
        type: 'list',
        items: [
          'Menuliskan persamaan Kc dan Kp dari persamaan reaksi kesetimbangan.',
          'Menghitung nilai Kc dan Kp dari data kesetimbangan.',
          'Menghubungkan Kc dan Kp, serta menafsirkan nilai K.',
        ],
      },
    ],
  },
  {
    id: 'module2-kc',
    number: '2',
    title: 'Tetapan kesetimbangan konsentrasi (Kc)',
    blocks: [
      { type: 'paragraph', text: 'Untuk reaksi aA + bB ⇌ cC + dD:' },
      { type: 'formula', text: 'Kc = [C]ᶜ [D]ᵈ / ([A]ᵃ [B]ᵇ)' },
      {
        type: 'list',
        items: [
          '[ ] adalah konsentrasi dalam mol/L (M) pada keadaan setimbang.',
          'Hanya zat berwujud gas (g) dan larutan (aq) yang ditulis.',
          'Zat padat (s) dan cairan murni (l) tidak ditulis.',
        ],
      },
      {
        type: 'example',
        title: 'Contoh 1',
        reaction: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
        expression: 'Kc = [NH₃]² / ([N₂][H₂]³)',
        data: 'Data setimbang: [N₂] = 0,5 M; [H₂] = 1,0 M; [NH₃] = 0,2 M',
        calculation: 'Kc = (0,2)² / (0,5 × 1,0³) = 0,04 / 0,5 = 0,08',
      },
      {
        type: 'example',
        title: 'Contoh 2 (heterogen)',
        reaction: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)',
        expression: 'Kc = [CO₂]',
        data: '',
        calculation: '',
      },
    ],
  },
  {
    id: 'module2-kp',
    number: '3',
    title: 'Tetapan kesetimbangan tekanan parsial (Kp)',
    blocks: [
      { type: 'paragraph', text: 'Untuk reaksi gas aA(g) + bB(g) ⇌ cC(g) + dD(g):' },
      { type: 'formula', text: 'Kp = (P_C)ᶜ (P_D)ᵈ / ((P_A)ᵃ (P_B)ᵇ)' },
      {
        type: 'list',
        items: [
          'P adalah tekanan parsial gas (atm) pada keadaan setimbang.',
          'Hanya gas yang ditulis.',
          'Tekanan parsial: P_i = fraksi mol_i × tekanan total.',
        ],
      },
      {
        type: 'example',
        title: 'Contoh 3',
        reaction: 'N₂O₄(g) ⇌ 2NO₂(g)',
        expression: 'Kp = (P_NO₂)² / P_N₂O₄',
        data: 'Data setimbang: P_N₂O₄ = 0,4 atm; P_NO₂ = 1,2 atm',
        calculation: 'Kp = (1,2)² / 0,4 = 1,44 / 0,4 = 3,6',
      },
      {
        type: 'example',
        title: 'Contoh 4 (heterogen)',
        reaction: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)',
        expression: 'Kp = P_CO₂',
        data: '',
        calculation: '',
      },
    ],
  },
  {
    id: 'module2-kc-kp-relation',
    number: '4',
    title: 'Hubungan Kc dan Kp',
    blocks: [
      { type: 'formula', text: 'Kp = Kc (RT)^Δn' },
      {
        type: 'list',
        items: [
          'Δn = (jumlah koefisien gas produk) − (jumlah koefisien gas reaktan).',
          'R = 0,082 L·atm/(mol·K); T dalam kelvin.',
          'Jika Δn = 0, maka Kp = Kc.',
        ],
      },
      {
        type: 'example',
        title: 'Contoh 5',
        reaction: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) → Δn = 2 − (1 + 3) = −2,',
        expression: 'sehingga Kp = Kc (RT)⁻².',
        data: '',
        calculation: '',
      },
    ],
  },
  {
    id: 'module2-meaning-of-k',
    number: '5',
    title: 'Makna nilai K',
    blocks: [
      {
        type: 'list',
        items: [
          'K besar: pada kesetimbangan lebih banyak produk.',
          'K kecil: pada kesetimbangan lebih banyak reaktan.',
          'Nilai K hanya berubah jika suhu berubah; perubahan konsentrasi, tekanan, atau katalis tidak mengubah K.',
        ],
      },
    ],
  },
  {
    id: 'module2-summary',
    number: '6',
    title: 'Ringkasan',
    blocks: [
      {
        type: 'list',
        items: [
          'Kc = [C]ᶜ [D]ᵈ / ([A]ᵃ [B]ᵇ)',
          'Kp = (P_C)ᶜ (P_D)ᵈ / ((P_A)ᵃ (P_B)ᵇ)',
          'Kp = Kc (RT)^Δn',
          'K besar: pada kesetimbangan lebih banyak produk.',
          'K kecil: pada kesetimbangan lebih banyak reaktan.',
          'Nilai K hanya berubah jika suhu berubah; perubahan konsentrasi, tekanan, atau katalis tidak mengubah K.',
        ],
      },
    ],
  },
]

export const module2Questions: Module2Question[] = [
  {
    id: 'module2-question-01',
    question: 'Ekspresi Kc untuk 2NO(g) + O₂(g) ⇌ 2NO₂(g) adalah ...',
    options: [
      { id: 'A', text: '[NO₂] / ([NO][O₂])' },
      { id: 'B', text: '[NO₂]² / ([NO]²[O₂])' },
      { id: 'C', text: '[NO]²[O₂] / [NO₂]²' },
      { id: 'D', text: '[NO₂]² / ([NO][O₂])' },
      { id: 'E', text: '2[NO₂] / (2[NO][O₂])' },
    ],
    answer: 'B',
    explanation: 'Konsentrasi produk dipangkatkan koefisiennya di pembilang, reaktan dipangkatkan koefisiennya di penyebut.',
  },
  {
    id: 'module2-question-02',
    question: 'Ekspresi Kc untuk C(s) + CO₂(g) ⇌ 2CO(g) adalah ...',
    options: [
      { id: 'A', text: '[CO]² / ([C][CO₂])' },
      { id: 'B', text: '[CO]² / [CO₂]' },
      { id: 'C', text: '[CO] / [CO₂]' },
      { id: 'D', text: '[C][CO₂] / [CO]²' },
      { id: 'E', text: '[CO₂] / [CO]²' },
    ],
    answer: 'B',
    explanation: 'Zat padat (C) tidak ditulis dalam ekspresi Kc.',
  },
  {
    id: 'module2-question-03',
    question: 'Pada reaksi H₂(g) + I₂(g) ⇌ 2HI(g), konsentrasi setimbang [H₂] = 0,1 M; [I₂] = 0,1 M; [HI] = 0,4 M. Nilai Kc adalah ...',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '8' },
      { id: 'C', text: '16' },
      { id: 'D', text: '32' },
      { id: 'E', text: '40' },
    ],
    answer: 'C',
    explanation: 'Kc = [HI]² / ([H₂][I₂]) = (0,4)² / (0,1 × 0,1) = 0,16 / 0,01 = 16.',
  },
  {
    id: 'module2-question-04',
    question: 'Untuk N₂(g) + 3H₂(g) ⇌ 2NH₃(g), nilai Δn pada hubungan Kp = Kc(RT)^Δn adalah ...',
    options: [
      { id: 'A', text: '−4' },
      { id: 'B', text: '−2' },
      { id: 'C', text: '0' },
      { id: 'D', text: '+2' },
      { id: 'E', text: '+4' },
    ],
    answer: 'B',
    explanation: 'Δn = 2 − (1 + 3) = −2.',
  },
  {
    id: 'module2-question-05',
    question: 'Reaksi berikut yang memiliki nilai Kp = Kc adalah ...',
    options: [
      { id: 'A', text: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)' },
      { id: 'B', text: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)' },
      { id: 'C', text: 'H₂(g) + I₂(g) ⇌ 2HI(g)' },
      { id: 'D', text: 'N₂O₄(g) ⇌ 2NO₂(g)' },
      { id: 'E', text: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)' },
    ],
    answer: 'C',
    explanation: 'Kp = Kc jika Δn = 0. Hanya reaksi C yang jumlah mol gas kiri dan kanannya sama (2 = 2).',
  },
]
