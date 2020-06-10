async function showOptions(symbolName) {
    const key = 'AKW7U8FI1GS9YXYK';
    const functionName = 'SYMBOL_SEARCH';
    const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&keywords=${symbolName}&apikey=${key}`;
    const options = await axios.get(apiUrl);
    const optionsArr = options.data.bestMatches;
    const list = document.getElementById('list');
    
    for (let i = 0; i < optionsArr.length; i++) {
      const element = document.createElement('li');
      element.setAttribute('onclick', `putData('${optionsArr[i]['1. symbol']}', '${optionsArr[i]['2. name']}')`);
      element.innerText = `Symbol: ${optionsArr[i]['1. symbol']} - Company name: ${optionsArr[i]['2. name']}`;
      list.appendChild(element);
    }
}

const botonAdd = document.getElementById('botonAdd');

if (botonAdd) {
    const symbol = document.getElementById('symbolName').innerText;
    showOptions(symbol);
}

function putData(symbol, name) {
  document.getElementById('name').value = name;
  document.getElementById('symbol').value = symbol;
}
