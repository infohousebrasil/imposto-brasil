/**
 * Lógica do Monitor PIX 2026
 * Autor: Imposto Brasil
 */

function verificarRisco() {
    const valorInput = document.getElementById('movimentacao');
    const valor = parseFloat(valorInput.value);
    const perfil = document.getElementById('perfil').value;
    const resDiv = document.getElementById('resultadoPix');
    const card = document.getElementById('cardRisco');
    const msg = document.getElementById('msgRisco');

    if (!valor || valor <= 0) {
        alert("Por favor, informe um valor de movimentação para análise.");
        valorInput.focus();
        return;
    }

    // Exibe a área de resultados
    resDiv.classList.remove('hidden');

    // Lógica de Alerta baseada nas diretrizes de 2026
    if (perfil === 'cpf' && valor > 2000) {
        msg.innerHTML = "🚨 ALERTA CRÍTICO: Movimentações acima de R$ 2.000 em CPF acionam o cruzamento automático da e-Financeira em 2026.";
        card.className = "bg-red-50 text-red-700 border-red-500 rounded-2xl p-6 text-center border-2 mb-4 animate-fadeIn";
    } else if (perfil === 'mei' && valor > 6750) {
        msg.innerHTML = "⚠️ RISCO DE DESENQUADRAMENTO: Seu volume médio mensal ultrapassa o limite proporcional do MEI, gerando risco de multa.";
        card.className = "bg-orange-50 text-orange-700 border-orange-500 rounded-2xl p-6 text-center border-2 mb-4 animate-fadeIn";
    } else {
        msg.innerHTML = "✅ STATUS MONITORADO: Sua movimentação está dentro dos parâmetros de baixo risco para o perfil selecionado.";
        card.className = "bg-emerald-50 text-emerald-700 border-emerald-500 rounded-2xl p-6 text-center border-2 mb-4 animate-fadeIn";
    }

    // Scroll suave até o resultado
    window.scrollTo({
        top: resDiv.offsetTop - 50,
        behavior: 'smooth'
    });
}

function compartilharResultadoPix() {
    const valor = document.getElementById('movimentacao').value;
    const perfilRaw = document.getElementById('perfil').value;
    const perfil = perfilRaw === 'cpf' ? "CPF (Pessoa Física)" : "Conta Jurídica/Autônomo";
    
    // URL amigável (pega o link atual do site automaticamente)
    const urlSite = window.location.href;

    const texto = encodeURIComponent(
        "🚨 *ALERTA FISCAL 2026*\n\n" +
        "Cara, acabei de fazer o teste de risco do meu PIX e o resultado foi preocupante.\n\n" +
        "📊 *Meu Perfil:* " + perfil + "\n" +
        "💰 *Movimentação:* R$ " + valor + "/mês\n\n" +
        "Cuidado com a malha fina da e-Financeira. Faz o seu teste aqui:\n" +
        "👉 " + urlSite
    );
    
    window.open("https://api.whatsapp.com/send?text=" + texto, "_blank");
}
