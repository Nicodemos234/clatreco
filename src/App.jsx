import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import Keyboard from './components/Keyboard.jsx';
import HelpModal from './components/HelpModal.jsx';
import StatsModal from './components/StatsModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import { MAX_TRIES, REVEAL_TOTAL, VALID, answerFor, dayIndex, norm, score } from './lib/game.js';
import { storage } from './lib/storage.js';

const DAY = dayIndex();
const ANSWER = answerFor(DAY);
const TARGET = norm(ANSWER);
const NUM = DAY + 1;
const EMPTY = ['', '', '', '', ''];
const WIN_MSGS = ['Genial!', 'Magnífico!', 'Impressionante!', 'Muito bem!', 'Boa!', 'Ufa!'];
const DEFAULT_STATS = { played: 0, wins: 0, streak: 0, best: 0, dist: [0, 0, 0, 0, 0, 0], last: null };

function loadGame() {
  const g = storage.get('game', null);
  return g && g.day === DAY ? g : { day: DAY, guesses: [], status: 'playing' };
}

function systemDark() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const [game, setGame] = useState(loadGame);
  const [stats, setStats] = useState(() => storage.get('stats', DEFAULT_STATS));
  const [current, setCurrent] = useState(EMPTY);
  const [pos, setPos] = useState(0);
  const [revealRow, setRevealRow] = useState(null);
  const [jumpRow, setJumpRow] = useState(null);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(() => {
    if (!storage.get('seenHelp', false)) return 'help';
    return loadGame().status !== 'playing' ? 'stats' : null;
  });
  const [theme, setTheme] = useState(() => storage.get('theme', 'auto'));
  const [sysDark, setSysDark] = useState(systemDark);

  const busy = revealRow !== null;
  const playing = game.status === 'playing';
  const toastTimer = useRef();

  // ---- tema ----
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') delete root.dataset.theme;
    else root.dataset.theme = theme;
    storage.set('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const fn = () => setSysDark(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const dark = theme === 'auto' ? sysDark : theme === 'dark';

  useEffect(() => {
    storage.set('seenHelp', true);
  }, []);

  // recarrega à meia-noite para pegar a palavra nova
  useEffect(() => {
    const id = setInterval(() => {
      if (dayIndex() !== DAY) location.reload();
    }, 30000);
    return () => clearInterval(id);
  }, []);

  // ---- helpers ----
  const showToast = useCallback((msg, ms = 1600) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), ms);
  }, []);

  const doShake = useCallback(() => {
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    setTimeout(() => setShake(false), 450);
  }, []);

  // ---- ações ----
  const typeLetter = (ch) => {
    if (!playing || busy) return;
    const next = [...current];
    next[pos] = ch;
    setCurrent(next);
    let n = pos + 1;
    while (n < 5 && next[n]) n++;
    setPos(n < 5 ? n : Math.min(pos + 1, 4));
  };

  const backspace = () => {
    if (!playing || busy) return;
    const next = [...current];
    if (next[pos]) {
      next[pos] = '';
      setCurrent(next);
    } else if (pos > 0) {
      next[pos - 1] = '';
      setCurrent(next);
      setPos(pos - 1);
    }
  };

  const move = (d) => {
    if (!playing || busy) return;
    setPos((p) => Math.max(0, Math.min(4, p + d)));
  };

  const finish = (status, row) => {
    if (stats.last !== DAY) {
      const s = { ...stats, dist: [...stats.dist] };
      s.played++;
      if (status === 'won') {
        s.wins++;
        s.dist[row]++;
        s.streak = (stats.last === DAY - 1 ? stats.streak : 0) + 1;
        s.best = Math.max(s.best, s.streak);
      } else {
        s.streak = 0;
      }
      s.last = DAY;
      setStats(s);
      storage.set('stats', s);
    }
    if (status === 'won') {
      showToast(WIN_MSGS[row]);
      setJumpRow(row);
    } else {
      showToast('A palavra era ' + ANSWER.toUpperCase(), 2200);
    }
    setTimeout(() => setModal('stats'), 1500);
  };

  const submit = () => {
    if (!playing || busy) return;
    if (current.some((c) => !c)) {
      doShake();
      showToast('Só palavras com 5 letras');
      return;
    }
    const w = current.join('');
    if (!VALID.has(w)) {
      doShake();
      showToast('Essa palavra não é aceita');
      return;
    }
    const row = game.guesses.length;
    const guesses = [...game.guesses, VALID.get(w)];
    const status = w === TARGET ? 'won' : guesses.length === MAX_TRIES ? 'lost' : 'playing';
    const next = { ...game, guesses, status };

    setGame(next);
    storage.set('game', next);
    setCurrent(EMPTY);
    setPos(0);
    setRevealRow(row);
    setTimeout(() => {
      setRevealRow(null);
      if (status !== 'playing') finish(status, row);
    }, REVEAL_TOTAL);
  };

  // ---- teclado físico ----
  const handlers = useRef();
  handlers.current = { typeLetter, backspace, submit, move, modal };
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const h = handlers.current;
      if (h.modal) {
        if (e.key === 'Escape') setModal(null);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        h.submit();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        h.backspace();
      } else if (e.key === 'ArrowLeft') h.move(-1);
      else if (e.key === 'ArrowRight') h.move(1);
      else {
        const k = norm(e.key);
        if (/^[a-z]$/.test(k)) h.typeLetter(k);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ---- cores do teclado (só depois que a linha terminou de virar) ----
  const keyStates = useMemo(() => {
    const rank = { wrong: 1, place: 2, right: 3 };
    const ks = {};
    game.guesses.forEach((g, r) => {
      if (r === revealRow) return;
      const s = score(norm(g), TARGET);
      [...norm(g)].forEach((ch, i) => {
        if (!ks[ch] || rank[s[i]] > rank[ks[ch]]) ks[ch] = s[i];
      });
    });
    return ks;
  }, [game.guesses, revealRow]);

  // ---- compartilhar ----
  const share = async () => {
    const em = { right: '🟩', place: '🟨', wrong: '⬛' };
    const lines = game.guesses.map((g) => score(norm(g), TARGET).map((s) => em[s]).join(''));
    const text = `Clatreco #${NUM} ${game.status === 'won' ? game.guesses.length : 'X'}/6\n\n${lines.join('\n')}\n\n${location.origin}`;
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast('Resultado copiado');
    } catch {
      showToast('Não deu para copiar');
    }
  };

  const today = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <>
      <div className="app">
        <Header
          dark={dark}
          onHelp={() => setModal('help')}
          onToggleTheme={() => setTheme(dark ? 'light' : 'dark')}
          onStats={() => setModal('stats')}
          onSettings={() => setModal('settings')}
        />
        <div className="dayline">
          Palavra #{NUM} · {today}
        </div>
        <Board
          guesses={game.guesses}
          target={TARGET}
          current={current}
          pos={pos}
          playing={playing && !busy}
          revealRow={revealRow}
          jumpRow={jumpRow}
          shake={shake}
          onSelect={(c) => !busy && setPos(c)}
        />
        <Keyboard keyStates={keyStates} onKey={typeLetter} onBack={backspace} onEnter={submit} />
      </div>

      {toast && <div className="toast">{toast}</div>}

      {modal === 'help' && <HelpModal onClose={() => setModal(null)} />}
      {modal === 'settings' && <SettingsModal theme={theme} onTheme={setTheme} onClose={() => setModal(null)} />}
      {modal === 'stats' && (
        <StatsModal stats={stats} game={game} answer={ANSWER} onShare={share} onClose={() => setModal(null)} />
      )}
    </>
  );
}
