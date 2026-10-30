import { GearIcon, HelpIcon, MoonIcon, StatsIcon, SunIcon } from './Icons.jsx';

export default function Header({ dark, onHelp, onToggleTheme, onStats, onSettings }) {
  return (
    <header>
      <div className="hgroup">
        <button className="icon" onClick={onHelp} aria-label="Como jogar">
          <HelpIcon />
        </button>
        <button className="icon" onClick={onToggleTheme} aria-label="Alternar modo escuro">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      <h1 className="logo" aria-label="Clatreco">
        {'CLATRECO'.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </h1>
      <div className="hgroup r">
        <button className="icon" onClick={onStats} aria-label="Estatísticas">
          <StatsIcon />
        </button>
        <button className="icon" onClick={onSettings} aria-label="Configurações">
          <GearIcon />
        </button>
      </div>
    </header>
  );
}
