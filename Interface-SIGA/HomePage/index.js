fetch("https://6b8e7676-8581-4b94-867e-7b0aa6be4019.mock.pstmn.io/professores").then (response=>{
return response.json()
}).then (corpo=>{

    const professoresContainer = document.getElementById('DadosProfessores');

   
   

    corpo.forEach(professor => {
        const div = document.createElement('div');
        div.classList.add('DadosProfessores');

        div.innerHTML = `
        <p class="id"> ${professor.matricula}</p>
        <p>${professor.nome}</p>
        <button> <a class="btn_exibir" href="../Exibir/Exibir.html?id=${professor.matricula}">Exibir</a></button>
        <button><a class="btn_alterar" href="../Alterar/Alterar.html">Alterar</a></button>
        <button><a class="btn_excluir" href="../Excluir/Excluir.html">Excluir</a></button>
        `;

        professoresContainer.appendChild(div);
    });
})
.catch(error => console.error('Erro ao carregar os dados dos professores:', error));

   //Primeiro professor
    // document.getElementById("identificador0").innerHTML=corpo[profNum].matricula
    // document.getElementById("nome0").innerHTML=corpo[profNum].nome