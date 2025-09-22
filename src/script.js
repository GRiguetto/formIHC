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
    // ... (código da função buscarEndereco permanece o mesmo)
}

function validarCpf() {
    // ... (código da função validarCpf permanece o mesmo)
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