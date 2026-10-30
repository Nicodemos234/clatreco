import WORDS from './words.json';

/** Remove acentos e ç: "razão" -> "razao" */
export const norm = (w) =>
  w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ç/g, 'c').toLowerCase();

/** Palavras aceitas: forma sem acento -> grafia com acento */
export const VALID = new Map();
for (const w of WORDS.valid.split(' ')) {
  const k = norm(w);
  if (!VALID.has(k) || w === k) VALID.set(k, w);
}
for (const w of WORDS.ans) VALID.set(norm(w), w);

// Ordem fixa e embaralhada das respostas (mesma para todo mundo)
function mulberry(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const order = WORDS.ans.map((_, i) => i);
{
  const r = mulberry(20261027);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
}

/** Índice do dia (0 = 1º de janeiro de 2026), no fuso local */
export function dayIndex(date = new Date()) {
  return Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(2026, 0, 1)) / 864e5
  );
}

export function answerFor(day) {
  const n = order.length;
  return WORDS.ans[order[((day % n) + n) % n]];
}

/** Compara a tentativa (sem acento) com o alvo (sem acento) */
export function score(guess, target) {
  const res = Array(5).fill('wrong');
  const left = {};
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) res[i] = 'right';
    else left[target[i]] = (left[target[i]] || 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    if (res[i] !== 'right' && left[guess[i]] > 0) {
      res[i] = 'place';
      left[guess[i]]--;
    }
  }
  return res;
}

export const MAX_TRIES = 6;
export const REVEAL_STEP = 260; // ms entre cada casa virando
export const REVEAL_TOTAL = 5 * REVEAL_STEP + 300;
