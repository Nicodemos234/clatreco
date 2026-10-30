import Modal from './Modal.jsx';

const OPTIONS = [
  ['light', 'Claro'],
  ['dark', 'Escuro'],
  ['auto', 'Auto'],
];

export default function SettingsModal({ theme, onTheme, onClose }) {
  return (
    <Modal title="Configurações" onClose={onClose}>
      <h2>Configurações</h2>
      <div>
        <div className="setting">
          <div>
            <b>Tema</b>
            <div className="small">Escolha claro, escuro ou o do sistema</div>
          </div>
          <div className="seg">
            {OPTIONS.map(([value, label]) => (
              <button key={value} aria-pressed={theme === value} onClick={() => onTheme(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
