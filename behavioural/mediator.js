//MEDIATOR PATTERN
//Encapsulates how a set of object interact with each other.
//It provides the central authority over a group of objects by
//providing loose coupling.

class mediator {
    constructor(){
        this._calc = [];
        this._verify = [];
    }

    registerCalculate(calculate) {
        this._calc.push(calculate);
        calculate.register(this);
    }

    registerValidate() {
        this._verify.push(validate);
        validate.register(this);
    }

    tipCalculator(billAmt, serviceQual, numOfPeople){
        const obj = new validate(billAmt, serviceQual, numOfPeople);
        if(obj.entryValidator()){
            //Calculate tip
            var total = (billAmt * (serviceQual ) / numOfPeople) ;
            //round to two decimal places
            total = Math.round(total * 100) / 100;
            //next line allows us to always have two digits after decimal point
            total = total.toFixed(2);

            return (total);
        }
    }
}

class calculate {
    constructor(billAmt, serviceQual, numOfPeople){
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
        this.mediator = null;
    }

    register(mediator){
        this.mediator = mediator;
    }
    
    tipCalculator(){
        if (this.mediator) {
            let t = this.mediator.tipCalculator(this.billAmt, this.serviceQual, this.numOfPeople);
            return t;
        }
        return null;
    }
}

class validate {
    constructor(billAmt, serviceQual, numOfPeople){
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
        this.mediator = null;
    }

    register(mediator){
        this.mediator = mediator;
    }

    entryValidator(){
        if (this.billAmt === "" || this.serviceQual == 0) {
            alert("Please enter values");
            return;
        }

        //Check to see if this input is empty or less than or equal to 1
        if (this.numOfPeople === "" || this.numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }

        console.log("Verification Done!");
        return true;
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';
  
//click to call function
document.getElementById("calculate").onclick = function() {

    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    const m = new mediator();
    const c = new calculate(billAmt, serviceQual, numOfPeople);
    m.registerCalculate(c);
    tip = c.tipCalculator();

    
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
}