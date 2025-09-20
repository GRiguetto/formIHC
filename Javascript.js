// Função assíncrona que será chamada quando o campo CEP perder o foco
async function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (cep.length !== 8) {
    alert("CEP INVÁLIDO");
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // <- barra no final
    if (!resposta.ok) {
      alert("ERRO AO CONSULTAR");
      return;
    }

    const endereco = await resposta.json();
    if (endereco.erro) {
      alert("CEP não encontrado");
      return;
    }

    // Preenche cada input corretamente
    document.getElementById("endereco").value = endereco.logradouro || "";
    document.getElementById("bairro").value   = endereco.bairro     || "";
    document.getElementById("cidade").value   = endereco.localidade || "";
    document.getElementById("estado").value   = endereco.uf         || ""; // <- uf, não estado

    
  } catch (erro) {
    console.error(erro);
    alert("ERRO AO BUSCAR");
  }
}
