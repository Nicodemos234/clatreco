import Modal from './Modal.jsx';

function Example({ word, idx, state }) {
  return (
    <div className="ex">
      {[...word].map((c, i) => (
        <div key={i} className={'tile' + (i === idx ? ' ' + state : '')}>
          {c}
        </div>
      ))}
    </div>
  );
}

export default function HelpModal({ onClose }) {
  return (
    <Modal title="Como jogar" onClose={onClose}>
      <h2>Como jogar</h2>
      <p>
        Descubra a palavra do dia em 6 tentativas. Cada tentativa precisa ser uma palavra válida de 5 letras. Os
        acentos e o ç são preenchidos sozinhos.
      </p>
      <p>Toque numa casa para editar aquela posição. Depois de cada tentativa, as cores mostram o quão perto você chegou.</p>
      <Example word="PEDRA" idx={0} state="right" />
      <p className="small">
        O <b>P</b> está na palavra e na posição certa.
      </p>
      <Example word="CLARO" idx={1} state="place" />
      <p className="small">
        O <b>L</b> está na palavra, mas em outra posição.
      </p>
      <Example word="TIGRE" idx={3} state="wrong" />
      <p className="small">
        O <b>R</b> não está na palavra.
      </p>
      <p className="small">Uma palavra nova aparece todo dia à meia-noite.</p>
    </Modal>
  );
}
