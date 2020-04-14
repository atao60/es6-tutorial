// monthly installment of a loan with constant amortization
'use strict';

class Mortgage {

    static defaultRate = 0;
    static percentRatio = 100;
    static monthPerYear = 12;
    
    constructor(principal, years, rate) {
        if (!principal) { throw new Error("Initial capital must be provided") }
        if (!years) { throw new Error("Term of the loan must be provided (years)") }
        if (!rate || rate < 0) {
            rate = Mortgage.defaultRate;
            console.log("No rate provided or negative one: zero rate will be taken in account")
        }

        this.principal = principal;
        this.years = years;
        this.annualRate = rate;
    }
    
    get monthlyRate() {
        return this.annualRate / Mortgage.percentRatio / Mortgage.monthPerYear;
    }
    get monthlyPayment()  {
        const duration = Mortgage.monthPerYear * this.years;
        let coeff;
        if (this.monthlyRate > 0) {
            coeff = this.monthlyRate / (1 - Math.pow(1 / (1 + this.monthlyRate), duration));
        } else {
            coeff = 1 / duration;
        }
        return this.principal * coeff;
    }
    
    get amortization() {
        const { amortization } = Array(+this.years).fill().reduce(({ balance, amortization }, _, y) => {
            const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
                const interestM = balance * this.monthlyRate;       //Interest payment for month m
                const principalM = this.monthlyPayment - interestM; //Principal payment for month m
                interestY += interestM;
                principalY += principalM;
                balance -= principalM;
                if (balance < 0) {
                    principalY += balance;
                    balance = 0;
                }
                return { interestY, principalY };
            }, { interestY: 0, principalY: 0 });
            const fullTerm = Object.assign({ balance }, term);
            amortization.push(fullTerm);
            return { balance, amortization };
        }, { balance: this.principal, amortization: [] });
        return amortization;
    }
    
}

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
