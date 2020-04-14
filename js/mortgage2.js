'use strict';

export default class Mortgage {

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
