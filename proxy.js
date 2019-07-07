//PROXY PATTERN

const target = {
    calculateTip(billAmt, serviceQual, numOfPeople){
        total = (billAmt * serviceQual) / numOfPeople;
        total = Math.round(total * 100) / 100;
        total = total.toFixed(2);
        return total;
    }
};

const handler = {
    set(obj, query, value){
        let flag = 0;

        switch(query) {
            case 'billAmt':
                if(value < 0) {
                    alert('Enter a valid Bill Amount!');
                    Reflect.set(obj, query, 0)
                    flag = 1;
                }
                break;
            case 'serviceQual':
                arr = [0.05, 0.1, 0.15, 0.2, 0.3]
                if(arr.includes(value) == false) {
                    alert('Service quality not valid!')
                    Reflect.set(obj, query, 0);
                    flag = 1;
                }
                break;
            case 'numOfPeople':
                if(value < 1){
                    alert('Enter a valid number!');
                    Reflect.set(obj, query, 1);
                    flag = 1;
                }
                break;
            if(flag == 0){
                Reflect.set(obj, query, value);
            }
        }
    }
};

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {

    var billAmt = parseFloat(document.getElementById("billamt").value);
    var serviceQual = parseFloat(document.getElementById("serviceQual").value);
    var numOfPeople = parseFloat(document.getElementById("peopleamt").value);

    //Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === "" || numOfPeople <= 1) {
        numOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    const tipCalculator = new Proxy(target, handler);

    tip = tipCalculator.calculateTip(billAmt, serviceQual, numOfPeople);
    
    //Display the tip
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip; 
  }