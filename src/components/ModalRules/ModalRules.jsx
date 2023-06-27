import "./ModalRules.css";

export const ModalRules = ({ accept, onAccept }) => {
  return (
    <div className="modalRulesContainer">
      <div>
        <div className="modalText-content">
          <h1>Como Jogar?</h1>

          <div className="RulesContainer">
            <ol>
              <li>
                1️⃣ Começamos com 9 cartas: <span>3️x🗿 (pedra)</span>, <span>3x📜(papel)</span> e <span>3x✂️(tesoura)</span>. Essas cartas serão
                distribuídas aleatoriamente, dando a cada jogador 3 cartas.
              </li>
              <li>2️⃣ Na mesa, teremos 3 cartas, cujo conteúdo será desconhecido para ambos os jogadores.</li>
              <li>
                3️⃣ Cada jogador
                deve escolher uma de suas cartas e colocá-la virada para baixo
                na mesa.
              </li>
              <li>
                4️⃣ Quando ambos estiverem prontos, é hora de revelar as cartas
                ao mesmo tempo!
              </li>
              <li>
                4️⃣ Se a sua carta for <span>🗿(pedra)</span> e a do oponente for <span>✂️(tesoura)</span>, você ganha! 🎉
                Se as cartas forem iguais, é um empate. 🤝
              </li>
              <li>
                6️⃣ Cada vitória lhe rende um ponto. Mas se você perder ou
                empatar, não ganhará pontos. 🙅‍♂️
              </li>
              <li>
                🔮 A diversão do jogo está em tentar prever as cartas do seu
                oponente com base nas cartas repetidas que você tem ou nas
                cartas já jogadas!
              </li>
            </ol>
            <p>Divirta-se jogando e que venham muitas vitórias! 🥳🎉</p>
          </div>
        </div>
        <span>
          <p onClick={onAccept}>{accept}</p>
        </span>
      </div>
    </div>
  );
};
