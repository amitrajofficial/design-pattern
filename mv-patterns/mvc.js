//MODEL-VIEW-CONTROL PATTERN

class model {
    update (billAmt, serviceQual, numOfPeople) {
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }

    tipCalculator() {
        //Calculate tip
        var total = (this.billAmt * (this.serviceQual ) / this.numOfPeople) ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        return (total);
    }
}
const newModel = new model();

class view {
    showView(result){
        //Display the tip
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = result; 
    }
}
const v = new view();

class control {
    constructor(billAmt, serviceQual, numOfPeople) {
        this.billAmt = billAmt;
        this.serviceQual = serviceQual;
        this.numOfPeople = numOfPeople;
    }

    validate(){
        //validate input
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
    }

    updateModel(){
        newModel.update(this.billAmt,this.serviceQual,this.numOfPeople);
    }

    calculateTip(){
        var result = newModel.tipCalculator();
        this.result = result;
    }

    display(){
        //console.log(this.result);
        v.showView(this.result);
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

    const controlObj = new control(billAmt, serviceQual, numOfPeople);

    controlObj.validate();
    controlObj.updateModel();
    controlObj.calculateTip();
    controlObj.display();
}