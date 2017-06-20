"use strict";
 
// Sortout is a base class
class Balance {
 
    constructor (bracketArr) {
        this.bracketArr = bracketArr;
        this.outputArray = [];
    }
 
    /**
     * cleanInput
     * @Version 1.0.0
     * @Description Trim spaces and all the other charaters and numbers from input values.
     *
     * @Param {String} val string input
     * @Return {String} val filtered string output
     */
     cleanInput(val) {
        return val.replace(/[^{}\(\)\[\]]/g, "");
     }
 
 
    /**
     * checkLength
     * @Version 1.0.0
     * @Description If given string has even values then return true else false.
     *
     * @Param {String} val string input
     * @Return {Boolean}
     */
    checkLength(val) {
        var valLength = val.length;
        return (val && valLength % 2 == 0) ? true : false;
    }
 
    /**
     * checkMatchingBrackets
     * @Version 1.0.0
     * @Description Check if string has balanced brackets or not
     *
     * @Param {String} val string input
     * @Return {Boolean}
     */
    checkMatchingBrackets(val) {
        var brackets = [];
        var bracketMap = new Map([
                ['}', '{'],
                [']', '['],
                [')', '(']
            ]);
        var closingBrackets = ['}', ']', ')'];
        var status = true;
        for (let ch of val) {
            if(brackets[ch] === undefined)
                brackets[ch] = 0;

            //If it is a closing bracket then check if opening bracket is present earlier or not
            
            if(closingBrackets.indexOf(ch) != -1) {
                var openingBracket = bracketMap.get(ch);
                if(brackets[openingBracket] === undefined) {
                    //return false;
                    status = false;
                    break;
                }
                if((brackets[ch] + 1) > brackets[openingBracket]) {
                    //return false;
                    status = false;
                    break;
                }
            }
                brackets[ch] = brackets[ch] + 1;
        }
        if(status == true) {
            if(brackets['('] != undefined && brackets[')'] != undefined) {
                if(brackets['('] != brackets[')'])
                    return false;
            }
            if(brackets['['] != undefined && brackets[']'] != undefined) {
                if(brackets['['] != brackets[']'])
                    return false;
            } 
            if(brackets['{'] != undefined && brackets['}'] != undefined) {
                if(brackets['{'] != brackets['}'])
                    return false;
            }     
        }
        return status;
    }
 
    /**
     * processArray
     * @Version 1.0.0
     * @Description If given string has even values then return true else false.
     *
     * @Param {String} val string input
     * @Return {Boolean}
     */
    processArray() {
        this.bracketArr.forEach(function (value) {
            var filteredVal = this.cleanInput(value);
            if(this.checkLength(filteredVal)) {
                if(this.checkMatchingBrackets(filteredVal))
                    this.outputArray.push(`${value}: YES`);
                else
                    this.outputArray.push(`${value}: NO`);
            } else {
                this.outputArray.push(`${value}: NO`);
            }
        }.bind(this));
    }
 
 
    /**
     * print
     * @Version 1.0.0
     * @Description function prints output for each given array element.
     *
     */
    print () {
        this.outputArray.forEach(function (value) {
            console.log(value);
        });
    }
}
 
//Create test cases
var arr = [
    '() [] () ([] () [])',
    '((s ]([)]',
    '{} []+ ()',
    '{{}]}',
    '{[}',
    '[}]',
    '(])[',
    '[( ] ) ] ]',
    ' ',
    '((({{{)))[[[}}}]]]',
    '][[[][[]',
    ']][]][][[[[][[',
    '[]',
    '][',
    '][[][]]]]]',
    '][]]',
    ']][][][]]]',
    '[[[[][[[[][[]]',
    '][[]][[[[[[[[[]]][',
    ']]]][][[][]]][][[[',
    '[][[]][][][[[]',
    ']]',
    '[][[[]]]',
    '][',
    '[]][',
    '][[]][]]][[]',
    '][][]]',
    '[]',
    '[[[[[[][[[[[][][',
    '[[][[][]'
];
//Instantiate class
const balanceObj = new Balance(arr);
 
//Process each array element
balanceObj.processArray();
//Print decision output for each array element
balanceObj.print();
