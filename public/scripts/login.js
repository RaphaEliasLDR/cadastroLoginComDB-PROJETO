let usuario = document.querySelector("#usuario");
let labelUsuario = document.querySelector("#labelUsuario");
valideUsuario = false
    
let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");
valideSenha = false
    
let msgError = document.querySelector ("#msgError");


function entrar(){
if (usuario.value === "" || senha.value === ""){
    msgError.setAttribute ('style', 'display: block')
    msgError.innerHTML = "Error: Campos vázios"
    } else {
        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario.value,
                senha: senha.value
            })
        })
        .then (response => { 
            if (!response.ok){
                throw new Error('Erro ao realizar o login' + response.statusText);
            }
            return response.json();
        })
        .then (data => {
            if (data && data.message === "Login realizado") {
                window.location.href = "https://www.google.com.br/";
            } else {
               msgError.setAttribute('style','display: block')
               msgError.innerHTML = "Error: Informações inválidas" 
            }
        })

    }
}