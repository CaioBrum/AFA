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

    // Agrupar e formatar a origem de contato primeiro
    let origens = document.querySelectorAll('input[name="origem"]');
    origens.forEach(origem => {
        if (origem.checked) {
            dados.push("Origem de Contato: " + origem.parentElement.textContent.trim());
        }
    });

    // Coletar campos de input e textarea, exceto conclusão
    let inputs = document.querySelectorAll('input[type="text"], textarea:not([name="conclusao"]), select');
    
    inputs.forEach(input => {
        if (input.value) {  // Inclui apenas os campos que foram preenchidos.
            let label = input.name === "sinal_medido" ? "Sinal Medido" : input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/_/g, " ");
            dados.push(label + ": " + input.value);
        }
    });

    // Incluir configurações realizadas, separadas por vírgula
    let configuracoes = Array.from(document.querySelectorAll('input[name="configuracoes"]:checked'));
    if (configuracoes.length > 0) {
        let configText = configuracoes.map(config => config.parentElement.textContent.trim()).join(", ");
        dados.push("Configurações Realizadas: " + configText);
    }

    // Adicionar a conclusão por último
    let conclusao = document.querySelector('textarea[name="conclusao"]');
    if (conclusao.value) {
        dados.push("Conclusão: " + conclusao.value);
    }

    let textoParaCopiar = dados.join('\n');
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => alert('Informações copiadas com sucesso!'))
        .catch(err => alert('Erro ao copiar as informações: ' + err));
}



