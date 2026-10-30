export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="card" role="dialog" aria-label={title}>
        <button className="close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
