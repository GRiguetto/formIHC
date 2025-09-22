// Função para anunciar mensagens para leitores de tela
function anunciarParaLeitorDeTela(mensagem) {
    const statusAria = document.getElementById('status-aria');
    if (statusAria) {
        statusAria.textContent = mensagem;
    }
}

// Função genérica para validar campos vazios
function validarCampoVazio(inputEl) {
    const erroEl = document.getElementById(inputEl.id + '-erro');
    let isValid = true;

    if (inputEl.value.trim() === '') {
        erroEl.textContent = 'Este campo é obrigatório.';
        inputEl.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        erroEl.textContent = '';
        inputEl.setAttribute('aria-invalid', 'false');
    }
    return isValid;
}


async function buscarEndereco() {
    const cepInput = document.getElementById('cep');
    const cepErro = document.getElementById('cep-erro');
    const cep = cepInput.value.replace(/\D/g, '');

    // Limpa erros anteriores
    cepErro.textContent = '';
    cepInput.setAttribute('aria-invalid', 'false');

    if (cep.length !== 8) {
        cepErro.textContent = "CEP inválido. Deve conter 8 dígitos.";
        cepInput.setAttribute('aria-invalid', 'true');
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!resposta.ok) {
            cepErro.textContent = "Erro ao consultar o serviço de CEP.";
            cepInput.setAttribute('aria-invalid', 'true');
            return;
        }

        const endereco = await resposta.json();
        if (endereco.erro) {
            cepErro.textContent = "CEP não encontrado.";
            cepInput.setAttribute('aria-invalid', 'true');
            return;
        }

        // Preenche cada input corretamente
        document.getElementById("endereco").value = endereco.logradouro || "";
        document.getElementById("bairro").value = endereco.bairro || "";
        document.getElementById("cidade").value = endereco.localidade || "";
        document.getElementById("estado").value = endereco.uf || "";

    } catch (erro) {
        console.error(erro);
        cepErro.textContent = "Erro na busca pelo CEP. Tente novamente.";
        cepInput.setAttribute('aria-invalid', 'true');
    }
}

function validarCpf() {
    const cpfInput = document.getElementById('cpf');
    const cpfErro = document.getElementById('cpf-erro');
    const cpf = cpfInput.value.replace(/[^\d]+/g, '');

    // Limpa erros anteriores
    cpfErro.textContent = '';
    cpfInput.setAttribute('aria-invalid', 'false');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) { // Verifica se tem 11 dígitos e se não são todos iguais
        cpfErro.textContent = "CPF inválido. Verifique os dados digitados.";
        cpfInput.setAttribute('aria-invalid', 'true');
        return false;
    }

    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;

    // Cálculo do primeiro dígito
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        cpfErro.textContent = "CPF inválido.";
        cpfInput.setAttribute('aria-invalid', 'true');
        return false;
    }

    // Cálculo do segundo dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        cpfErro.textContent = "CPF inválido.";
        cpfInput.setAttribute('aria-invalid', 'true');
        return false;
    }

    // Se passou por tudo, o CPF é válido
    return true;
}


// Gerenciamento de eventos do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-formulario');
    const camposObrigatorios = form.querySelectorAll('[required]');

    // Adiciona o evento de validação 'blur' para cada campo obrigatório
    camposObrigatorios.forEach(campo => {
        // Não adiciona no CPF e CEP para não conflitar com as funções existentes
        if (campo.id !== 'cpf' && campo.id !== 'cep') {
            campo.addEventListener('blur', () => {
                validarCampoVazio(campo);
            });
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio para podermos validar

        let isFormValid = true;

        // Valida todos os campos obrigatórios
        camposObrigatorios.forEach(campo => {
            if (!validarCampoVazio(campo)) {
                isFormValid = false;
            }
        });

        // Valida campos com regras específicas
        if (!validarCpf()) {
            isFormValid = false;
        }

        if (isFormValid) {
            console.log('Formulário enviado com sucesso!');
            anunciarParaLeitorDeTela("Formulário enviado com sucesso!");
            // Aqui você adicionaria a lógica para realmente enviar os dados
        } else {
            const primeiroCampoInvalido = form.querySelector('[aria-invalid="true"]');
            if (primeiroCampoInvalido) {
                primeiroCampoInvalido.focus();
                const label = document.querySelector(`label[for="${primeiroCampoInvalido.id}"]`);
                const nomeCampo = label ? label.textContent : 'o primeiro campo com erro';
                anunciarParaLeitorDeTela(`Corrija ${nomeCampo} para continuar.`);
            }
        }
    });
});