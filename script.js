// SELETORES GLOBAIS 

const iframe = document.getElementsByTagName("iframe")[0];
const nome_filme = document.getElementsByClassName("nome_filme")[0];
const sinopse = document.getElementsByClassName("sinopse")[0];

// PARAMETROS DA URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// PARA MOSTRAR OS FILMES DE ACORDO COM PARAMETRO
if (id == 1) {
    iframe.src = "https://www.youtube.com/embed/7glpchicZqc?si=MjSfiLsrCPpR3AFy";
    nome_filme.innerHTML = "A Própria Carne";
    sinopse.innerHTML = "Três soldados desertores da Guerra do Paraguai encontram uma casa isolada na fronteira, habitada por um fazendeiro e uma jovem. O que parecia ser um refúgio se transforma em um pesadelo quando eles descobrem que o local esconde segredos."
} else if (id == 2) {
    iframe.src = "https://www.youtube.com/embed/AGACeWVdFqo?si=WxIz6liW0BFS02JE&amp;controls=0";
    nome_filme.innerHTML = "A noiva Cadaver";
    sinopse.innerHTML = "As famílias de Victor e Victoria estão arranjando seu casamento. Nervoso com a cerimônia, Victor vai sozinho à floresta para ensaiar seus votos. No entanto, o que ele pensava ser um tronco de árvore na verdade é o braço esquelético de Emily, uma noiva que foi assassinada depois de fugir com seu amor. Convencida que Victor acabara de lhe pedir a mão em casamento, Emily o leva para o mundo dos mortos, mas ele precisa retornar rapidamente antes que Victoria se case com o malvado Lorde Barkis."; 
} else if (id == 3 ) {
    iframe.src = "https://www.youtube.com/embed/dD264ZjfKlk?si=XH4biuY0L_bXF8U0&amp;controls=0";
    nome_filme.innerHTML = "It: A Coisa";
    sinopse.innerHTML = "Um grupo de crianças se une para investigar o misterioso desaparecimento de vários jovens em sua cidade. Eles descobrem que o culpado é Pennywise, um palhaço cruel que se alimenta de seus medos e cuja violência teve origem há vários séculos."; 
} else if (id == 4) {
    iframe.src = "https://www.youtube.com/embed/fZJUKixyeXM?si=hwyDpkW8djGX4G5U&amp;controls=0";
    nome_filme.innerHTML = "Cidade de Deus";
    sinopse.innerHTML = "Buscapé é um jovem pobre, negro e sensível, que cresce em um universo de muita violência. Ele vive na Cidade de Deus, favela carioca conhecida por ser um dos locais mais violentos do Rio. Amedrontado com a possibilidade de se tornar um bandido, é salvo de seu destino por causa de seu talento como fotógrafo, que permite que siga carreira na profissão. É por meio de seu olhar atrás da câmera que ele analisa o dia a dia da favela em que vive, onde a violência aparenta não ter fim."; 
} else if (id == 5) {
    iframe.src = "https://www.youtube.com/embed/mCbnq53iK3U?si=vmgFbWRQqjJrwSQq";
    nome_filme.innerHTML = "Minha Mãe é uma Peça";
    sinopse.innerHTML = "Dona Hermínia é uma senhora de meia-idade, divorciada do marido, que a trocou por uma mulher mais jovem. Hiperativa, ela não larga do pé de seus filhos, Marcelina e Juliano. Um dia, após descobrir que eles a consideram chata, ela resolve sair de casa sem avisar ninguém, deixando todos preocupados. Dona Hermínia decide visitar a querida tia Zélia para desabafar suas tristezas atuais e recordar os bons tempos do passado."; 
}

// FUNÇÕES 

function ativar(param) {
    window.location = `pagina_eventos.html?id=${param}`;
}

function iniciaAjax() {
    let objAjax = false;

    if (window.XMLHttpRequest) {
        objAjax = new XMLHttpRequest();
    }

    return objAjax;
}

function carregarTab() {
    let reqAjax = iniciaAjax();

    if (reqAjax) {
        reqAjax.onreadystatechange = function() {
            
            if (reqAjax.readyState == 4) {
                if (reqAjax.status == 200) {
                    let tabela = JSON.parse(reqAjax.responseText);
                    mostrarDados(tabela.sessoes);
                } else {
                    document.getElementById("corpo_tab").innerHTML = "<tr><td colspan='3'>Erro carregando os dados.</td></tr>"
                }
            }
        }

        reqAjax.open("GET", "tabela.json", true);
        reqAjax.send();
    }
}

function mostrarDados(sessoes) {
    let corpoTabela = document.getElementById("corpo_tab");
    corpoTabela.innerHTML = "";

    sessoes.forEach(function(sessao) {
        let linha = document.createElement("tr");

        let tdData = document.createElement("td");
        tdData.setAttribute("scope", "row");
        tdData.textContent = sessao.data;

        let tdLocal = document.createElement("td");
        tdLocal.textContent = sessao.local;

        let tdReserva = document.createElement("td");
        let linkReserva = document.createElement("a");
        linkReserva.href = sessao.link;
        linkReserva.className = "btn_reserva";
        linkReserva.textContent = "Reservar";
        tdReserva.appendChild(linkReserva);

        linha.appendChild(tdData);
        linha.appendChild(tdLocal);
        linha.appendChild(tdReserva);

        corpoTabela.appendChild(linha);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    carregarTab();
});