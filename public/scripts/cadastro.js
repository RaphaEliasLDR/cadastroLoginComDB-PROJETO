let nome = document.querySelector ("#nome")
let labelNome = document.querySelector ("#labelNome")
let valideNome = false

let usuario = document.querySelector ("#usuario")
let labelUsuario = document.querySelector ("#labelUsuario")
let valideUsuario = false

let telefone = document.querySelector ("#telefone")
let labelEmail = document.querySelector ("#labelTelefone")
let valideTelefone = false

let endereco = document.querySelector ("#endereco")
let labelEndereco = document.querySelector ("#labelEndereco")
let valideEndereco = false

let senha = document.querySelector ("#senha")
let labelSenha = document.querySelector ("#labelSenha")
let valideSenha = false

let confirmarSenha = document.querySelector ("#confirmarSenha")
let labelConfirmarSenha = document.querySelector ("#labelConfirmarSenha")
let valideConfirmarSenha = false


let msgSucesso = document.querySelector ('#msgSucesso')



nome.addEventListener ('keyup', ()=>{
    if(nome.value.length <= 2){
        labelNome.setAttribute ('style', 'color: red')
        labelNome.innerHTML = 'Usuário *Nome muito pequeno*'
        nome.setAttribute ('style','border-color: red')
        valideNome = false
    } else {
        labelNome.setAttribute ('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute ('style','border-color: green')
        valideNome = true
    }
});


usuario.addEventListener ('keyup', ()=>{
    if(usuario.value.length <= 3){
        labelUsuario.setAttribute ('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário *Nome de usuário muito pequeno*'
        usuario.setAttribute ('style','border-color: red')
        valideUsuario = false
    } else {
        labelUsuario.setAttribute ('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute ('style','border-color: green')
        valideUsuario = true 
    }

});


telefone.addEventListener ('keyup', ()=>{
    if(telefone.value.length <= 8){
        labelTelefone.setAttribute ('style', 'color: red')
        labelTelefone.innerHTML = 'Telefone: *Número inválido*'
        telefone.setAttribute ('style','border-color: red')
        valideTelefone = false
    } else {
        labelTelefone.setAttribute ('style', 'color: green')
        labelTelefone.innerHTML = 'Telefone:'
        telefone.setAttribute ('style','border-color: green')
        valideTelefone = true
    }
});


endereco.addEventListener ('keyup', ()=>{
    if(endereco.value.length <= 5){
        labelEndereco.setAttribute ('style', 'color: red')
        endereco.setAttribute ('style','border-color: red')
        valideEndereco = false
    } else {
        labelEndereco.setAttribute ('style', 'color: green')
        labelEndereco.innerHTML = 'Endereço:'
        endereco.setAttribute ('style','border-color: green')
        valideEndereco = true
    }
});


senha.addEventListener ('keyup', ()=>{
    if(senha.value.length <= 5){
        labelSenha.setAttribute ('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Senha muito pequena*'
        senha.setAttribute ('style','border-color: red')
        valideSenha = false
    } else {
        labelSenha.setAttribute ('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute ('style','border-color: green')
        valideSenha = true
    }
});


confirmarSenha.addEventListener ('keyup', ()=>{
    if(senha.value != confirmarSenha.value){
        labelConfirmarSenha.setAttribute ('style', 'color: red')
        labelConfirmarSenha.innerHTML = '*As senhas são diferentes *'
        confirmarSenha.setAttribute ('style','border-color: red')
        valideConfirmarSenha = false
    } else {
        labelConfirmarSenha.setAttribute ('style', 'color: green')
        labelConfirmarSenha.innerHTML = 'Confirmar Senha'
        confirmarSenha.setAttribute ('style','border-color: green')
        valideConfirmarSenha = true
    }
});


function cadastrar(event) {
    event.preventDefault();

    console.log("valideNome:", valideNome);
    console.log("valideUsuario:", valideUsuario);
    console.log("valideSenha:", valideSenha);
    console.log("valideConfirmarSenha:", valideConfirmarSenha);
    console.log("valideEndereco:", valideEndereco);
    console.log("valideTelefone:", valideTelefone);
    
    if (!valideNome || !valideUsuario || !valideSenha || !valideConfirmarSenha || !valideEndereco || !valideTelefone) {
        
    alert("Por favor, preencha todos os campos corretamente.");
    return;
    }
    
    const data = {
        nome: nome.value,
        usuario: usuario.value,
        telefone: telefone.value,
        endereco: endereco.value,
        senha: senha.value
    };

    fetch ('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data =>{
        console.log("Dados enviados para o servidor:", data);
        if (data.message === "Cadastrado com sucesso"){
        msgSucesso.setAttribute ('style', 'display: block');
        msgSucesso.innerHTML = 'Cadastro Realizado';

        console.log ("Cadastro realizado com sucesso");
        
        return;
        }else {
            console.error("Erro ao realizar cadastro:", data.error);
            alert ('*error* Campos vazios')
            msgSucesso.setAttribute ('style', 'display: none')
        }
    })
    .catch(error => {
        console.error("Erro no cadastro:", error);
        alert ("Erro ao realizar cadastro");
    });   
}

