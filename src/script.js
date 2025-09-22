// Função para anunciar mensagens para leitores de tela
function anunciarParaLeitorDeTela(mensagem) {
    const statusAria = document.getElementById('status-aria');
    if (statusAria) {
        statusAria.textContent = mensagem;
    }
}

// Função genérica para validar campos vazios e dar feedback de sucesso
function validarCampoVazio(inputEl) {
    const erroEl = document.getElementById(inputEl.id + '-erro');
    
    if (inputEl.value.trim() === '') {
        erroEl.textContent = 'Este campo é obrigatório.';
        inputEl.setAttribute('aria-invalid', 'true');
        inputEl.classList.remove('valido');
        return false;
    } else {
        erroEl.textContent = '';
        inputEl.setAttribute('aria-invalid', 'false');
        inputEl.classList.add('valido');
        return true;
    }
}

// Função de validação completa do CPF
function validarCpf(cpfInput) {
    const cpfErro = document.getElementById('cpf-erro');
    const cpf = cpfInput.value.replace(/[^\d]+/g, '');

    // Limpa erros anteriores antes de validar
    cpfErro.textContent = '';
    cpfInput.setAttribute('aria-invalid', 'false');
    cpfInput.classList.remove('valido');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        cpfErro.textContent = "CPF inválido.";
        cpfInput.setAttribute('aria-invalid', 'true');
        return false;
    }

    let soma = 0;
    let resto;

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
    cpfInput.setAttribute('aria-invalid', 'false');
    cpfInput.classList.add('valido');
    return true;
}

// Função assíncrona que será chamada quando o campo CEP perder o foco
async function buscarEndereco() {
    const cepInput = document.getElementById('cep');
    const cepErro = document.getElementById('cep-erro');
    const cep = cepInput.value.replace(/\D/g, '');

    cepErro.textContent = '';
    cepInput.setAttribute('aria-invalid', 'false');
    cepInput.classList.remove('valido');

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

        document.getElementById("endereco").value = endereco.logradouro || "";
        document.getElementById("bairro").value = endereco.bairro || "";
        document.getElementById("cidade").value = endereco.localidade || "";
        document.getElementById("estado").value = endereco.uf || "";

        cepInput.classList.add('valido');
        anunciarParaLeitorDeTela("Endereço preenchido automaticamente.");
        document.getElementById('numero').focus(); // Move o foco para o próximo campo

    } catch (erro) {
        console.error(erro);
        cepErro.textContent = "Erro na busca pelo CEP. Tente novamente.";
        cepInput.setAttribute('aria-invalid', 'true');
    }
}

// Gerenciamento de eventos do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-formulario');
    const camposObrigatorios = form.querySelectorAll('[required]');
    const campoCpf = document.getElementById('cpf');

    // Aplica as máscaras de input
    IMask(document.getElementById('celular'), { mask: '(00) 00000-0000' });
    IMask(campoCpf, { mask: '000.000.000-00' });
    IMask(document.getElementById('cep'), { mask: '00000-000' }); // LINHA CORRIGIDA
    IMask(document.getElementById('validade-cartao'), { mask: '00/00' });
    IMask(document.getElementById('cvv-cartao'), { mask: '000[0]' });

    // Adiciona o evento de validação 'blur' para cada campo obrigatório
    camposObrigatorios.forEach(campo => {
        if (campo.id !== 'cep') { // CEP já tem onblur no HTML
            campo.addEventListener('blur', () => {
                validarCampoVazio(campo);
            });
        }
    });
    
    // Adiciona a validação específica do CPF no blur
    campoCpf.addEventListener('blur', () => {
        validarCpf(campoCpf);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isFormValid = true;

        // Valida todos os campos obrigatórios primeiro
        camposObrigatorios.forEach(campo => {
            if (!validarCampoVazio(campo)) {
                isFormValid = false;
            }
        });
        
        // Executa a validação matemática do CPF
        if (!validarCpf(campoCpf)) {
            isFormValid = false;
        }

        if (isFormValid) {
            console.log('Formulário enviado com sucesso!');
            anunciarParaLeitorDeTela("Formulário enviado com sucesso!");
            // form.submit(); // Descomente esta linha para permitir o envio real
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