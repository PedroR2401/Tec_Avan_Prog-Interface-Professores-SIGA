fetch("https://6b8e7676-8581-4b94-867e-7b0aa6be4019.mock.pstmn.io/professor/:matricula").then(response=> {
return response.json();}).then
(mostrar=>{

    console.log(mostrar[1]);
})

