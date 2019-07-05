//PROTOTYPE PATTERN
//Use of "skeleton" of an existing object to create or instantiate new objects.

//Prototype object
const calculateTip = {

    output : function() {
        if (this.billAmt === "" | this.serviceQual == 0) {
            alert("Please enter values");
            return;
        }
    
        if (this.numOfPeople === "" | this.numOfPeople <= 1) {
            this.numOfPeople = 1;
            document.getElementById("each").style.display = "none";
        } else {
            document.getElementById("each").style.display = "block";
        }
    
        var total =  ((this.billAmt) * (this.serviceQual) / this.numOfPeople);
        total = Math.round(total*100)/100;
        total = total.toFixed(2);

        return (total);
    }
}



//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {
    //Main object creation
    const tipCalculator = Object.create(calculateTip, {
        numOfPeople : {
            value : document.getElementById("peopleamt").value,
            writable: true
        },
        billAmt : {
            value : document.getElementById("billamt").value,
            writable: true
        },
        serviceQual : {
            value : document.getElementById("serviceQual").value,
            writable: true
        }
    });

    tip = tipCalculator.output();

    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
  }