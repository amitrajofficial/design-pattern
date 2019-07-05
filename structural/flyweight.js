//FLYWEIGHT PATTERN
//Focused on efficient data sharing through fine-grained objects. It is used for efficiency
//and memory conservation purposed. Can be used for any kind of caching processes.

//Calculate Tip Class
class tipCalculator {
    //Constructor of tipCalculator
    constructor(billAmt, serviceQual, numOfPeople) {
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }

    calcualteTip() {
        //Calculate tip
        var total = (this.billAmt * this.serviceQual)  / this.numOfPeople ;
        console.log(typeof this.billAmt);
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        console.log(this.billAmt, this.serviceQual, this.numOfPeople);
        console.log(total);
        return (total);
    }
}

class tipCalculatorFactory {
    constructor() {
        this._tipCalculator = [];
    }
    createTipCalculator(billAmt, serviceQual, numOfPeople) {
        let tc = this.getTipCalculator(serviceQual);
        if(tc) {
            return tc;
        } else {
            const newTipCalculator = new tipCalculator(billAmt, serviceQual, numOfPeople);
            this._tipCalculator.push(newTipCalculator);
            return newTipCalculator;
        }
    }

    getTipCalculator(serviceQual) {
        return this._tipCalculator.find(tc => tc.serviceQual === serviceQual);
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {

    var billAmt = parseFloat(document.getElementById("billamt").value);
    var serviceQual = parseFloat(document.getElementById("serviceQual").value);
    var numOfPeople = parseFloat(document.getElementById("peopleamt").value);

  
    //validate input
    if (billAmt === "" || serviceQual == 0) {
        alert("Please enter values");
        return;
    }
  
    //Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === "" || numOfPeople <= 1) {
        numOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    const tcObjCreator = new tipCalculatorFactory();

    tcObj = tcObjCreator.createTipCalculator(billAmt, serviceQual, numOfPeople);

    tip = tcObj.calcualteTip();
  
    //tip = tipAmc.calculateTip(billAmt, serviceQual);
    
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
  }