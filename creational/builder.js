//BUILDER PATTERN

class tipCalculator {
    //Constructor of tipCalculator
    constructor(tcObj) {
        this.billAmt = tcObj.billAmt;
        this.serviceQual = tcObj.serviceQual;
        this.numOfPeople = tcObj.numOfPeople;
    }

    calcualteTip() {
        //Calculate tip
        var total = (this.billAmt * this.serviceQual)  / this.numOfPeople ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        return (total);
    }
}

class tipBuilder {
    constructor(){
        this.billAmt = 0;
        this.serviceQual = 0;
        this.numOfPeople = 1;
    }

    setBillAmt(billAmt) {
        this.billAmt = billAmt;
        return this;
    }

    setServiceQual(serviceQual) {
        this.serviceQual = serviceQual;
        return this;
    }

    setNumOfPeople(numOfPeople) {
        this.numOfPeople = numOfPeople;
        return this;
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

    const tcObj = new tipBuilder();

    tcObj.setBillAmt(billAmt).setServiceQual(serviceQual).setNumOfPeople(numOfPeople);


    tip = new tipCalculator(tcObj).calcualteTip();
  
    //tip = tipAmc.calculateTip(billAmt, serviceQual);
    
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
  }