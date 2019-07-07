//ITERATOR PATTERN

class tipCalculator{
    constructor(data){
        const setValues = new Iterator(data);
        this.billAmt= setValues.next().value;
        this.serviceQual = setValues.next().value;
        this.numOfPeople = setValues.next().value;
    }
    
    validate(){
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

    calculation(){
        this.validate();

        let total = (this.billAmt * this.serviceQual) / this.numOfPeople;
        total = Math.round(total * 100) / 100;
        total = total.toFixed(2);

        return total;
    }
}

// Iterator class
class Iterator{
    constructor(data){
        this.data = data;
        this.index= 0;
    }

    next(){
        if(this.index < this.data.length){
            return {value: this.data[this.index++]};
        }
        else{
            this.index = 0;
            return {};
        }
    }
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

document.getElementById("calculate").onclick = function() {
    const billAmt = document.getElementById("billamt").value;
    const serviceQual = document.getElementById("serviceQual").value;
    const numOfPeople = document.getElementById("peopleamt").value;

    var tip = new tipCalculator([billAmt,serviceQual,numOfPeople]);

    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip.calculation();
};