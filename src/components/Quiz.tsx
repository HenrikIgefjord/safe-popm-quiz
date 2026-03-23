import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { questions as allQuestions, BUILTIN_QUIZ_ID, BUILTIN_QUIZ_NAME, type Question } from '../questions';
import {
  saveQuiz, listQuizzes, loadQuiz, deleteQuiz,
  getLastUsedId, setLastUsedId, type QuizMeta,
} from '../db';
import { parseExcel, ParseError } from '../parseExcel';

const DEFAULT_QUIZ_SIZE = 20;
const QUIZ_SIZE_KEY     = 'popm_quiz_size';

// ── Helpers ────────────────────────────────────────────────────────────────────

function loadQuizSize(): number {
  try {
    const n = parseInt(localStorage.getItem(QUIZ_SIZE_KEY) ?? '', 10);
    return isNaN(n) || n < 1 ? DEFAULT_QUIZ_SIZE : n;
  } catch { return DEFAULT_QUIZ_SIZE; }
}

function saveQuizSize(n: number) {
  try { localStorage.setItem(QUIZ_SIZE_KEY, String(n)); } catch { /* quota */ }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: Question): Question {
  const indexed = q.options.map((opt, i) => ({ opt, i }));
  const shuffled = shuffle(indexed);
  return {
    ...q,
    options: shuffled.map(x => x.opt),
    correctIndex: shuffled.findIndex(x => x.i === q.correctIndex),
  };
}

function pickQuestions(bank: Question[], size: number): Question[] {
  const n = Math.min(bank.length, Math.max(1, size));
  return shuffle(bank).slice(0, n).map(shuffleOptions);
}

// ── Session persistence ────────────────────────────────────────────────────────

const SESSION_KEY = 'popm_quiz_session';

type QuizState = 'start' | 'question' | 'result';

interface SessionData {
  state: QuizState;
  quiz: Question[];
  index: number;
  answers: (number | null)[];
  quizName: string;
}

function loadSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionData;
  } catch { return null; }
}

function saveSession(data: SessionData) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch { /* quota */ }
}

function clearSession() { localStorage.removeItem(SESSION_KEY); }

function builtinMeta(): QuizMeta {
  return { id: BUILTIN_QUIZ_ID, name: BUILTIN_QUIZ_NAME, questionCount: allQuestions.length, createdAt: 0, isBuiltin: true };
}

// ── Root component ─────────────────────────────────────────────────────────────

