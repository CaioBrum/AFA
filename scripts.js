document.querySelector('form').addEventListener('submit', function(event) {
    var checkboxes = document.querySelectorAll('input[name="origem"]:checked');
    if (checkboxes.length === 0) {
        event.preventDefault(); // Impede o envio do formulário
        document.querySelector('input[name="origem"]').setCustomValidity('Selecione pelo menos uma origem de contato.');
        document.querySelector('input[name="origem"]').reportValidity();
    } else {
        document.querySelector('input[name="origem"]').setCustomValidity(''); // Limpa a validação customizada
    }
});

//Automacao dos Formularios
function copiarFormulario() {
    let dados = [];

    // Coleta e formata a origem de contato
    let origens = document.querySelectorAll('input[name="origem"]');
    origens.forEach(origem => {
        if (origem.checked) {
            dados.push("Origem de Contato: " + origem.parentElement.textContent.trim());
        }
    });

    // Coleta valores dos campos de texto, exceto o de conclusão, e seleciona os campos
    let inputs = document.querySelectorAll('input[type="text"], textarea:not([name="conclusao"]), select');
    
    inputs.forEach(input => {
        if (input.value || input.name === "sinal_medido") {  // Inclui o campo "sinal_medido" mesmo que vazio
            let label = input.name === "sinal_medido" ? "Sinal Medido" : input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/_/g, " ");
            let value = input.value;
            // Verifica se o checkbox "LOSS" está marcado e adiciona ao valor de "Sinal Medido"
            if (input.name === "sinal_medido") {
                let lossCheckbox = document.querySelector('input[name="loss"]');
                if (lossCheckbox && lossCheckbox.checked) {
                    value += " LOSS";
                }
            }
            dados.push(label + ": " + value);
        }
    });

    // Coleta e formata as configurações realizadas
    let configuracoes = Array.from(document.querySelectorAll('input[name="configuracoes"]:checked'));
    if (configuracoes.length > 0) {
        let configText = configuracoes.map(config => config.parentElement.textContent.trim()).join(", ");
        dados.push("Configurações Realizadas: " + configText);
    }

    // Coleta e adiciona a conclusão ao final
    let conclusao = document.querySelector('textarea[name="conclusao"]');
    if (conclusao.value) {
        dados.push("Conclusão: " + conclusao.value);
    }

    // Concatena todas as informações coletadas e copia para a área de transferência
    let textoParaCopiar = dados.join('\n');
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => alert('Informações copiadas com sucesso!'))
        .catch(err => alert('Erro ao copiar as informações: ' + err));
}





