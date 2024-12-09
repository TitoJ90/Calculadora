document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('pt-PT', options);
});

function calcularValores() {
    const valorBruto = parseFloat(document.getElementById('valorBruto').value.replace(/\./g, '').replace(',', '.')) || 0;
    const subsidioTransporte = parseFloat(document.getElementById('subsidiariosTransporte').value.replace(/\./g, '').replace(',', '.')) || 0;
    const subsidioAlimentacao = parseFloat(document.getElementById('subsidiariosAlimentacao').value.replace(/\./g, '').replace(',', '.')) || 0;

    // Calcular Segurança Social (3%)
    const segurancaSocial = (valorBruto + subsidioTransporte + subsidioAlimentacao) * 0.03;
    const segurancaSocialFormatted = formatNumber(segurancaSocial);

    // Calcular Valor Líquido
    const valorLiquido = valorBruto - subsidioTransporte - subsidioAlimentacao - segurancaSocial;
    const valorLiquidoFormatted = formatNumber(valorLiquido);

    // Calcular IRT
    const irt = calcularIRT(valorLiquido);
    const irtFormatted = formatNumber(irt);

    // Formatar o valor bruto e os subsídios
    document.getElementById('valorBruto').value = formatNumber(valorBruto);
    document.getElementById('subsidiariosTransporte').value = formatNumber(subsidioTransporte);
    document.getElementById('subsidiariosAlimentacao').value = formatNumber(subsidioAlimentacao);

    // Atualizar campos de saída
    document.getElementById('segurancaSocial').value = segurancaSocialFormatted;
    document.getElementById('valorLiquido').value = valorLiquidoFormatted;
    document.getElementById('irt').value = irtFormatted;

    // Adicionar resultado na tabela
    const tabelaResultados = document.getElementById('resultados').querySelector('tbody');
    const novaLinha = document.createElement('tr');

    const celulaValorBruto = document.createElement('td');
    celulaValorBruto.textContent = formatNumber(valorBruto);

    const celulaSegurancaSocial = document.createElement('td');
    celulaSegurancaSocial.textContent = segurancaSocialFormatted;

    const celulaValorLiquido = document.createElement('td');
    celulaValorLiquido.textContent = valorLiquidoFormatted;

    const celulaIRT = document.createElement('td');
    celulaIRT.textContent = irtFormatted;

    novaLinha.appendChild(celulaValorBruto);
    novaLinha.appendChild(celulaSegurancaSocial);
    novaLinha.appendChild(celulaValorLiquido);
    novaLinha.appendChild(celulaIRT);

    tabelaResultados.appendChild(novaLinha);
}

function calcularIRT(valorLiquido) {
    let irt = 0;

    if (valorLiquido <= 100000 && valorLiquido >= 0) {
        irt = 0;
    } else if (valorLiquido >= 100001 && valorLiquido <= 150000) {
        irt = 0 + 0.13 * (valorLiquido - 100000);
    } else if (valorLiquido >= 150001 && valorLiquido <= 200000) {
        irt = 12500 + 0.16 * (valorLiquido - 150000);
    } else if (valorLiquido >= 200001 && valorLiquido <= 300000) {
        irt = 31250 + 0.18 * (valorLiquido - 200000);
    } else if (valorLiquido >= 300001 && valorLiquido <= 500000) {
        irt = 49259 + 0.19 * (valorLiquido - 300000);
    } else if (valorLiquido >= 500001 && valorLiquido <= 1000000) {
        irt = 87250 + 0.2 * (valorLiquido - 500000);
    } else if (valorLiquido >= 1000001 && valorLiquido <= 1500000) {
        irt = 187249 + 0.21 * (valorLiquido - 1000000);
    } else if (valorLiquido >= 1500001 && valorLiquido <= 2000000) {
        irt = 292249 + 0.22 * (valorLiquido - 1500000);
    } else if (valorLiquido >= 2000001 && valorLiquido <= 2500000) {
        irt = 402249 + 0.23 * (valorLiquido - 2000000);
    } else if (valorLiquido >= 2500000 && valorLiquido <= 5000000) {
        irt = 517249 + 0.24 * (valorLiquido - 2500000);
    } else if (valorLiquido >= 5000001 && valorLiquido <= 10000000) {
        irt = 1117249 + 0.245 * (valorLiquido - 5000000);
    }

    return irt;
}

function formatNumber(number) {
    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function limparValores() {
    document.getElementById('calculoForm').reset();
    document.getElementById('resultados').querySelector('tbody').innerHTML = '';
}
