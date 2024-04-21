fetch("https://6b8e7676-8581-4b94-867e-7b0aa6be4019.mock.pstmn.io/professores").then (response=>{
return response.json()
}).then (corpo=>{

     var profNum = 0;

    //Primeiro professor
    document.getElementById("identificador0").innerHTML=corpo[profNum].matricula
    document.getElementById("nome0").innerHTML=corpo[profNum].nome

profNum = profNum+1;

    //Segundo professor
    document.getElementById("identificador1").innerHTML=corpo[profNum].matricula
    document.getElementById("nome1").innerHTML=corpo[profNum].nome
   
    profNum = profNum+1;
    //Terceiro professor

    document.getElementById("identificador2").innerHTML=corpo[profNum].matricula
    document.getElementById("nome2").innerHTML=corpo[profNum].nome

    profNum = profNum+1;

})