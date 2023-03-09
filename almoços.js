var buttonNovoAlmoço=document.getElementById('buttonNovoAlmoço');
var buttonCancelar=document.getElementById('buttonCancelar');
var novoalmoço = document.getElementById('novoalmoço');
var formNovoAlmoço = document.getElementById('formNovoAlmoço');
var inputNomedoalunoeturma = document.getElementById('Nome do aluno e turma');
var inputdataAlmoço = document.getElementById('dataAlmoço');
var divmensagemerro = document.getElementById('mensagemerro');
var tabelaalmoços = document.getElementById('tabelaalmoços');

var listaalmoços = [];

function apagaralmoço (almoço){
    var posicao = almoço.target.getAttribute('data-almoço')
    listaalmoços.splice(posicao, 1);
    atualizartabelaalmoços();
}

function atualizartabelaalmoços() {
    console.log('Chamado atualizar tabela almoços!');
    if(listaalmoços.length === 0) {
        tabelaalmoços.innerHTML = '<tr><td colspan="3">Nenhum Almoço</td></tr>';
        return;
    } 
    tabelaalmoços.innerHTML = '';
        for (var i = 0; i < listaalmoços.length; i++) {
            var almoço = listaalmoços[i];
            var linha = document.createElement('tr'); 
            var celulanome = document.createElement('td');
            var celuladata = document.createElement('td');
            var celulaacoes = document.createElement('td');
            var botaoapagar = document.createElement('button');
            botaoapagar.setAttribute('data-almoço', i);
            botaoapagar.classList.add('btn');
            botaoapagar.classList.add('btn-danger');
            botaoapagar.classList.add('btn-sm');
            botaoapagar.addEventListener('click', apagaralmoço);
            celulanome.innerText = almoço.nome;
            celuladata.innerText = almoço.data;
            botaoapagar.innerText = "Apagar almoço";
            celulaacoes.appendChild(botaoapagar);
            linha.appendChild(celulanome);
            linha.appendChild(celuladata);
            linha.appendChild(celulaacoes);
            tabelaalmoços.appendChild(linha);
        }
}

function limparnovoalmoço() {
    inputNomedoalunoeturma.value = '';
    inputdataAlmoço.value = '';
    inputNomedoalunoeturma.classList.remove('is-invalid');
    inputdataAlmoço.classList.remove('is-invalid');
    divmensagemerro.classList.add('d-none');
    divmensagemerro.innerHTML = '';
}

function MostrarNovoAlmoço(almoço) {
    console.log(almoço);
    novoalmoço.classList.remove('d-none');
}


function ocultarnovoalmoço() {
    novoalmoço.classList.add('d-none');
    limparnovoalmoço();
}

function novoalmoçovalido(Nomedoalunoeturma, dataAlmoço) { 
    var validacaook = true;
    var erro = '';
    if (Nomedoalunoeturma.trim().length === 0) {
        erro = 'É obrigatório escrever o seu nome!';
        inputNomedoalunoeturma.classList.add('is-invalid');
        validacaook = false;
    } else {
        inputNomedoalunoeturma.classList.remove('is-invalid');
    }
    var timestampAlmoço = Date.parse(dataAlmoço); 
    var timestampAtual = (new Date()).getTime();
    if (isNaN(timestampAlmoço) || timestampAlmoço < timestampAtual) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data do almoço é obrigatória e deve estar no futuro!';
        inputdataAlmoço.classList.add('is-invalid');
        validacaook = false;
    } else {
        inputdataAlmoço.classList.remove('is-invalid');
    }

    if (!validacaook) {
        divmensagemerro.innerHTML = erro;
        divmensagemerro.classList.remove('d-none');
    } else {
        divmensagemerro.classList.add('d-none');
    }

    return validacaook;
}

function salvarNovoAlmoço(almoço) {
    almoço.preventDefault();
    var Nomedoalunoeturma = inputNomedoalunoeturma.value;
    var dataAlmoço = inputdataAlmoço.value;
    
    if (novoalmoçovalido(Nomedoalunoeturma, dataAlmoço)) {
        console.log('O almoço foi registado!'); 
        listaalmoços.push({
            nome: Nomedoalunoeturma,
            data: new Date (dataAlmoço),
        });
        atualizartabelaalmoços();
}   else {
        console.log('O almoço não foi registado!');
}
}

buttonNovoAlmoço.addEventListener('click', MostrarNovoAlmoço);
buttonCancelar.addEventListener('click', ocultarnovoalmoço);
formNovoAlmoço.addEventListener('submit', salvarNovoAlmoço);
window.addEventListener('load', atualizartabelaalmoços);