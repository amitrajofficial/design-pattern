//SINGLETON PATTERN
//Only one instance of a class can exist.

class tipCalculator {
    constructor () {
        if (tipCalculator.exists) {
            return tipCalculator.instance;
        }
        tipCalculator.instance = this;
        tipCalculator.exists = true;
        
        return this;
    }

    setBillAmt(billAmt) {
        this.billAmt = billAmt;
    }

    setServiceQual(serviceQual) {
        this.serviceQual = serviceQual;
    }

    setNumOfPeople(numOfPeople) {
        this.numOfPeople = numOfPeople;
    }

    output() {
        //Calculate tip
        var total = (this.billAmt * (this.serviceQual ) / this.numOfPeople) ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        
        return (total);
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

    const tcObj = new tipCalculator();
    
    tcObj.setBillAmt(billAmt);
    tcObj.setServiceQual(serviceQual);
    tcObj.setNumOfPeople(numOfPeople);

    tip = tcObj.output();
  
    //tip = tipAmc.calculateTip(billAmt, serviceQual);
    
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
  }