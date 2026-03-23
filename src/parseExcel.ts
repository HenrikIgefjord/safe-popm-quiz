import { read, utils } from 'xlsx';
import type { Question } from './questions';

// ── Error type ─────────────────────────────────────────────────────────────────
export class ParseError extends Error {
  constructor(
    message: string,
    public readonly rowNumber?: number,
  ) {
    super(message);
    this.name = 'ParseError';
  }
}

// ── Column name normaliser ─────────────────────────────────────────────────────
function norm(s: unknown): string {
  return String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

const CORRECT_MAP: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };

// ── Parser ─────────────────────────────────────────────────────────────────────
/**
 * Parse an ArrayBuffer containing a .xlsx file into a Question[].
 * Throws ParseError for any validation failure.
 */
export function parseExcel(buffer: ArrayBuffer, startId = 1): Question[] {
  // 1. Read workbook
  let workbook;
  try {
    workbook = read(buffer, { type: 'array' });
  } catch {
    throw new ParseError('Not a valid .xlsx file. Please upload a proper Excel workbook.');
  }

  // 2. First sheet
  if (workbook.SheetNames.length === 0) {
    throw new ParseError('The workbook contains no sheets.');
  }
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // 3. Convert to 2-D array (raw)
  const rows = utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: '',
    blankrows: false,
  }) as unknown[][];

  if (rows.length < 2) {
    throw new ParseError('The sheet must contain a header row and at least one data row.');
  }

  // 4. Build column-index map from header row
  const headerRow = rows[0] as unknown[];
  const colMap: Record<string, number> = {};
  headerRow.forEach((cell, i) => {
    colMap[norm(cell)] = i;
  });

  // 5. Validate required columns
  const required: [string, string][] = [
    ['question',   'Question'],
    ['option a',   'Option A'],
    ['option b',   'Option B'],
    ['option c',   'Option C'],
    ['option d',   'Option D'],
    ['correct',    'Correct'],
    ['explanation','Explanation'],
  ];
  for (const [key, display] of required) {
    if (!(key in colMap)) {
      throw new ParseError(`Missing required column: "${display}". Check the column headers in your file.`);
    }
  }

  const col = (row: unknown[], key: string): string =>
    String(row[colMap[key]] ?? '').trim();

  // 6. Parse data rows
  const questions: Question[] = [];
  for (let ri = 1; ri < rows.length; ri++) {
    const row      = rows[ri] as unknown[];
    const rowNum   = ri + 1; // 1-based for user messages

    // Skip completely blank rows
    const allBlank = row.every(cell => String(cell ?? '').trim() === '');
    if (allBlank) continue;

    // Question text
    const questionText = col(row, 'question');
    if (!questionText) throw new ParseError(`Row ${rowNum}: Question text is empty.`, rowNum);

    // Options
    const optLabels: [string, string][] = [['option a','Option A'],['option b','Option B'],['option c','Option C'],['option d','Option D']];
    const options: string[] = [];
    for (const [key, display] of optLabels) {
      const val = col(row, key);
      if (!val) throw new ParseError(`Row ${rowNum}: "${display}" is empty.`, rowNum);
      options.push(val);
    }

    // Correct
    const correctRaw = col(row, 'correct').toLowerCase();
    if (!(correctRaw in CORRECT_MAP)) {
      throw new ParseError(
        `Row ${rowNum}: "Correct" must be A, B, C, or D — got "${col(row, 'correct') || '(empty)'}"`,
        rowNum,
      );
    }
    const correctIndex = CORRECT_MAP[correctRaw];

    // Explanation (allowed to be empty)
    const explanation = col(row, 'explanation');

    // Category (optional column)
    const category = 'category' in colMap ? col(row, 'category') : '';

    questions.push({
      id: startId + questions.length,
      question: questionText,
      options,
      correctIndex,
      explanation,
      category,
    });
  }

  if (questions.length === 0) {
    throw new ParseError('No questions found in the file. Make sure data rows exist below the header.');
  }

  return questions;
}
