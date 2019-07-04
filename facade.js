//FACADE PATTERN
//Used to provide simple public facing interface for users for the ease of use.
//So, the complexities of it's consisting subsystem or subclass are hidden from the users.

//Calculate Tip Class
class tipCalculator {
    //Constructor of tipCalculator
    constructor () {
      this.createTipCalculator = function(billAmt, serviceQual, numOfPeople) {
        let tcObj;
        if (numOfPeople>1)
          tcObj = new groupTipCalculator(numOfPeople);
        else if (numOfPeople == 1)
          tcObj = new soloTipCalculator(numOfPeople);
        
        var tip = tcObj.calculateTip(billAmt, serviceQual);
        return tip;
      }
      
    }
}
 
class groupTipCalculator {
  constructor(numOfPeople) {
    this.numOfPeople = numOfPeople;
  }

  //Function to be executed
  calculateTip (billAmt, serviceQual) {

  //Calculate tip
  var total = (billAmt * (serviceQual ) / this.numOfPeople) ;
  //round to two decimal places
  total = Math.round(total * 100) / 100;
  //next line allows us to always have two digits after decimal point
  total = total.toFixed(2);
  
  console.log("Inside Group Calculator");

  return (total);
  }
}

class soloTipCalculator {
  constructor(numOfPeople) {
    this.numOfPeople = numOfPeople;
  }

  //Function to be executed
  calculateTip (billAmt, serviceQual) {

    //Calculate tip
    var total = (billAmt * (serviceQual ) / this.numOfPeople) ;
    //round to two decimal places
    total = Math.round(total * 100) / 100;
    //next line allows us to always have two digits after decimal point
    total = total.toFixed(2);

    console.log("Inside Solo Calculator");
    
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

  //console.log(typeof(billAmt));
  //if (typeof(billAmt) == Number)

  //Check to see if this input is empty or less than or equal to 1
  if (numOfPeople === "" || numOfPeople <= 1) {
    numOfPeople = 1;
    document.getElementById("each").style.display = "none";
  } else {
    document.getElementById("each").style.display = "block";
  }

  const tcObj = new tipCalculator();

  const tip = tcObj.createTipCalculator(billAmt, serviceQual, numOfPeople);

  //tip = tipAmc.calculateTip(billAmt, serviceQual);
  
  //Display the tip
  document.getElementById("totalTip").style.display = "block";
  document.getElementById("tip").innerHTML = tip; 
}