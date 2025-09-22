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

function validarCpf()
{
    cpf = document.getElementById('cpf').value.replace(/[^\d]+/g,'')
    if(cpf.length !== 11)
        {
           new bootstrap.Modal(document.getElementById('cpfInvalidoModal')).show()
            return
        }
 
        //calculo do primeiro digito
        let soma= 0

        //multiplica cada digito por um peso descrescente
        for(let i = 1; i <=9; i++)
        {
            soma += parseInt(cpf.substring(i-1,i))*(11-i)
        }
        //Calcula o resto da divisao por 11
        let resto = (soma*10)%11
        if(resto === 10 || resto === 11 ) resto = 0

        //verifica se o resto é diferente do primeiro digito
        if(resto !== parseInt(cpf.substring(9,10)))
            {
                alert("Digite um CPF valido!")
                return false
            }
        
            //calculo do segundo digito por um peso descrescente
            soma = 0 
            for(let i = 1; i <= 10; i++)
                {
                    soma += parseInt(cpf.substring(i-1,i)*(12- i))
                }
            resto = (soma*10) % 11
            if (resto === 10 || resto === 11) resto = 0

            if(resto !== parseInt(cpf.substring(10,11)))
                {
                    alert ("Digite um cpf valido")
                    return false
                }
}
