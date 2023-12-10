//JORNADA TECH:Programe sua própria Inteligência Artificial - EBAC
//AULA 4 (Parte 1): CRIANDO O SCRIPT DE TREINAMENTO DA I.A.
//INSTRUTOR: JHONATAN EDUARDO
//PROGRAMADORA: JULIANA MEDEIROS SILVA

//Programando os controles da I.A.
export default 
{
    //PULAR
    jump: new KeyboardEvent('Keydown', {key: 'Space', keyCode: 32}),

    //AGACHAR
    dispatch(event)
    {
        document.dispatchEvent(this[event]);
    }
}