export default function Quiz() {
  // Library state
  const [quizzes, setQuizzes]                     = useState<QuizMeta[]>([builtinMeta()]);
  const [selectedQuizId, setSelectedQuizId]       = useState<string>(BUILTIN_QUIZ_ID);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[] | null>(allQuestions);
  const [libraryReady, setLibraryReady]           = useState(false);
  const [idbWarning, setIdbWarning]               = useState(false);
  const [uploadState, setUploadState]             = useState<'idle' | 'parsing' | 'error'>('idle');
  const [uploadError, setUploadError]             = useState<string | null>(null);
  const [quizSize, setQuizSize]                   = useState<number>(() => loadQuizSize());

  // Session state
  const saved = useMemo(() => loadSession(), []);
  const [state, setState]       = useState<QuizState>(saved?.state ?? 'start');
  const [quiz, setQuiz]         = useState<Question[]>(saved?.quiz ?? []);
  const [index, setIndex]       = useState(saved?.index ?? 0);
  const [answers, setAnswers]   = useState<(number | null)[]>(saved?.answers ?? []);
  const [quizName, setQuizName] = useState(saved?.quizName ?? BUILTIN_QUIZ_NAME);

  useEffect(() => {
    if (state === 'start') { clearSession(); return; }
    saveSession({ state, quiz, index, answers, quizName });
  }, [state, quiz, index, answers, quizName]);

  const score = useMemo(
    () => answers.filter((a, i) => a !== null && quiz[i] && a === quiz[i].correctIndex).length,
    [answers, quiz],
  );
  const allAnswered = quiz.length > 0 && answers.every(a => a !== null);

  // Init library from IndexedDB
  useEffect(() => {
    (async () => {
      let stored: QuizMeta[] = [];
      try { stored = await listQuizzes(); } catch { setIdbWarning(true); }
      const full: QuizMeta[] = [builtinMeta(), ...stored];
      setQuizzes(full);
      const lastId     = getLastUsedId();
      const resolvedId = full.some(q => q.id === lastId) ? lastId : BUILTIN_QUIZ_ID;
      setSelectedQuizId(resolvedId);
      if (resolvedId === BUILTIN_QUIZ_ID) {
        setSelectedQuestions(allQuestions);
      } else {
        try { setSelectedQuestions(await loadQuiz(resolvedId)); }
        catch { setSelectedQuestions(allQuestions); setSelectedQuizId(BUILTIN_QUIZ_ID); }
      }
      setLibraryReady(true);
    })();
  }, []);

  // Handlers
  const handleSelectQuiz = useCallback(async (id: string) => {
    setSelectedQuizId(id);
    if (id === BUILTIN_QUIZ_ID) { setSelectedQuestions(allQuestions); return; }
    setSelectedQuestions(null);
    setSelectedQuestions(await loadQuiz(id));
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setUploadState('parsing'); setUploadError(null);
    try {
      const parsed  = parseExcel(await file.arrayBuffer());
      const base    = file.name.replace(/\.xlsx$/i, '');
      const names   = new Set(quizzes.map(q => q.name));
      let name      = base; let s = 2;
      while (names.has(name)) name = `${base} (${s++})`;
      const id = crypto.randomUUID();
      await saveQuiz(id, name, parsed);
      const full = [builtinMeta(), ...(await listQuizzes())];
      setQuizzes(full); setSelectedQuizId(id); setSelectedQuestions(parsed);
      setUploadState('idle');
    } catch (err) {
      setUploadError(err instanceof ParseError ? err.message : 'Failed to read the file. Is it a valid .xlsx file?');
      setUploadState('error');
    }
  }, [quizzes]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteQuiz(id);
    const full = [builtinMeta(), ...(await listQuizzes())];
    setQuizzes(full);
    if (selectedQuizId === id) { setSelectedQuizId(BUILTIN_QUIZ_ID); setSelectedQuestions(allQuestions); }
  }, [selectedQuizId]);

  const start = useCallback(() => {
    if (!selectedQuestions) return;
    const name = quizzes.find(q => q.id === selectedQuizId)?.name ?? BUILTIN_QUIZ_NAME;
    const q    = pickQuestions(selectedQuestions, quizSize);
    setLastUsedId(selectedQuizId);
    saveQuizSize(quizSize);
    setQuizName(name); setQuiz(q); setIndex(0);
    setAnswers(new Array(q.length).fill(null)); setState('question');
  }, [selectedQuestions, selectedQuizId, quizzes, quizSize]);

  const handleAnswer = useCallback((opt: number) => {
    if (answers[index] !== null) return;
    setAnswers(prev => { const n = [...prev]; n[index] = opt; return n; });
  }, [answers, index]);

  const goTo   = useCallback((i: number) => setIndex(i), []);
  const goPrev = useCallback(() => { if (index > 0) setIndex(index - 1); }, [index]);
  const goNext = useCallback(() => {
    if (allAnswered) { setState('result'); return; }
    const next  = answers.findIndex((a, i) => i > index && a === null);
    const first = answers.findIndex(a => a === null);
    setIndex(next !== -1 ? next : first !== -1 ? first : (setState('result'), 0));
  }, [answers, index, allAnswered]);

  // Render
  if (!libraryReady) return (
    <div className="flex items-center justify-center min-h-screen text-slate-500 dark:text-slate-400 text-sm">
      Loading quiz library…
    </div>
  );

  if (state === 'start') return (
    <StartScreen
      onStart={start}
      quizzes={quizzes}
      selectedQuizId={selectedQuizId}
      selectedQuestions={selectedQuestions}
      onSelectQuiz={handleSelectQuiz}
      onUpload={handleUpload}
      onDelete={handleDelete}
      uploadState={uploadState}
      uploadError={uploadError}
      idbWarning={idbWarning}
      quizSize={quizSize}
      onQuizSizeChange={setQuizSize}
    />
  );

  if (state === 'result') return (
    <ResultScreen
      score={score} total={quiz.length} quiz={quiz} answers={answers}
      quizName={quizName} onRestart={() => setState('start')}
    />
  );

  return (
    <QuestionScreen
      question={quiz[index]} questionNumber={index + 1} total={quiz.length}
      selected={answers[index] ?? null} answers={answers} quiz={quiz}
      onAnswer={handleAnswer} onNext={goNext} onPrev={goPrev} onGoTo={goTo}
      allAnswered={allAnswered}
    />
  );
}

// ── Start Screen ───────────────────────────────────────────────────────────────

