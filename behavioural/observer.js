//OBSERVER PATTERN
//If one object changes it's state all the dependent objects are notified and updated accordingly.

class Subject {
    constructor() {
        this._observers = [];
    }

    subscribe(observer) {
        this._observers.push(observer);
    }

    unsubscribe(observer) {
        this._observers= this._observers.filter(obs => observer !== obs);
    }

    tipCalculator(billAmt, serviceQual, numOfPeople){
        //Calculate tip
        var total = (billAmt * (serviceQual ) / numOfPeople) ;
        //round to two decimal places
        total = Math.round(total * 100) / 100;
        //next line allows us to always have two digits after decimal point
        total = total.toFixed(2);
        
        this._observers.forEach(observer => {
            observer.update(total);
        });

        return (total);
    }
}

class Observer {
    constructor(total) {
        this.total = total;
        //this.initialState = state;
    }

    update(total) {
        this.total = total;
        console.log("Total Tip: " + total + " | RESPONSE FROM OBSERVER");
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

    //USAGE
    const sub = new Subject();

    const obs = new Observer(0);
    sub.subscribe(obs);

    tip = sub.tipCalculator(billAmt, serviceQual, numOfPeople);
  
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
}