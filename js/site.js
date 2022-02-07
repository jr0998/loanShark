function getData() {
    let loanAmount = document.getElementById("amount").value;
    let time = document.getElementById("time").value;
    let interest = document.getElementById("interest").value;
    const userLoan = new loanInfo(loanAmount, time, interest);
    if (Number.isNaN(loanAmount) && Number.isNaN(time) && Number.isNaN(interest)) {
        alert("One of the values is not a number, correct and continue with calculator.");
    } else {
        displayData(userLoan);
        displayTable(userLoan);
    }
}

function loanInfo(loanAmount, time, interest) {
    this.loanAmount = loanAmount;
    this.time = time;
    this.interest = interest / 100;
}

function getTotalCost(userObj) {
    let a = userObj.loanAmount;
    let i = userObj.interest
    let t = userObj.time;
    let cost = a * (1+(i / t));
    return cost;
}

function getTotalInterest(userObj) {
    let int = getTotalCost(userObj) - userObj.loanAmount;
    return int;
}

function getMonthPayment(userObj) {
    let a = getTotalCost(userObj);
    let n = userObj.time;
    let r = userObj.interest / 12;
    console.log(r);
    let monthPay = (a * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    return monthPay;
}

function getAmortInterest(userObj) {
    let month = [];
    month[0] = 0;
    let principal = userObj.loanAmount;
    for (let i = 1; i <= userObj.time; i++) {
        month[i] = (principal * userObj.interest) / 12;
        principal -= (getMonthPayment(userObj) - month[i]);
    }
    return month;
}

function getBalance(userObj, index) {
    let balance = (getTotalCost(userObj)) - (getMonthPayment(userObj) * index);
    return balance;

}

function displayData(userObj) {
    document.getElementById("totalPrin").innerHTML = `Total Principle: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(userObj.loanAmount)}`;
    document.getElementById("totalIn").innerHTML = `Total Interest: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotalInterest(userObj))}`;
    document.getElementById("totalCost").innerHTML = `Total Interest: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotalCost(userObj))}`;
    document.getElementById("monthPay").innerHTML = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getMonthPayment(userObj))}`;
}

function displayTable(userObj) {
    document.getElementById("results").innerHTML = ``;
    let amInterest = [];
    let amTotal = 0;
    let total = 0;
    amInterest = getAmortInterest(userObj);
    for (let i = 1; i <= (userObj.time); i++) {
        document.getElementById("results").innerHTML += `<td>${i}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getMonthPayment(userObj))}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total+=(getMonthPayment(userObj)-amInterest[i]))}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amInterest[i])}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amTotal+=amInterest[i])}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getBalance(userObj,i))}</td>
        `;
    }
}