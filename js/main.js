// monthly installment of a loan with constant amortization
'use strict';

const defaultRate = 0;

const calculateMonthlyPayment = (principal, years, annualRate) => {
    if (!principal) { throw new Error("Initial capital must be provided") }
    if (!years) { throw new Error("Term of the loan must be provided (years)") }
    if (!annualRate || annualRate < 0) {
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

const calculateAmortization = (principal, years, rate) => {
    const { monthlyRate, monthlyPayment } = calculateMonthlyPayment(principal, years, rate);
    const { amortization } = Array(+years).fill().reduce(({ balance, amortization }, _, y) => {
        const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
            const interestM = balance * monthlyRate;       //Interest payment for month m
            const principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY += interestM;
            principalY += principalM;
            balance -= principalM;
            if (balance < 0) {
                principalY += balance;
                balance = 0;
            }
            return { interestY, principalY };
        }, { interestY: 0, principalY: 0 });
        amortization.push(Object.assign({ balance }, term));
        return { balance, amortization };
    }, { balance: principal, amortization: [] });
    return { monthlyPayment, monthlyRate, amortization };
};

document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(month => console.log(JSON.stringify(month)));
});
