
var parametrosURL = new URLSearchParams(window.location.search);
var matricula = parametrosURL.get('matricula');

// Converter a matrícula para um número inteiro
var profID = parseInt(matricula);

fetch("https://6b8e7676-8581-4b94-867e-7b0aa6be4019.mock.pstmn.io/professores").then(response=> {
return response.json();}).then(mostrar=> {

    // Mostrar nome do professor
    const nomeProf = document.getElementById('nomeProf');

        nomeProf.innerHTML = `
        <p>${mostrar[profID-1].nome} </p>
        `;

// Mostrar matricula

const matriculaProf = document.getElementById('matriculaProf');

        matriculaProf.innerHTML = `
        <p>${mostrar[profID-1].matricula} </p>
        `;

        // Mostrar data de nascimento professor

        const nascProf = document.getElementById('nascProf');

        nascProf.innerHTML = `
        <p>${mostrar[profID-1].data_de_nascimento} </p>
        `;



        console.log(mostrar[profID-1].nome)
    });
   

