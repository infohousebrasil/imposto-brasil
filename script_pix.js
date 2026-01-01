function verificarRisco() {
    const valor = parseFloat(document.getElementById('movimentacao').value);
    const perfil = document.getElementById('perfil').value;
    const resDiv = document.getElementById('resultadoPix');
    const card = document.getElementById('cardRisco');
    const msg = document.getElementById('msgRisco');

    if (!valor || valor <= 0) {
        alert("Por favor, informe um valor de movimentação válido.");
        return;
    }

    // Mostra a div de resultado com animação
    resDiv.classList.remove('hidden');
    resDiv.classList.add('animate-fadeIn');

    // Lógica de Alerta 2026
    if (perfil === 'cpf' && valor > 2000) {
        msg.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> RISCO ALTO: Sua movimentação excede o limite de monitoramento automático do CPF pela e-Financeira.';
        card.className = "bg-red-50 text-red-700 border-red-500 rounded-xl p-6 text-center mb-6 border-2";
    } else if (perfil === 'mei' && valor > 6750) {
        msg.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> ALERTA DE DESENQUADRAMENTO: Volume mensal superior à média permitida para o regime MEI.';
        card.className = "bg-orange-50 text-orange-700 border-orange-500 rounded-xl p-6 text-center mb-6 border-2";
    } else {
        msg.innerHTML = '<i class="fas fa-check-circle mr-2"></i> MONITORAMENTO NORMAL: Suas movimentações estão dentro dos parâmetros de baixo risco atuais.';
        card.className = "bg-emerald-50 text-emerald-700 border-emerald-500 rounded-xl p-6 text-center mb-6 border-2";
    }

    // Scroll suave para o resultado
    window.scrollTo({
        top: resDiv.offsetTop - 50,
        behavior: 'smooth'
    });
}
