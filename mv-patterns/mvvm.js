//MODEL-VIEW-VIEWMODEL PATTERN

class model {
    update (billAmt, serviceQual, numOfPeople) {
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
    requestUpdate(billAmt, serviceQual, numOfPeople) {
        p.requestUpdate(billAmt, serviceQual, numOfPeople);
    }

    showView(result){
        //Display the tip
        document.getElementById("totalTip").style.display = "block";
        document.getElementById("tip").innerHTML = result; 
    }
}
const v = new view();

class presenter {
    constructor(){
        this.view = null;
    }

    changeView(view){
        this.view = view;
    }

    requestUpdate(billAmt, serviceQual, numOfPeople){
        newModel.update(billAmt, serviceQual, numOfPeople);
        newModel.validate();
        var tip = newModel.tipCalculator();
        v.showView(tip);
    }
}
const p = new presenter();

//TO CHANGE THE VIEW AS MVVM HAS MANY TO ONE MAPPING BETWEEN VIEWS AND VIEWMODEL
p.changeView(view);

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {
    var billAmt = parseFloat(document.getElementById("billamt").value);
    var serviceQual = parseFloat(document.getElementById("serviceQual").value);
    var numOfPeople = parseFloat(document.getElementById("peopleamt").value);

    const viewObj = new view();
    viewObj.requestUpdate(billAmt, serviceQual, numOfPeople);
}