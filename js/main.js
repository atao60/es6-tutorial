// monthly installment of a loan with constant amortization
'use strict';

import { default as Mortgage } from './mortgage2';

document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const mortgage = new Mortgage(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = mortgage.monthlyRate.toFixed(2);
    const html = mortgage.amortization.reduce((html, year, index) => html += `
        <tr>
            <td>${index + 1}</td>
            <td class="currency">${Math.round(year.principalY)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">${Math.round(year.interestY)}</td>
            <td class="currency">${Math.round(year.balance)}</td>
        </tr>
    `, '');
    mortgage.amortization.forEach(month => console.log(JSON.stringify(month)));
    document.getElementById("amortization").innerHTML = html;
});

