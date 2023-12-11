//JORNADA TECH:Programe sua própria Inteligência Artificial - EBAC
//AULA 2: CRIANDO UMA RNA(REDE NEURAL ARTIFICIAL)
//AULA 3: CRIANDO SCRIPTS RNA
//INSTRUTOR: JHONATAN EDUARDO
//PROGRAMADORA: JULIANA MEDEIROS SILVA

//Criando uma função que gera um número aleatório entre um valor minimo e um máximo
//Função número aleatório
function randomRange(min, max) 
{
    return Math.random() * (max - min) + min;
}

//Interpolação linear
function lerp(a, b, t)
{
    return a + (b - a) * t;
}

//CLASSE NEURÔNIO
//Função: gerar um número aleatório entre -1 e 1 e adicionar a lista(ao Array)
class Neuron 
{
   constructor(inputs)
   {
    //inicializando um neUrôrio com um viés/bias
    //Bias = número que ajudara a I.A. a entender novas funções

    this.bias = randomRange(-1, 1);
 
    this.weightList = new Array(inputs)
    .fill()
    .map(() => randomRange(-1,1))
   }
}

// Função que calcula a saída do neurônio (ativação)
  g(signalList = []) {
    let u = 0;

    // Calcula a soma ponderada dos sinais de entrada multiplicados pelos pesos
    for (let i = 0; i < this.weightList.length; i++) {
      u += signalList[i] * this.weightList[i];
    }

    //Verificando se o neurônio esta ativado ou não com base na função tangente
    //Se o sinal não for maior que o bias o neorônio não é ativado
    if (Math.tanh(u) > this.bias) return 1; // Ativado
    else return 0; // Não ativado
  }

//Mutação dos pesos
mutate(rate = 0.2)
{
   this.weightList = this.weightList.map(() => {
    return lerp(w, randomRange(-1, 1), rate)
   });

   this.bias = lerp(this.bias, randomRange(-1, 1), range);
}

//CLASSE RNA
class RNA
{
   constructor(inputCount = 1, levelList = [])
   {
        //Inicializando a pontuação da RNA com 0
        //A pontuação terá como objetivo saber qual foi a melhor RNA/geração e qual foi o melhor Neurônio desta geração

        this.score = 0;

        //CAMADAS DOS NEURÔNIOS
        this.levelList = levelList.map((l, i) => {

            const inputSize = i ===0 ? inputCount : levelList[i - 1]

            return new Array(l).fill().map(() => new Neuron(inputSize));
        } );
   }

    //Criando uma função para calcular a saída da RNA com base na entradas
    compute(list = [])
    {
       for (let i = 0; i < this.levelList.length; i++)
       {
            const tempList = []

            //criação de um neurônio
            for (const neuron of this.levelList[i])
            {
            if(list.length !== neuron.weightList.length) throw new Error("Entrada inválida");

            tempList.push(neuron.g(list))
            } 
            list = tempList;       
       }
       return list;

    }
}

mutate(rate = 1);
{
    for(const level of this.levelList)
    {
        for(const neuron of level) neuron.mutate(rate)
    }
}

load(rna);
{
    if (!rna) return;
    try
    {
       this.levelList = rna.map((neuronList) => {
        return neuronList.map((neuron) => {
            const n = new Neuron();
            n.bias = neuron.bias
            n.weightList = neuron.weightList; //atribui a importãncia das diferentes entradas

            return n;
        });
       });
    }catch (e) //tratamento de erro
    {
        return;
    }

    save()
    {
        return this.levelList;
    }
}

export default RNA;