interface StartScreenProps {
  onStart: () => void;
  quizzes: QuizMeta[];
  selectedQuizId: string;
  selectedQuestions: Question[] | null;
  onSelectQuiz: (id: string) => void;
  onUpload: (file: File) => void;
  onDelete: (id: string) => void;
  uploadState: 'idle' | 'parsing' | 'error';
  uploadError: string | null;
  idbWarning: boolean;
  quizSize: number;
  onQuizSizeChange: (n: number) => void;
}

function StartScreen({
  onStart, quizzes, selectedQuizId, selectedQuestions,
  onSelectQuiz, onUpload, onDelete, uploadState, uploadError, idbWarning,
  quizSize, onQuizSizeChange,
}: StartScreenProps) {
  const fileRef    = useRef<HTMLInputElement>(null);
  const selected   = quizzes.find(q => q.id === selectedQuizId) ?? quizzes[0];
  const qCount     = selected?.questionCount ?? 0;
  const effectiveN = Math.min(qCount, Math.max(1, quizSize));
  const canStart   = selectedQuestions !== null && uploadState !== 'parsing';

  const handleSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (!isNaN(raw)) onQuizSizeChange(Math.min(Math.max(1, raw), qCount || raw));
  };
  const handleSizeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (isNaN(raw) || raw < 1) onQuizSizeChange(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = '';
  };
  const confirmDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) onDelete(id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="max-w-lg w-full">

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Certification Prep
          </span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
            Quiz App
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Select a quiz, upload your own, or start immediately.
          </p>
        </div>

        {/* IDB warning */}
        {idbWarning && (
          <div className="mb-4 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs">
            ⚠️ Browser storage is unavailable — uploaded quizzes won't be saved between sessions.
          </div>
        )}

        {/* Quiz selector */}
        <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-2xl p-5 mb-4 space-y-4">

          {/* Bank picker */}
          <div>
            <label className="block text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
              Active Quiz
            </label>
            <div className="flex gap-2">
              <select
                value={selectedQuizId}
                onChange={e => onSelectQuiz(e.target.value)}
                className="flex-1 bg-slate-100 border border-slate-300 text-slate-900
                           dark:bg-slate-700 dark:border-slate-600 dark:text-white
                           text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {quizzes.map(q => (
                  <option key={q.id} value={q.id}>{q.name} ({q.questionCount} questions)</option>
                ))}
              </select>
              {selected && !selected.isBuiltin && (
                <button
                  onClick={() => confirmDelete(selected.id, selected.name)}
                  title="Delete this quiz"
                  className="px-3 py-2 bg-slate-100 border border-slate-300 text-slate-500
                             hover:bg-red-50 hover:border-red-300 hover:text-red-600
                             dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400
                             dark:hover:bg-red-900/60 dark:hover:border-red-600 dark:hover:text-red-300
                             rounded-lg transition-colors text-sm"
                >
                  🗑
                </button>
              )}
            </div>
            {selectedQuestions === null && (
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">Loading questions…</p>
            )}
          </div>

          {/* Quiz size picker */}
          <div>
            <label className="block text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
              Questions per Quiz
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={qCount || undefined}
                value={quizSize}
                onChange={handleSizeInput}
                onBlur={handleSizeBlur}
                className="w-20 bg-slate-100 border border-slate-300 text-slate-900
                           dark:bg-slate-700 dark:border-slate-600 dark:text-white
                           text-sm rounded-lg px-3 py-2.5 text-center
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="flex gap-1.5">
                {[5, 10, 20, ...(qCount > 20 ? [qCount] : [])].map(n => {
                  const label = n === qCount ? 'All' : String(n);
                  const active = quizSize === n;
                  return (
                    <button
                      key={n}
                      onClick={() => onQuizSizeChange(n)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors border
                        ${active
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-600'
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            {qCount > 0 && quizSize > qCount && (
              <p className="text-amber-600 dark:text-amber-400 text-xs mt-1.5">
                Only {qCount} question{qCount !== 1 ? 's' : ''} available — quiz will use all of them.
              </p>
            )}
          </div>

        </div>

        {/* Upload */}
        <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-2xl p-5 mb-4">
          <label className="block text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
            Upload Custom Quiz
          </label>
          <input ref={fileRef} type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploadState === 'parsing'}
            className="w-full border-2 border-dashed border-slate-300 text-slate-500
                       hover:border-blue-400 hover:text-blue-600
                       dark:border-slate-600 dark:text-slate-400
                       dark:hover:border-blue-500 dark:hover:text-blue-300
                       rounded-xl py-3 text-sm font-medium transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadState === 'parsing' ? '⏳ Parsing file…' : '📂 Upload Excel (.xlsx)'}
          </button>

          {uploadState === 'error' && uploadError && (
            <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-red-600
                            dark:border-red-700 dark:bg-red-900/40 dark:text-red-300
                            text-xs leading-relaxed">
              ❌ {uploadError}
            </div>
          )}

          <details className="mt-3">
            <summary className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-xs cursor-pointer select-none">
              Required Excel column format ▾
            </summary>
            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-3
                            dark:border-slate-700 dark:bg-slate-900/60
                            text-xs leading-relaxed font-mono space-y-0.5">
              {[
                ['Question',           'question text'],
                ['Option A / B / C / D','four answer choices'],
                ['Correct',            'A, B, C, or D'],
                ['Explanation',        'shown after answering (may be blank)'],
                ['Category',           'optional label'],
              ].map(([col, note]) => (
                <p key={col}>
                  <span className="text-slate-700 dark:text-slate-300">{col}</span>
                  <span className="text-slate-400 dark:text-slate-500"> — {note}</span>
                </p>
              ))}
              <p className="pt-1 text-slate-400 dark:text-slate-500">Row 1 = header. Only first sheet is read.</p>
            </div>
          </details>
        </div>

        {/* Info block */}
        <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-2xl p-5 mb-6 space-y-2">
          {[
            ['📋', 'Quiz',       `${selected?.name ?? '—'} — ${qCount} question${qCount !== 1 ? 's' : ''}`],
            ['🎯', 'Format',     `${effectiveN} multiple-choice question${effectiveN !== 1 ? 's' : ''}, 4 options each`],
            ['💡', 'Feedback',   'Explanation shown immediately after each answer'],
            ['🔄', 'Randomized', 'Questions and answer order shuffled every quiz'],
            ['💾', 'Persistent', 'Progress saved — reload picks up where you left off'],
          ].map(([icon, label, value]) => (
            <div key={label} className="flex gap-3 text-sm">
              <span className="text-xl leading-none mt-0.5">{icon}</span>
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{label}: </span>
                <span className="text-slate-500 dark:text-slate-400">{value}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          disabled={!canStart}
          className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                     disabled:opacity-40 disabled:cursor-not-allowed
                     text-white font-bold text-lg py-4 rounded-xl transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

// ── Question Navigator ─────────────────────────────────────────────────────────

interface NavigatorProps {
  total: number;
  currentIndex: number;
  answers: (number | null)[];
  quiz: Question[];
  onGoTo: (i: number) => void;
}

function QuestionNavigator({ total, currentIndex, answers, quiz, onGoTo }: NavigatorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-5">
      {Array.from({ length: total }, (_, i) => {
        const ans       = answers[i];
        const isCurrent = i === currentIndex;
        const isCorrect = ans !== null && quiz[i] && ans === quiz[i].correctIndex;
        const isWrong   = ans !== null && !isCorrect;

        let bg = 'bg-slate-200 text-slate-500 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600';
        if (isCorrect) bg = 'bg-green-600 text-white hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600';
        if (isWrong)   bg = 'bg-red-600   text-white hover:bg-red-500   dark:bg-red-700   dark:hover:bg-red-600';

        const ring = isCurrent
          ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-slate-50 dark:ring-blue-400 dark:ring-offset-slate-900'
          : '';

        return (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            title={`Question ${i + 1}${ans !== null ? (isCorrect ? ' ✓' : ' ✗') : ''}`}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${bg} ${ring}`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

// ── Question Screen ────────────────────────────────────────────────────────────

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  total: number;
  selected: number | null;
  answers: (number | null)[];
  quiz: Question[];
  onAnswer: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (i: number) => void;
  allAnswered: boolean;
}

function QuestionScreen({
  question, questionNumber, total, selected, answers, quiz,
  onAnswer, onNext, onPrev, onGoTo, allAnswered,
}: QuestionScreenProps) {
  const answered      = selected !== null;
  const correct       = question.correctIndex;
  const answeredCount = answers.filter(a => a !== null).length;
  const isLast        = questionNumber === total;
  const nextLabel     = allAnswered || (isLast && answered) ? 'See Results' : 'Next Question →';

  const optionStyle = (i: number): string => {
    const base = 'w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ';
    if (!answered) return base +
      'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-blue-500 cursor-pointer ' +
      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';
    if (i === correct) return base +
      'border-green-500 bg-green-50 text-green-700 cursor-default ' +
      'dark:bg-green-900/40 dark:text-green-300';
    if (i === selected) return base +
      'border-red-400 bg-red-50 text-red-600 cursor-default ' +
      'dark:border-red-500 dark:bg-red-900/40 dark:text-red-300';
    return base +
      'border-slate-200 bg-slate-50 text-slate-400 cursor-default ' +
      'dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-500';
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrev}
            disabled={questionNumber === 1}
            className="text-sm text-slate-500 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed
                       dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            ← Prev
          </button>
          <div className="text-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              Question <span className="text-slate-900 dark:text-white font-bold">{questionNumber}</span> of {total}
            </span>
            <span className="ml-3 text-slate-400 dark:text-slate-500 text-xs">{answeredCount}/{total} answered</span>
          </div>
          <span className="bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs">
            {question.category || 'General'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mb-5">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>

        {/* Navigator */}
        <QuestionNavigator
          total={total} currentIndex={questionNumber - 1}
          answers={answers} quiz={quiz} onGoTo={onGoTo}
        />

        {/* Question card */}
        <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-2xl p-6 mb-5">
          <p className="text-slate-900 dark:text-white text-base leading-relaxed font-medium">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-5">
          {question.options.map((opt, i) => (
            <button key={i} className={optionStyle(i)} onClick={() => onAnswer(i)}>
              <span className="inline-flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </span>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-5
                          dark:border-blue-700 dark:bg-blue-950/50">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{selected === correct ? '✅' : '❌'}</span>
              <div>
                <p className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-1">
                  {selected === correct
                    ? 'Correct!'
                    : `Incorrect — Correct answer: ${String.fromCharCode(65 + correct)}. ${question.options[correct]}`}
                </p>
                {question.explanation && (
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {question.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {questionNumber > 1 && (
            <button
              onClick={onPrev}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm
                         dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
            >
              ← Previous
            </button>
          )}
          {answered && (
            <button
              onClick={onNext}
              className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {nextLabel}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// ── Result Screen ──────────────────────────────────────────────────────────────

interface ResultScreenProps {
  score: number;
  total: number;
  quiz: Question[];
  answers: (number | null)[];
  quizName: string;
  onRestart: () => void;
}

function ResultScreen({ score, total, quiz, answers, quizName, onRestart }: ResultScreenProps) {
  const pct  = Math.round((score / total) * 100);
  const [expanded, setExpanded] = useState<number | null>(null);

  const grade =
    pct >= 80 ? { label: 'Excellent',    color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-600' }
    : pct >= 60 ? { label: 'Good',       color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-600' }
    : { label: 'Keep Studying',           color: 'text-red-600 dark:text-red-400',       bg: 'bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-600' };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8">
      <div className="max-w-2xl w-full">

        {/* Score card */}
        <div className={`rounded-2xl border p-6 mb-6 text-center ${grade.bg}`}>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">{quizName}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Final Score</p>
          <p className={`text-6xl font-bold mb-1 ${grade.color}`}>{pct}%</p>
          <p className="text-slate-700 dark:text-slate-300 text-lg font-semibold">{score} / {total} correct</p>
          <p className={`text-sm font-bold mt-2 ${grade.color}`}>{grade.label}</p>
          {pct < 80 && (
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
              The SAFe POPM exam typically requires ~77% to pass. Keep reviewing!
            </p>
          )}
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors mb-6"
        >
          Back to Quiz Selection
        </button>

        {/* Review */}
        <h2 className="text-slate-900 dark:text-white font-bold text-lg mb-3">Review Answers</h2>
        <div className="space-y-2">
          {quiz.map((q, i) => {
            const wasCorrect = answers[i] === q.correctIndex;
            const isOpen     = expanded === i;
            return (
              <div key={q.id} className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  <span className="flex-shrink-0 mt-0.5 text-base">{wasCorrect ? '✅' : '❌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-snug">{q.question}</p>
                    {!wasCorrect && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-0.5">
                        Your answer: {String.fromCharCode(65 + (answers[i] ?? 0))}. {q.options[answers[i] ?? 0]}
                      </p>
                    )}
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 flex-shrink-0 text-xs">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-green-600 dark:text-green-400 text-xs font-semibold mb-1">
                      Correct: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                    </p>
                    {q.explanation && (
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{q.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
