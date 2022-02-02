function getData() {
    let loanAmount = document.getElementById("amount").value;
    let time = document.getElementById("time").value;
    let interest = document.getElementById("interest").value;
    const userLoan = new loanInfo(loanAmount, time, interest);
    if (Number.isNaN(loanAmount) && Number.isNaN(time) && Number.isNaN(interest)) {
        alert("One of the values is not a number, correct and continue with calculator.");
    } else {
        displayData(userLoan);
   //     displayTable(userLoan);
    }
}

function loanInfo(loanAmount, time, interest) {
    this.loanAmount = loanAmount;
    this.time = time / 12;
    this.interest = interest / 100;
}

function getTotalCost(userObj) {
    let cost = userObj.loanAmount * (1 + (userObj.interest * userObj.time));
    return cost;
}

function getTotalInterest(userObj) {
    let int = getTotalCost(userObj) - userObj.loanAmount;
    return int;
}

function getMonthPayment(userObj) {
    let monthPay = getTotalCost(userObj) / (userObj.time*12);
    return monthPay;
}

function displayData(userObj) {
    document.getElementById("totalPrin").innerHTML = `Total Principle: $${userObj.loanAmount}`;
    document.getElementById("totalIn").innerHTML = `Total Interest: $${getTotalInterest(userObj)}`;
    document.getElementById("totalCost").innerHTML = `Total Interest: $${getTotalCost(userObj)}`;
    document.getElementById("monthPay").innerHTML = `$${getMonthPayment(userObj)}`;
}


function displayTable(userObj) {

}