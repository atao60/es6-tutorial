// monthly installment of a loan with constant amortization
'use strict';

const defaultRate = 0;

const calculateMonthlyPayment = function (principal, years, annualRate) {
    if (! principal) { throw new Error("Initial capital must be provided")}
    if (! years) { throw new Error("Term of the loan must be provided (years)")}
    if (! annualRate || annualRate < 0) {
        annualRate = defaultRate;
        console.log("No rate provided or negative one: zero rate will be taken in account")
    }

    const duration = 12 * years;
    const monthlyRate = annualRate / 100 / 12;
    let coeff;
    if (annualRate > 0) {
        coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
    } else {
        coeff = 1 / duration;
    }
    const monthlyPayment = principal * coeff;
    
    return { principal, years, annualRate, monthlyPayment, monthlyRate };
};

document.getElementById('calcBtn').addEventListener('click', function () {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const { monthlyPayment, monthlyRate } = calculateMonthlyPayment(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
});
