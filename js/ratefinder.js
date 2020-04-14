import { findAll } from './rate-service-mock';
    
findAll()
    .then(rates => {
        const html = rates.reduce((table, rate) => {
            return table + `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>\n`;
        }, '');
        document.getElementById('rates').innerHTML = html;
    })
    .catch(e => console.log(e));
