function verificarRisco() {
    const valor = parseFloat(document.getElementById('movimentacao').value);
    const perfil = document.getElementById('perfil').value;
    const resDiv = document.getElementById('resultadoPix');
    const card = document.getElementById('cardRisco');
    const msg = document.getElementById('msgRisco');

    if (!valor) {
        alert("Introduza um valor de movimentação.");
        return;
    }

    resDiv.classList.remove('hidden');

    // Regras de Alerta 2026 (Simplificadas para conversão)
    if (perfil === 'cpf' && valor > 2000) {
        msg.innerText = "🚨 ALERTA CRÍTICO: Movimentações superiores a R$ 2.000 em CPF são enviadas automaticamente ao Fisco via e-Financeira.";
        card.className = "bg-red-100 text-red-900 border-2 border-red-500 rounded-xl p-6 text-center mb-6";
    } else if (perfil === 'mei' && valor > 6750) {
        msg.innerText = "⚠️ RISCO DE DESENQUADRAMENTO: O seu volume mensal excede a média permitida para o MEI.";
        card.className = "bg-orange-100 text-orange-900 border-2 border-orange-500 rounded-xl p-6 text-center mb-6";
    } else {
        msg.innerText = "✅ DENTRO DO RADAR: Movimentação considerada comum para o perfil selecionado. Mantenha os seus comprovantes.";
        card.className = "bg-green-100 text-green-900 border-2 border-green-500 rounded-xl p-6 text-center mb-6";
    }

    window.scrollTo({ top: resDiv.offsetTop - 20, behavior: 'smooth' });
}
