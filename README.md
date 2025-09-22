# Formulário de Checkout Acessível - Projeto de IHC

## 1. Visão Geral do Projeto

Este projeto foi desenvolvido como parte da disciplina de **Interação Humano-Computador (IHC)**. A proposta inicial era criar uma interface de livre escolha, aplicando de forma prática os conceitos de usabilidade e as **10 Heurísticas de Nielsen para o Design de Interfaces**.

Nossa equipe optou por desenvolver um **formulário de checkout**, uma interface presente em praticamente todos os sites de vendas e serviços online. A escolha foi motivada pela complexidade e pela importância crítica que um formulário bem projetado tem na experiência do usuário. Vimos nele uma excelente oportunidade para explorar e implementar um grande número de melhorias, com um foco especial na **acessibilidade do usuário**.

O objetivo, portanto, foi transformar um formulário comum em uma experiência inclusiva, intuitiva e eficiente, demonstrando como os princípios de IHC podem ser aplicados para garantir que todos os usuários, independentemente de suas habilidades, possam completar a tarefa com sucesso.

---

## 2. Tecnologias Utilizadas

A interface foi construída utilizando tecnologias web fundamentais, sem a necessidade de frameworks complexos, para focar nos conceitos de IHC.

* **HTML5:** Utilizado para estruturar o conteúdo de forma semântica, o que é a base para a acessibilidade. Foram empregados elementos como `<fieldset>`, `<legend>` e atributos ARIA (`aria-invalid`, `aria-live`, `aria-describedby`) para enriquecer a experiência de usuários de leitores de tela.
* **CSS3:** Responsável por toda a estilização e pelo design responsivo da aplicação, garantindo uma boa experiência tanto em desktops quanto em dispositivos móveis. O design é minimalista e focado na clareza das informações.
* **JavaScript (Vanilla):** Utilizado para adicionar toda a interatividade, validação de dados em tempo real e a lógica de acessibilidade da interface.
* **IMask.js:** Uma biblioteca leve de JavaScript foi utilizada para aplicar máscaras de formatação nos campos, um recurso crucial para a prevenção de erros.
* **ViaCEP API:** A API pública ViaCEP foi consumida para implementar a funcionalidade de preenchimento automático do endereço a partir do CEP.

---

## 3. Solução Proposta e Aplicação dos Conceitos

Para atender aos requisitos do projeto, diversas funcionalidades foram implementadas, cada uma delas justificada por uma ou mais Heurísticas de Nielsen e princípios de IHC.

### 3.1. Visibilidade do Status do Sistema e Feedback ao Usuário
*(Heurística 1: Visibilidade do status do sistema)*

O usuário é constantemente informado sobre o que está acontecendo através de feedback visual e auditivo (para tecnologias assistivas).

* **Validação em Tempo Real:** Os campos mudam de cor para indicar sucesso (borda verde com ícone) ou erro (borda vermelha), informando o usuário sobre a validade dos dados inseridos instantaneamente.
* **Mensagens de Erro Claras:** Em caso de erro, mensagens específicas e em linguagem simples aparecem diretamente abaixo do campo problemático (ex: "CPF inválido", "Este campo é obrigatório").
* **Anúncios para Leitores de Tela:** Uma "ARIA Live Region" foi implementada para anunciar eventos importantes, como o preenchimento automático do endereço após a consulta do CEP, garantindo que usuários com deficiência visual não percam informações contextuais.

### 3.2. Prevenção de Erros
*(Heurística 5: Prevenção de erros)*

A interface foi projetada para minimizar a chance de o usuário cometer erros, em vez de apenas reportá-los.

* **Máscaras de Input:** Campos como CPF, CEP, Celular e Data de Validade do cartão são formatados automaticamente durante a digitação. Isso guia o usuário e previne erros de formatação, que são uma fonte comum de frustração.
* **Busca Automática por CEP:** Ao preencher o CEP, o sistema busca e preenche automaticamente os campos de endereço, eliminando a possibilidade de erros de digitação no nome da rua, cidade ou estado.

### 3.3. Consistência, Padronização e Minimalismo
*(Heurística 4: Consistência e padronização | Heurística 8: Estética e design minimalista)*

A interface segue padrões de design conhecidos e mantém uma estética limpa para não sobrecarregar o usuário.

* **Design Consistente:** Todos os elementos do formulário (labels, inputs, botões) seguem um padrão visual único. A hierarquia da informação é clara, com títulos bem definidos e um bom uso de espaço em branco.
* **Fluxo Lógico:** O formulário é dividido em seções lógicas (Contato > Endereço > Pagamento), seguindo a ordem natural que um usuário esperaria em um processo de checkout.

### 3.4. Controle, Eficiência e Flexibilidade
*(Heurística 3: Controle e liberdade para o usuário | Heurística 7: Flexibilidade e eficiência de uso)*

A interface foi otimizada para diferentes tipos de usuários, desde iniciantes até os mais experientes.

* **Autopreenchimento do Navegador:** O uso correto de atributos `autocomplete` nos campos permite que usuários recorrentes preencham o formulário com um único clique.
* **Gerenciamento de Foco:** Após a busca do CEP, o foco é movido automaticamente para o campo "Número". Se o formulário for submetido com erros, o foco é levado ao primeiro campo inválido, agilizando o processo de correção.

### 3.5. Acessibilidade
*(Aplicando os princípios da WCAG - Web Content Accessibility Guidelines)*

A acessibilidade foi um pilar central do projeto, garantindo que a interface seja utilizável por todos.

* **Navegação por Teclado:** A estrutura do HTML é lógica e permite a navegação completa usando apenas a tecla `Tab`.
* **Link "Pular para o Conteúdo":** Um "skip link" foi adicionado para permitir que usuários de teclado pulem diretamente para o início do formulário, melhorando a eficiência da navegação.
* **Contraste de Cores:** As cores escolhidas para texto, fundo e elementos interativos possuem um bom contraste, facilitando a leitura para pessoas com baixa visão.
* **HTML Semântico e ARIA:** A estrutura semântica e o uso de atributos ARIA garantem que leitores de tela possam interpretar e narrar a interface de forma clara e lógica.

---

## 4. Como Executar o Projeto

Para visualizar a interface, basta clonar este repositório e abrir o arquivo `index.html` em qualquer navegador web moderno.

```bash
# Clone o repositório (exemplo)
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# Navegue até a pasta do projeto
cd seu-repositorio

# Abra o arquivo index.html no navegador
```
