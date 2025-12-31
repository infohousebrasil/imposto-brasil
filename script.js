let meuGrafico = null;

function calcularReal() {
    const salario = parseFloat(document.getElementById('salario').value);
    
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
    else inss = 951.63; // Teto do INSS

    // 2. IRPF (Base = Bruto - INSS)
    const baseIR = salario - inss;
    let irpf = 0;
    if (baseIR <= 2259.20) irpf = 0;
    else if (baseIR <= 2826.65) irpf = (baseIR * 0.075) - 169.44;
    else if (baseIR <= 3751.05) irpf = (baseIR * 0.15) - 381.44;
    else if (baseIR <= 4664.68) irpf = (baseIR * 0.225) - 662.77;
    else irpf = (baseIR * 0.275) - 896.00;

    // 3. Imposto sobre Consumo (Oculto)
    // No Brasil, a carga sobre consumo média é de 35% do que resta do salário
    const liquidoDisponivel = salario - inss - irpf;
    const impostoConsumo = liquidoDisponivel * 0.35;

    const totalImpostoMes = inss + irpf + impostoConsumo;
    const salarioRealFinal = salario - totalImpostoMes;
    
    // Projeção Anual (13 salários + 1/3 férias)
    const totalImpostoAno = totalImpostoMes * 13.33;
    const diasTrabalhadosGoverno = (totalImpostoMes / salario) * 30;

    // Atualiza a Interface
    document.getElementById('resAno').innerText = `R$ ${totalImpostoAno.toLocaleString('pt-BR', {maximumFractionDigits: 0})}`;
    document.getElementById('resDias').innerText = `${diasTrabalhadosGoverno.toFixed(0)} dias/mês`;
    document.getElementById('resLiquido').innerText = `R$ ${salarioRealFinal.toLocaleString('pt-BR', {maximumFractionDigits: 2})}`;

    document.getElementById('resultado').classList.remove('hidden');

    // Renderiza o Gráfico (Chart.js)
    renderizarGrafico(salarioRealFinal, inss, irpf, impostoConsumo);
    
    // Scroll Suave
    window.scrollTo({ top: document.getElementById('resultado').offsetTop - 20, behavior: 'smooth' });
}

function renderizarGrafico(bolso, inss, irpf, consumo) {
    const ctx = document.getElementById('graficoImposto').getContext('2d');
    
    if (meuGrafico) {
        meuGrafico.destroy();
    }

    meuGrafico = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Seu Bolso', 'INSS', 'IRPF', 'Imposto Oculto'],
            datasets: [{
                data: [bolso, inss, irpf, consumo],
                backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
                hoverOffset: 10,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#0f172a', font: { weight: 'bold', size: 10 } }
                }
            }
        }
    });
}
