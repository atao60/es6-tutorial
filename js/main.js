// monthly installment of a loan with constant amortization
'use strict';

import { calculateAmortization } from './mortgage';


document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(month => console.log(JSON.stringify(month)));
});
