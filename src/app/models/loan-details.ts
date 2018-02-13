import { Installment } from './installment'

export class LoanDetails {
    public loanAmount: number;
    public interest: number;
    public nInstallments: number;

    private _emi: number;
    public get emi(): number {
        if (this._emi == null) {
            if (this.loanAmount != null && this.interest != null && this.nInstallments != null) {
                return - 1 * this.PMT(this.interestPerMonth,
                    this.nInstallments,
                    this.loanAmount);
            }
        }
        return this._emi;
    }
    public set emi(value: number) {
        this._emi = value;
    }
    public get interestPerMonth(): number {
        return this.interest / 1200;
    }

    private PMT(ir, np, pv, fv?, type?) {
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        var pmt, pvif;

        fv || (fv = 0);
        type || (type = 0);

        if (ir === 0)
            return -(pv + fv) / np;

        pvif = Math.pow(1 + ir, np);
        pmt = - ir * pv * (pvif + fv) / (pvif - 1);

        if (type === 1)
            pmt /= (1 + ir);

        return pmt;
    }

    public totalInterestPaid: number;
    public totalTenure: number;
    public get tenureDisplayValue() {
        let years = Math.floor(this.totalTenure / 12);
        let months = this.totalTenure % 12;
        return { years, months }
    }

    public installments: Array<Installment>;
    public computeAndSetInstallments() {
        let outstanding: number = this.loanAmount;
        this.totalInterestPaid = 0;

        this.totalTenure = 0;
        let installments: Array<Installment> = [];
        let i = 1;
        while (outstanding > 0) {
            let installment = new Installment();
            if ((outstanding * this.interestPerMonth) + outstanding < this.emi) {
                installment.emi = (outstanding * this.interestPerMonth) + outstanding;
            }
            else {
                installment.emi = this.emi;
            }
            installment.interest = outstanding * this.interestPerMonth;
            installment.month = i++;
            installment.principal = installment.emi - installment.interest;
            installment.outstanding = outstanding - installment.principal;
            outstanding = installment.outstanding;

            this.totalInterestPaid += installment.interest;
            this.totalTenure++;
            installments.push(installment);
        }
        this.installments = installments;
    }
    public updateInstallments() {
        let outstanding = this.loanAmount;
        this.totalTenure = 0;
        this.totalInterestPaid = 0;
        this.installments = this.installments.filter((installment) => {
            if ((outstanding * this.interestPerMonth) + outstanding < installment.emi) {
                installment.emi = (outstanding * this.interestPerMonth) + outstanding;
            }
            installment.interest = outstanding * this.interestPerMonth;
            installment.principal = installment.emi - installment.interest;
            installment.outstanding = outstanding - installment.principal;
            outstanding = installment.outstanding;
            this.totalInterestPaid += installment.interest;
            if (installment.emi > 0) {
                this.totalTenure++;
                return true;
            }
            return false;
        });
    }
}