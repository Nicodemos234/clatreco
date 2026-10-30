import { MAX_TRIES, REVEAL_STEP, norm, score } from '../lib/game.js';

/**
 * Tabuleiro 6x5.
 * - linhas já jogadas mostram as cores
 * - a linha ativa mostra o que está sendo digitado e o cursor
 * - revealRow: linha que está virando agora (animação)
 * - jumpRow: linha vencedora (animação de pulo)
 */
export default function Board({ guesses, target, current, pos, playing, revealRow, jumpRow, shake, onSelect }) {
  const active = guesses.length;

  return (
    <main className="board">
      <div className="grid" aria-live="polite">
        {Array.from({ length: MAX_TRIES }, (_, r) => {
          const guess = guesses[r];
          const isActive = r === active && playing;
          const isFuture = r > active || (r === active && !playing);
          const states = guess ? score(norm(guess), target) : null;

          let cls = 'row';
          if (isActive) cls += ' active';
          else if (isFuture) cls += ' future';
          if (isActive && shake) cls += ' shake';

          return (
            <div className={cls} key={r}>
              {Array.from({ length: 5 }, (_, c) => {
                let tcls = 'tile';
                let letter = '';
                let style;
                if (guess) {
                  letter = guess[c];
                  tcls += ' ' + states[c];
                  if (r === revealRow) {
                    tcls += ' reveal';
                    style = { '--d': `${c * REVEAL_STEP}ms` };
                  } else if (r === jumpRow) {
                    tcls += ' jump';
                    style = { '--d': `${c * 90}ms` };
                  }
                } else if (isActive) {
                  letter = current[c];
                  if (letter) tcls += ' filled';
                  if (c === pos) tcls += ' cur';
                }
                return (
                  <div
                    key={c}
                    className={tcls}
                    style={style}
                    onClick={isActive ? () => onSelect(c) : undefined}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
