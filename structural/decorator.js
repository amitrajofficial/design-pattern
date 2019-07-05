//DECORATOR PATTERN
//Ability to add behaviour or functionalities to existing classes dynamically.

class calculateTip {
    constructor(billAmt, serviceQual, numOfPeople) {
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }
}

function verifyInputs(tcObj){
    //validate input
    tcObj.verify = function() {
        if (tcObj.billAmt === "" || tcObj.serviceQual == 0) {
            alert("Please enter values");
            return;
        }
        console.log("Input Verified!");
    }
    return(tcObj);
    
}

function output(tcObj){
    tcObj.TipCalculator = function() {
        //Check to see if this input is empty or less than or equal to 1
        if (tcObj.numOfPeople === "" || tcObj.numOfPeople <= 1) {
            tcObj.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }

        //Calculate tip
        var total = (tcObj.billAmt * (tcObj.serviceQual ) / tcObj.numOfPeople) ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        return(total);
        //console.log(total);
    }
    return tcObj;
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {
    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    tc = verifyInputs(new calculateTip(billAmt, serviceQual, numOfPeople));
    tc.verify();
    tp = output(tc);
    total=tp.TipCalculator();

    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}