const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const botaoReiniciar = document.getElementById('botaoReiniciar');
const pontuacaoElemento = document.getElementById('pontuacao');
const recordeElemento = document.getElementById('recorde');

let pontuacao = 0;
let recorde = localStorage.getItem('recorde') || 0; // Recupera o recorde salvo ou define 0
let velocidadeJogo = 2000; // Tempo inicial da animação do pipe

// Exibe o recorde atual
recordeElemento.textContent = `Recorde: ${recorde}`;

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 1500); // Duração do pulo aumentada para 1.5 segundos
    }
};

// Evento de toque para dispositivos móveis
document.addEventListener('touchstart', jump, { passive: true });




// Função para reiniciar o jogo
const reiniciarJogo = () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
};


const verificarColisao = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Ajustando a margem para permitir que o Mario chegue 3px mais próximo do pipe
    if (pipePosition <= 97 && pipePosition > 0 && marioPosition < 67) {
        clearInterval(loop); // Para o loop de colisão
        clearInterval(loopPontuacao); // Para o loop de pontuação

        // Para a animação do Pipe e do Mario
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Define a posição do Mario como estática e exibe a mensagem de reinício
        mario.style.bottom = `${marioPosition}px`; // Mantém a posição do Mario
        mario.style.pointerEvents = 'none'; // Impede que o Mario receba eventos

        // Exibe o botão de reinício
        botaoReiniciar.style.display = 'block';
        botaoReiniciar.textContent = 'Reiniciar Jogo'; // Mensagem de reinício
    }
};





// Função para iniciar o loop de colisão
const iniciarLoop = () => {
    return setInterval(verificarColisao, 10);
};

// Adiciona o evento de pulo
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
    }
});

// Detecta toques na tela para dispositivos móveis
document.addEventListener('touchstart', jump);

// Inicia o loop de colisão
const loop = iniciarLoop();

// Função para atualizar a pontuação
const atualizarPontuacao = () => {
    pontuacao++;
    pontuacaoElemento.textContent = `Pontuação: ${pontuacao}`;

    // Aumenta a velocidade do jogo conforme a pontuação
    if (pontuacao % 10 === 0 && velocidadeJogo > 800) {
        velocidadeJogo -= 100; // Reduz o tempo da animação do pipe
        pipe.style.animation = `pipe-animation ${velocidadeJogo / 1000}s infinite linear`;
    }
};

// Inicia o loop de pontuação, que aumenta a cada segundo
const loopPontuacao = setInterval(atualizarPontuacao, 1000);

// Adiciona o evento de clique ao botão de reinício
botaoReiniciar.addEventListener('click', reiniciarJogo);


