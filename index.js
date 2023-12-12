//declaring and initializing variables
var input = document.getElementById("input");
var number = document.querySelectorAll(".numbers div");
var operator = document.querySelectorAll(".operators div");
var result = document.getElementById("result");
var clear = document.getElementById("clear");
var resultDisplayed = false;// to keep an eye on what output is displayed

//add click handlers to number buttons
for(var i = 0; i < number.length; i++) {
    //each number has a click event
    number[i].addEventListener("click", function(e){
        //the current content of the input element
        var currentString = input.innerHTML;
        //the last character from the currentString
        var lastChar = currentString[currentString.length - 1];

        if(resultDisplayed === false){
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML
        }
    });
}

//add click handlers to operators
for (var i = 0; i < operator.length; i++){
    //each operator has a click event
    operator[i].addEventListener("click", function(e) {
        //current content in the input element
        var currentString = input.innerHTML;
        //last character from the currentString
        var lastChar = currentString[currentString.length - 1];

        if(lastChar === "+" || lastChar === "-" || lastChar ==="×" || lastChar === "÷"){
            //replaces the currentString with the new clicked operator
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
            //if input is empty it displays an alert
        } else {
            //appends the clicked operator to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//add event listener to the equal button
result.addEventListener("click", function(){
    var inputString = input.innerHTML;

    //split into an array of numbers using operators as separators
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    
    // extracts the operators from the inputString
    var operators = inputString.replace(/[0-9]|\./g,"").split("");
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    //finds the index of division operator in the operators array
    var divide = operators.indexOf("÷");
    //the while loop continues until the division operator is found
    while (divide != -1){
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
       numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1){
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1)
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];
    //the result will be displayed
    resultDisplayed = true;
})

//clearing the input
clear.addEventListener("click", function(){
    input.innerHTML = "";
});