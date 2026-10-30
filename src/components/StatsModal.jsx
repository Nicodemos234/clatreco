import { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
import { ShareIcon } from './Icons.jsx';

function untilMidnight() {
  const n = new Date();
  const m = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1);
  const s = Math.max(0, Math.floor((m - n) / 1000));
  const p = (x) => String(x).padStart(2, '0');
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function Countdown() {
  const [t, setT] = useState(untilMidnight);
  useEffect(() => {
    const id = setInterval(() => setT(untilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="timer">{t}</div>;
}

export default function StatsModal({ stats, game, answer, onShare, onClose }) {
  const pct = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;
  const max = Math.max(1, ...stats.dist);
  const hl = game.status === 'won' ? game.guesses.length - 1 : -1;
  const done = game.status !== 'playing';

  return (
    <Modal title="Estatísticas" onClose={onClose}>
      {done && (
        <div>
          <p className="small" style={{ textAlign: 'center', marginBottom: 8 }}>
            {game.status === 'won' ? 'Você acertou a palavra do dia' : 'Não foi dessa vez. A palavra era'}
          </p>
          <div className="answer">
            {[...answer].map((c, i) => (
              <div key={i} className="tile right">
                {c}
              </div>
            ))}
          </div>
        </div>
      )}
      <h2>Estatísticas</h2>
      <div className="stats">
        {[
          [stats.played, 'jogos'],
          [pct + '%', 'de vitórias'],
          [stats.streak, 'sequência atual'],
          [stats.best, 'melhor sequência'],
        ].map(([v, l]) => (
          <div key={l}>
            <b>{v}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: 16 }}>Distribuição de tentativas</h2>
      <div className="dist">
        {stats.dist.map((n, i) => (
          <div className="bar" key={i}>
            <span>{i + 1}</span>
            <i className={i === hl ? 'hl' : ''} style={{ width: `${Math.max(8, (n / max) * 100)}%` }}>
              {n}
            </i>
          </div>
        ))}
      </div>
      {done && (
        <div className="endrow">
          <div>
            <div className="small">Próxima palavra em</div>
            <Countdown />
          </div>
          <button className="btn" onClick={onShare}>
            <ShareIcon />
            Compartilhar
          </button>
        </div>
      )}
    </Modal>
  );
}
