//JORNADA TECH:Programe sua própria Inteligência Artificial - EBAC
//AULA 4 (Parte 1): CRIANDO O SCRIPT DE TREINAMENTO DA I.A.
//AULA 4 (Parte 2): ENTENDENDO AS ETAPAS
//INSTRUTOR: JHONATAN EDUARDO
//PROGRAMADORA: JULIANA MEDEIROS SILVA

//Importando as funções da RNA
import utils from './utils.js'
import RNA from './RNA.js'
import controls from './controls.js'

const SAMPLES = 2 //Número de dinossauros por geração
const game = Runner.instance_; //Permitindo que o jogo seja sempre instanciado

//Criando uma lista para os dinossauros
let dinoList = []

let dinoIndex = 0 //atribui um número para cada dinossauro na lista


//Criando um sitema de pontuação para encontrar o dinossauro que atingir a melhor pontuação
//O dinossauro que atingir a melhor pontuação 
let bestScore = 0;

let bestRNA = null; 

//Criando uma função para gerar um dinossauro que possua a melhor RNA da geração anterior
function fillDinoList ()
{
    for(let i = 0; i < SAMPLES; i++)
    {
        //Treinando o dinossauro
       dinoList[i] = new RNA(3, [10, 10, 2]) //Criando uma lista de dinosssauros com 3 camadas de neurônios
                                             //Atribuindo os pesos ao dinossauro

       dinoList[i].load(bestRNA) //Uma vez que os 20 dinossauros da geração acabarem, o melhor dinossauro passa a ser o melhor RNA e o jogo se inicia novamente

       if (i > 0) dinoList[i].mutate(0.5) //Utilizando o if e o mutate para permitir que nenhum novo dinossauro seja igual a um outro de uma geração passada

    }

    console.log('Lista de dinossauros criada.') //Informa ao usuário que uma nova lista foi criada
}

//Programando o dinossauro para pular sempre que se deparar com um cacto
setTimeout(() => {
    fillDinoList()
    controls.dispatch('jump')

}, 1000 /*delay de 1 segundo*/ )

//Verificando se o jogo esta ativado
setInterval(() => {
    if(!game.activated) return;

    const dino = dinoList[dinoIndex];
    
    //Verificando se o dinossauro colidiu com um objeto
    if(game.crashed)
    {
        //Verificando se o dinossauro da roda atual foi melhor que o dinossauro que obteve a maior pontuação
        if(dino.score > bestScore)
        {
            bestScore = dino.score;
            bestRNA = dino.save();
            console.log('Melhor pontuação:', bestScore);
        }
        dinoIndex++;
    

        if(dinoIndex === SAMPLES) 
        {
            fillDinoList();
            dinoIndex = 0;
            bestScore = 0;
        }
        game.restart() //Reinicia o jogo assim que uma nova RNA é gerada
    }  
    
    const {tRex, horizon, currentSpeed, distanceRan, dimensions} = game
    dino.score = distanceRan - 2000

    const player = {
        x: tRex.xPos, //Posição em x do dinossauro
        y: tRex.yPos, //Posição em y do dinossauro
        speed: currentSpeed
    };

    //Variavel que recebe a posição de todos os obstaculos do jogo
    const [obstacle] = horizon.obstacles
    .map((obstacle) => {

        return{
            x: obstacle.xPos,
            y: obstacle.yPos
        }
    })
    .filter((obstacle) => obstacle.x > player.x)
     
    //Calculando o tempo exato que o dinossauro deve executar o pulo
    if (obstacle)
    {
       const distance = 1 - (utils.getDistance(player, obstacle) / dimensions.WIDTH);
       const speed = player.speed / 6
       const height = Math.tanh(105 - obstacle.y)

       const [jump, crouch] = dino.compute([
        distance,
        speed,
        height
       ]);

       if (jump === crouch) return;

       if(jump) controls.dispacht('jump'); 

       if (crouch) controls.dispatch('crouch');

    };
}, 100);

//Criando um botão para ativar a I.A.
/*
const s = document.createElement('script');
s.type = 'module';
s.src = 'http://localhost:5500/script.js'
document.body.appendChild(s);
*/
