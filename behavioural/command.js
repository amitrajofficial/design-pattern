//COMMAND PATTERN
//Aims to encapsulate actions or operations as objects.
//Allows the separation of the objects that request an operation or invoke 
//a method to the ones that execute or process the actual implementation.

class tipCalculator {
    //Constructor of tipCalculator
    constructor (billAmt, serviceQual, numOfPeople = 1) {
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }
    
    //validate input
    verify(){
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
    }
    
    calculation(){
        //Calculate tip
        var total = (this.billAmt * (this.serviceQual ) / this.numOfPeople) ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        
        return (total);
    }
}

class command{
    constructor(subject) {
        this._subject = subject;
    }
    execute(command) {
        return this._subject[command]();
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


  const tcObj = new command(new tipCalculator(billAmt, serviceQual, numOfPeople));

  tcObj.execute('verify');
  tip = tcObj.execute('calculation');
  
  //Display the tip
  document.getElementById("totalTip").style.display = "block";
  document.getElementById("tip").innerHTML = tip; 
}