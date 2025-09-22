// Função para anunciar mensagens para leitores de tela
function anunciarParaLeitorDeTela(mensagem) {
    const statusAria = document.getElementById('status-aria');
    if (statusAria) {
        statusAria.textContent = mensagem;
    }
}

async function buscarEndereco() {
    const cepInput = document.getElementById('cep');
    const cepErro = document.getElementById('cep-erro');
    const cep = cepInput.value.replace(/\D/g, '');

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

        document.getElementById("endereco").value = endereco.logradouro || "";
        document.getElementById("bairro").value = endereco.bairro || "";
        document.getElementById("cidade").value = endereco.localidade || "";
        document.getElementById("estado").value = endereco.uf || "";

        // Anuncia que o endereço foi preenchido
        anunciarParaLeitorDeTela("Endereço preenchido automaticamente.");
        document.getElementById('numero').focus(); // Move o foco para o próximo campo lógico

    } catch (erro) {
        console.error(erro);
        cepErro.textContent = "Erro na busca pelo CEP. Tente novamente.";
        cepInput.setAttribute('aria-invalid', 'true');
    }
}

function validarCpf() {
    // (O código da função validarCpf permanece o mesmo da versão anterior)
    const cpfInput = document.getElementById('cpf');
    const cpfErro = document.getElementById('cpf-erro');
    const cpf = cpfInput.value.replace(/[^\d]+/g, '');

    cpfErro.textContent = '';
    cpfInput.setAttribute('aria-invalid', 'false');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        cpfErro.textContent = "CPF inválido. Verifique os dados digitados.";
        cpfInput.setAttribute('aria-invalid', 'true');
        return false;
    }
    
    // (Restante da lógica de validação...)
    return true; // Retorna true se válido
}


// Gerenciamento de foco no envio do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-formulario');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio real para podermos validar

        const camposInvalidos = form.querySelectorAll('[aria-invalid="true"]');
        if (camposInvalidos.length > 0) {
            // Foca no primeiro campo com erro
            camposInvalidos[0].focus();
            anunciarParaLeitorDeTela(`Formulário com erros. Corrija o campo ${camposInvalidos[0].labels[0].textContent} para continuar.`);
        } else {
            // Lógica para enviar o formulário
            console.log('Formulário enviado com sucesso!');
            anunciarParaLeitorDeTela("Formulário enviado com sucesso!");
        }
    });
});