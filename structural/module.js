//MODULE PATTERN
//Intergral Piece of robust application used to keep unit of code separated and organised.

var tipModule = (function() {
    var billAmt = 0;
    var serviceQual = 0;
    var numOfPeople = 1;

    return {
        setBillAmt: function(billAmt){
            bill = billAmt;
        },
        setServiceQual: function(serviceQual){
            service = serviceQual;
        },
        setNumOfPeople: function(numOfPeople){
            num = numOfPeople;
        },

        calculateTip: function(){
            var total = ((bill) * service / num);
            total = Math.round(total * 100) / 100;
            total = total.toFixed(2);
            return total;
        }
    }
})();

//Hide the tip amount on load
document.getElementById("totalTip").style.display = 'none';
document.getElementById("each").style.display = 'none';

//click to call function
document.getElementById("calculate").onclick = function() {
	var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    //Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === "" || numOfPeople <= 1) {
        numOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    tipModule.setBillAmt(billAmt);
    tipModule.setServiceQual(serviceQual);
    tipModule.setNumOfPeople(numOfPeople);

    tip = tipModule.calculateTip();
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = tip;
}