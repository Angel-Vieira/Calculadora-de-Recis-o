document.querySelector(".button").addEventListener("click", function () {
    // Pegando os valores dos inputs
    const salarioBruto = parseFloat(document.querySelector("input[placeholder='Salário Bruto mensal']").value);
    const dataAdmissaoStr = document.querySelector("input[placeholder='Data de admissão']").value;
    const dataDemissaoStr = document.querySelector("input[placeholder='Data de demissão']").value;
 
    // Função para converter data no formato dd/mm/aaaa para objeto Date
    function converterData(data) {
        const [dia, mes, ano] = data.split('/').map(Number); // Divide a string por '/'
        return new Date(ano, mes - 1, dia); // Ajusta o mês, pois começa do zero no JavaScript
    }
 
    const dataAdmissao = converterData(dataAdmissaoStr);
    const dataDemissao = converterData(dataDemissaoStr);
 
    // Verificando se os valores foram inseridos corretamente
    if (isNaN(salarioBruto) || isNaN(dataAdmissao.getTime()) || isNaN(dataDemissao.getTime())) {
        alert("Por favor, preencha todos os campos corretamente, colocando a data no modelo XX/XX/XXXX.");
        return;
    }
 
    // Calculando o tempo de serviço em meses de forma precisa
    let anos = dataDemissao.getFullYear() - dataAdmissao.getFullYear();
    let meses = dataDemissao.getMonth() - dataAdmissao.getMonth();
    let dias = dataDemissao.getDate() - dataAdmissao.getDate();

    // Ajustando o total de meses se os dias do mês de demissão forem menores que os de admissão
    if (dias < 0) {
    meses--; // Se o dia de demissão for anterior ao de admissão, ajusta o mês
    }

    // Ajustando o total de meses se o resultado for negativo
    if (meses < 0) {
    anos--;
    meses += 12;
    }

    // O total de meses é a soma dos anos convertidos em meses mais os meses restantes
    const mesestotais = (anos * 12) + meses;

    let mesesminimos = Math.min(mesestotais, 12);
 
    // Cálculo de férias e décimo terceiro proporcionais
    const feriasProporcionais = ((salarioBruto / 12) * mesesminimos) +((salarioBruto / 12) * mesesminimos)/3 ;
    
    const decimoTerceiroProporcional = (salarioBruto / 12) * mesesminimos;
    console.log(mesesminimos)
 
    // Valor total da rescisão
    const valorRecisao = feriasProporcionais + decimoTerceiroProporcional;
    
 
    // Mostrando o resultado na div "mostrarResultado"
    const resultado = document.getElementById("mostrarResultado");
    resultado.innerHTML = `
        <h2>Resultado da Rescisão</h2>
        <p>Salário Bruto: R$ ${salarioBruto.toFixed(2)}</p>
        <p>Tempo de Serviço: ${mesestotais} meses</p>
        <p>Férias Proporcionais: R$ ${feriasProporcionais.toFixed(2)}</p>
        <p>Décimo Terceiro Proporcional: R$ ${decimoTerceiroProporcional.toFixed(2)}</p>
        <p><strong>Valor Total da Rescisão: R$ ${valorRecisao.toFixed(2)}</strong></p>
    `;
    resultado.classList.add("mostrar");
 });
 