'use strict'; //using JS in strict mode
var buttons = document.getElementsByClassName('calc_button'); //fetching the buttons
var output = document.getElementById('calc_text'); //fetching the output screen
//to store the operands
var val1 = 0;
var val2 = 0;
var operator = ""; //to store the operator
for (var i = 0; i < buttons.length; i++) {
    //adding click event listener to the buttons
    buttons[i].addEventListener('click', function() {
        var value = this.getAttribute('data_value'); //fetching the value associated with data_value attribute
        if (value === '*' || value === '/' || value === '+' || (value === '-' && (val1 !== 0 || val1 !== 0 && val2 !== 0)) || value === '^') {
            //if we encounter an operator
            if (operator !== "") {
                //if we previously had val1, val2 and operator we compute it and store the result in val1
                try {
                    if (operator !== '^') {
                        val1 = Math.round(eval(val1 + operator + val2) * 100) / 100;
                    } else {
                        val1 = Math.round(Math.pow(val1, val2) * 100) / 100;
                    }
                } catch (e) {
                    //throws error in case of invalid expression
                    if (e instanceof SyntaxError) {
                        alert(e.message);
                    } else {
                        throw e;
                    }
                }
                val2 = 0;
                operator = value;
                //displaying the computed value
                output.innerText = Math.round(val1 * 100) / 100;
            } else {
                //if val2 and operator didn't have any previous value
                operator = value;
            }
        } else if (value == '%') {
            //if we encounter percentage we need to deal with it seperately since it's unary
            if (operator !== "") {
                val1 = Math.round(eval(val1 + operator + val2) * 100) / 100;
            }
            output.innerText = Math.round(val1 / 100 * 100) / 100;
            val1 = Math.round(val1 / 100 * 100) / 100;
            operator = "";
            val2 = 0;
        } else if (value === "=") {
            //if we encounter = we need to evaluate the expression and store the result in val1
            try {
                if (operator === '+' || operator === '-' || operator === '*' || operator === '/') {
                    val1 = Math.round(eval(val1 + operator + val2) * 100) / 100;
                } else if (operator === '^') {
                    val1 = Math.round(Math.pow(val1, val2) * 100) / 100;
                } else {
                    val1 = val1;
                }
                output.innerText = val1;
                operator = "";
                val2 = 0;
            } catch (e) {
                //throwing error in case of inavild expression
                if (e instanceof SyntaxError) {
                    alert(e.message);
                } else {
                    throw e;
                }
            }
        } else if (value === "AC") {
            //if we encounter AC we need to clear everything
            operator = "";
            val1 = 0;
            val2 = 0;
            output.innerText = "";
        } else {
            //if we encounter an operand
            if (operator === "") {
                if (val1 !== 0) {
                    val1 += value;
                } else {
                    val1 = value;
                }
                output.innerText = val1;
            } else {
                if (val2 !== 0) {
                    val2 += value;
                } else {
                    val2 = value;
                }
                output.innerText = val2;
            }
        }
    }); //end of event listener
} //end of for loop