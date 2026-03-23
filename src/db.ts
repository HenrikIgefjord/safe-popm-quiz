import type { Question } from './questions';

// ── Shared constants ───────────────────────────────────────────────────────────
export const BUILTIN_QUIZ_ID   = 'builtin';
export const BUILTIN_QUIZ_NAME = 'SAFe POPM (Built-in)';

const LAST_USED_KEY = 'popm_last_quiz_id';
const DB_NAME       = 'popm_quiz_library';
const DB_VERSION    = 1;
const STORE         = 'quizzes';

// ── Stored shape ───────────────────────────────────────────────────────────────
export interface QuizMeta {
  id: string;
  name: string;
  questionCount: number;
  createdAt: number;
  isBuiltin: boolean;
}

interface StoredRecord extends QuizMeta {
  questions: Question[];
}

// ── IndexedDB helpers ──────────────────────────────────────────────────────────
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

function tx(
  db: IDBDatabase,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const t     = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const req   = fn(store);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Persist an uploaded quiz (overwrites if same id). */
export async function saveQuiz(
  id: string,
  name: string,
  questions: Question[],
): Promise<void> {
  const db  = await openDB();
  const rec: StoredRecord = {
    id,
    name,
    questions,
    questionCount: questions.length,
    createdAt: Date.now(),
    isBuiltin: false,
  };
  await tx(db, 'readwrite', store => store.put(rec));
  db.close();
}

/** Return metadata for all stored (non-builtin) quizzes, newest first. */
export async function listQuizzes(): Promise<QuizMeta[]> {
  const db = await openDB();
  const result = await new Promise<QuizMeta[]>((resolve, reject) => {
    const t     = db.transaction(STORE, 'readonly');
    const index = t.objectStore(STORE).index('createdAt');
    const req   = index.openCursor(null, 'prev'); // descending
    const items: QuizMeta[] = [];
    req.onsuccess = () => {
      const cursor = req.result as IDBCursorWithValue | null;
      if (cursor) {
        const r = cursor.value as StoredRecord;
        items.push({ id: r.id, name: r.name, questionCount: r.questionCount, createdAt: r.createdAt, isBuiltin: false });
        cursor.continue();
      } else {
        resolve(items);
      }
    };
    req.onerror = () => reject(req.error);
  });
  db.close();
  return result;
}

/** Load the full question array for a stored quiz. Returns null if not found. */
export async function loadQuiz(id: string): Promise<Question[] | null> {
  const db  = await openDB();
  const rec = (await tx(db, 'readonly', store => store.get(id))) as StoredRecord | undefined;
  db.close();
  return rec?.questions ?? null;
}

/** Delete a stored quiz by id. No-op if not found. */
export async function deleteQuiz(id: string): Promise<void> {
  const db = await openDB();
  await tx(db, 'readwrite', store => store.delete(id));
  db.close();
}

// ── Last-used (localStorage) ───────────────────────────────────────────────────
export function getLastUsedId(): string {
  return localStorage.getItem(LAST_USED_KEY) ?? BUILTIN_QUIZ_ID;
}

export function setLastUsedId(id: string): void {
  localStorage.setItem(LAST_USED_KEY, id);
}
