const url = 'rates.json';
    
fetch(url)
    .then(response => response.json())
    .then(rates => {
        const html = rates.reduce((table, rate) => {
            return table + `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>\n`;
        }, '');
        document.getElementById('rates').innerHTML = html;
    })
    .catch(e => console.log(e));
