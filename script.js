/**
 * CALCULADORA DE IMPACTO FISCAL 2025
 * Desenvolvido para máxima conversão
 */

let meuGrafico = null;

function calcularReal() {
    try {
        const salarioInput = document.getElementById('salario');
        const salario = parseFloat(salarioInput.value);
        
        if (!salario || salario <= 0) {
            alert("Por favor, informe um salário válido.");
            return;
        }

        // 1. INSS 2025 (Tabela Progressiva)
        let inss = 0;
        if (salario <= 1518) inss = salario * 0.075;
        else if (salario <= 2793.88) inss = (salario * 0.09) - 22.77;
        else if (salario <= 4190.83) inss = (salario * 0.12) - 106.59;
        else if (salario <= 8157.41) inss = (salario * 0.14) - 190.40;
        else inss = 951.63; // Teto

        // 2. IRPF 2025 (Base de cálculo)
        const baseIR = salario - inss;
        let irpf = 0;
        if (baseIR > 2259.20) {
            if (baseIR <= 2826.65) irpf = (baseIR * 0.075) - 169.44;
            else if (baseIR <= 3751.05) irpf = (baseIR * 0.15) - 381.44;
            else if (baseIR <= 4664.68) irpf = (baseIR * 0.225) - 662.77;
            else irpf = (baseIR * 0.275) - 896.00;
        }

        // 3. Imposto Oculto (35% sobre o que sobra para consumo)
        const liquidoImediato = salario - inss - irpf;
        const impostoConsumo = liquidoImediato * 0.35;

        const totalImpostoMes = inss + irpf + impostoConsumo;
        const salarioRealFinal = salario - totalImpostoMes;
        
        // Exibição dos dados
        document.getElementById('resAno').innerText = `R$ ${(totalImpostoMes * 13.3).toLocaleString('pt-br', {maximumFractionDigits:0})}`;
        document.getElementById('resDias').innerText = `${((totalImpostoMes/salario)*30).toFixed(0)} dias/mês`;
        document.getElementById('resLiquido').innerText = `R$ ${salarioRealFinal.toLocaleString('pt-br', {maximumFractionDigits:2})}`;

        // Mostrar div de resultado
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.classList.remove('hidden');

        // Renderizar Gráfico e Reordenar
        renderizarGrafico(salarioRealFinal, inss, irpf, impostoConsumo);
        reordenarLinksETexts(salario);
        
        // Scroll até o resultado
        window.scrollTo({ top: resultadoDiv.offsetTop - 20, behavior: 'smooth' });

    } catch (err) {
        console.error("Erro no processamento:", err);
    }
}

function renderizarGrafico(bolso, inss, irpf, consumo) {
    const ctx = document.getElementById('graficoImposto').getContext('2d');
    
    if (meuGrafico) meuGrafico.destroy();

    // Verificação de segurança para a biblioteca Chart.js
    if (typeof Chart !== 'undefined') {
        meuGrafico = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Seu Bolso', 'INSS', 'IRPF', 'Consumo'],
                datasets: [{
                    data: [bolso, inss, irpf, consumo],
                    backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

function reordenarLinksETexts(salario) {
    const container = document.getElementById('containerLinks');
    const alta = document.getElementById('cardAltaRenda');
    const seg = document.getElementById('cardSeguranca');
    const baixa = document.getElementById('cardBaixaRenda');
    const chamada = document.getElementById('chamadaVenda');

    if (!container) return;

    // Reset de estilos de destaque
    [alta, seg, baixa].forEach(el => el.classList.remove('link-destaque'));

    if (salario <= 3000) {
        chamada.innerText = "Saindo da sobrevivência:";
        container.append(baixa, seg, alta);
        baixa.classList.add('link-destaque');
    } 
    else if (salario <= 7500) {
        chamada.innerText = "Proteja sua classe média:";
        container.append(seg, alta, baixa);
        seg.classList.add('link-destaque');
    } 
    else {
        chamada.innerText = "Estratégias de Blindagem:";
        container.append(alta, seg, baixa);
        alta.classList.add('link-destaque');
    }
}
function compartilharImpostoDeRenda() {
    // Captura os valores da sua lógica de cálculo
    const ganhoBruto = document.getElementById('ganhoMensal').value;
    const valorImposto = document.getElementById('valorImpostoCalculado').innerText;
    const diasTrabalhadosParaOGoverno = document.getElementById('diasGoverno').innerText; // Ex: "12 dias"

    const urlSite = window.location.href;

    const texto = encodeURIComponent(
        "💸 *TRABALHANDO PRO GOVERNO?*\n\n" +
        "Fiz o cálculo aqui e descobri que dos meus R$ " + ganhoBruto + " mensais, o governo leva *R$ " + valorImposto + "*.\n\n" +
        "Basicamente, eu trabalho *" + diasTrabalhadosParaOGoverno + "* todo mês só pra pagar imposto. 🤡\n\n" +
        "Veja quanto do seu suor está ficando com o leão:\n" +
        "👉 " + urlSite
    );
    
    window.open("https://api.whatsapp.com/send?text=" + texto, "_blank");
}
