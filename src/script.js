// Função assíncrona que será chamada quando o campo CEP perder o foco
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