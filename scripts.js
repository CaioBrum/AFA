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
function copiarFormulario() {
    let dados = [];

    let origens = document.querySelectorAll('input[name="origem"]');
    origens.forEach(origem => {
        if (origem.checked) {
            dados.push("Origem de Contato: " + origem.parentElement.textContent.trim());
        }
    });

    let inputs = document.querySelectorAll('input[type="text"], textarea:not([name="conclusao"]), select');
    
    inputs.forEach(input => {
        if (input.value) {  
            let label = input.name === "sinal_medido" ? "Sinal Medido" : input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/_/g, " ");
            dados.push(label + ": " + input.value);
        }
    });

    // Incluir o estado de LOSS se estiver marcado
    let lossCheckbox = document.querySelector('input[name="loss"]');
    if (lossCheckbox && lossCheckbox.checked) {
        dados.push("LOSS: Sim");
    }

    let configuracoes = Array.from(document.querySelectorAll('input[name="configuracoes"]:checked'));
    if (configuracoes.length > 0) {
        let configText = configuracoes.map(config => config.parentElement.textContent.trim()).join(", ");
        dados.push("Configurações Realizadas: " + configText);
    }

    let conclusao = document.querySelector('textarea[name="conclusao"]');
    if (conclusao.value) {
        dados.push("Conclusão: " + conclusao.value);
    }

    let textoParaCopiar = dados.join('\n');
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => alert('Informações copiadas com sucesso!'))
        .catch(err => alert('Erro ao copiar as informações: ' + err));
}




