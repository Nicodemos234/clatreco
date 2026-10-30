import { BackspaceIcon } from './Icons.jsx';

const LAYOUT = ['qwertyuiop', 'asdfghjkl⌫', 'zxcvbnm↵'];

export default function Keyboard({ keyStates, onKey, onBack, onEnter }) {
  return (
    <div className="kb">
      {LAYOUT.map((line) => (
        <div className="krow" key={line}>
          {[...line].map((ch) => {
            if (ch === '⌫')
              return (
                <button key={ch} className="key wide" onClick={onBack} aria-label="Apagar">
                  <BackspaceIcon />
                </button>
              );
            if (ch === '↵')
              return (
                <button key={ch} className="key wide" onClick={onEnter}>
                  Enter
                </button>
              );
            return (
              <button key={ch} className={'key ' + (keyStates[ch] || '')} onClick={() => onKey(ch)}>
                {ch}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
