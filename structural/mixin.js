//FACTORY PATTERN
//Gives the responsibility of object initiation to it's subclass.

 
var groupTipCalculator = {
  billAmt: 0,
  serviceQual: 0,
  numOfPeople: 1,
  //Function to be executed
  calculateTip: function() {

    //Calculate tip
    var total = (this.billAmt * (this.serviceQual ) / this.numOfPeople) ;
    //round to two decimal places
    total = Math.round(total * 100) / 100;
    //next line allows us to always have two digits after decimal point
    total = total.toFixed(2);

    return (total);
  }
}

var soloTipCalculator = {
  billAmt: 0,
  serviceQual: 0,
  numOfPeople: 1,

  //Function to be executed
  calculateTip: function() {

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


  let tipCalculator = {...soloTipCalculator, ...groupTipCalculator};

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

  soloTipCalculator.billAmt = billAmt;
  soloTipCalculator.serviceQual = serviceQual;

  groupTipCalculator.billAmt = billAmt;
  groupTipCalculator.serviceQual = serviceQual;
  groupTipCalculator.numOfPeople = numOfPeople;

  if(numOfPeople == 1) {
    tip = soloTipCalculator.calculateTip();
  } else {
    tip = groupTipCalculator.calculateTip();
  }
  
  //Display the tip
  document.getElementById("totalTip").style.display = "block";
  document.getElementById("tip").innerHTML = tip; 
}