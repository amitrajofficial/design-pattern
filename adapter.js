//ADAPTER PATTERN
//Translates an interface for an object or class into an interface compatible with a specific system.

class oldTipCalculator {
    constructor(){
        this.billAmt = 0;
        this.serviceQual = 0;
        this.numOfPeople = 1
    }

    operations(op) {
        switch(op, value) {
            case 'setBillAmt':
                this.billAmt = value;
                console.log("Inside old class");
                break;
            case 'setServiceQual':
                this.serviceQual = value;
                break;
            case 'setNumOfPeople':
                this.numOfPeople = value;
                break;
            case 'calculateTip':
                var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
                total = Math.round(total * 100) / 100;
                total = total.toFixed(2);
                return total;
        }
    }
}

class newTipCalculator{
    constructor(){
        this.billAmt = 0;
        this.serviceQual = 0;
        this.numOfPeople = 1;
    }

    setBillAmt(billAmt) {
        this.billAmt = billAmt;
        console.log("Inside new class");
    }
    setServiceQual(serviceQual) {
        this.serviceQual = serviceQual;
    }
    setNumOfPeople(numOfPeople){
        this.numOfPeople = numOfPeople;
    }

    calculateTip() {
        console.log("Bill Amount: ");
        console.log(this.billAmt);
        var total = (this.billAmt * this.serviceQual) / this.numOfPeople;
                total = Math.round(total * 100) / 100;
                total = total.toFixed(2);
                return total;
    }
}

class adpter {
    constructor(tipCalculator){
        this.tipCalculator = tipCalculator;
    }

    operations(op, value){
        switch(op) {
            case 'setBillAmt':
                console.log("Check");
                this.tipCalculator.setBillAmt(value);
                break;
            case 'setServiceQual':
                this.tipCalculator.setServiceQual(value);
                break;
            case 'setNumOfPeople':
                this.tipCalculator.setNumOfPeople(value);
                break;
            case 'calculateTip':
                console.log("Inside adapter class");
                return this.tipCalculator.calculateTip();
        }
    }
}

const newTC = new newTipCalculator();
const adapterObj = new adpter(newTC);

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {
    var billAmt = parseFloat(document.getElementById("billamt").value);
    var serviceQual = parseFloat(document.getElementById("serviceQual").value);
    var numOfPeople = parseFloat(document.getElementById("peopleamt").value);

    // Set value of data members of TipCalculator
    adapterObj.operations('setBillAmt', billAmt);
    adapterObj.operations('setServiceQual', serviceQual);
    adapterObj.operations('setNumOfPeople', numOfPeople);

    // Show the result in html
    tip = adapterObj.operations('calculateTip');
    //console.log("Alive");

    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
}