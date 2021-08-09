function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(myExpr) {
    myExpr = myExpr.replace(/\s/g, "");
    if (!checkBrackets(myExpr)) throw new Error('ExpressionError: Brackets must be paired');

    while (myExpr.includes('(')) {
        let [innerParenthesis, innerExp] = myExpr.match(/\(([^\(\)]+)\)/);
        // console.log(innerParenthesis, innerExp);
        myExpr = myExpr.replace(innerParenthesis, expressionCalculator(innerExp));
        // console.log('HEREE')
        // console.log(myExpr)
    }

    while (myExpr.includes('/')) {
        let negativeResult = false;
        // console.log('devision')
        const firstNum = findFirstNumBefore(myExpr,'/');
        if (myExpr[myExpr.indexOf('/')+1] === '-') {
            negativeResult = true;
            myExpr = myExpr.slice(0, myExpr.indexOf('/')+1) + myExpr.slice(myExpr.indexOf('/')+2);
        }
        const secondNum = findSecondNumBefore(myExpr,"/");
        // console.log(secondNum)
        // console.log(firstNum, secondNum)
        if (secondNum === '0') throw new Error('TypeError: Division by zero.')
        if ((parseFloat(firstNum) / parseFloat(secondNum)).toString().includes('e')) {
            myExpr = myExpr.replace(`${firstNum}/${secondNum}`, 0);
        } else {
            myExpr = negativeResult ? myExpr.replace(`${firstNum}/${secondNum}`, -(parseFloat(firstNum) / parseFloat(secondNum))) : myExpr.replace(`${firstNum}/${secondNum}`, parseFloat(firstNum) / parseFloat(secondNum));
            // console.log('/', myExpr);
        }
    }
    while (myExpr.includes('*')) {
        let negativeResult = false;
        const firstNum = findFirstNumBefore(myExpr,'*');
        if (myExpr[myExpr.indexOf('*')+1] === '-') {
            negativeResult = true;
            myExpr = myExpr.slice(0, myExpr.indexOf('*')+1) + myExpr.slice(myExpr.indexOf('*')+2);
        }
        const secondNum = findSecondNumBefore(myExpr,"*");
        // console.log(parseFloat(firstNum) * parseFloat(secondNum))
        myExpr = negativeResult ? myExpr.replace(`${firstNum}*${secondNum}`, -(parseFloat(firstNum) * parseFloat(secondNum))) : myExpr.replace(`${firstNum}*${secondNum}`, parseFloat(firstNum) * parseFloat(secondNum));
        // console.log('*', myExpr);
    }
    while (myExpr.includes('+')) {
        if (myExpr[0] === '+') {
            myExpr = myExpr.substring(1);
            // console.log('testing')
            // console.log(myExpr)
            if (!myExpr.includes('+') && !myExpr.includes('-') && !myExpr.includes('*') && !myExpr.includes('/')) {
                return parseFloat(myExpr);
            } else {
                continue;
            }
        }
        if (myExpr.includes('+-')) {
            myExpr = myExpr.replace('+-', '-');
            // console.log(myExpr);
            continue;
        }
        const firstNum = findFirstNumBefore(myExpr,'+');
        const secondNum = findSecondNumBefore(myExpr,"+");
        // console.log('checking', firstNum, secondNum);
        let result;
        // console.log('check')
        // console.log(myExpr[myExpr.indexOf(`${firstNum}+`)-1], myExpr.indexOf(`${firstNum}+`)-1 )
        if (myExpr[myExpr.indexOf(`${firstNum}+`)-1] === '-') {
            result = - parseFloat(firstNum) + parseFloat(secondNum);
            if (result > 0) {
                myExpr = setCharAt(myExpr,myExpr.indexOf(`${firstNum}+${secondNum}`)-1,'+')
            } else {
                myExpr = setCharAt(myExpr,myExpr.indexOf(`${firstNum}+${secondNum}`)-1,'');
            }
        } else {
            result = parseFloat(firstNum) + parseFloat(secondNum)
        }
        myExpr = myExpr.replace(`${firstNum}+${secondNum}`, result);
        // console.log('+', myExpr);
    }
    while (myExpr.includes('-')) {
        if (myExpr.includes('--')) {
            // console.log('double -')
            myExpr = myExpr.replace('--', '+');
            continue;
            // console.log(myExpr)
        }
        if (myExpr.includes('+-')) {
            myExpr = myExpr.replace('+-', '-');
            // console.log(myExpr)
        }
        let flag = false;
        if(myExpr[0] === '-') {
            if (myExpr.includes('+')) break;
            myExpr = myExpr.substring(1);
            if (!myExpr.includes('+') && !myExpr.includes('-') && !myExpr.includes('*') && !myExpr.includes('/')) {
                return -parseFloat(myExpr);
            }
            flag = true;
            // console.log(myExpr);
        }
        const firstNum = findFirstNumBefore(myExpr,'-');
        // console.log('!!!')
        const secondNum = findSecondNumBefore(myExpr,"-");
        // console.log(firstNum, secondNum)
        let replacedValue =  flag ? (- parseFloat(firstNum) - parseFloat(secondNum)) : (parseFloat(firstNum) - parseFloat(secondNum))
        myExpr = myExpr.replace(`${firstNum}-${secondNum}`, replacedValue.toString(10));
        // console.log('-', myExpr);

    }

    while (myExpr.includes('+')) {
        if (myExpr[0] === '+') {
            myExpr = myExpr.substring(1);
            // console.log('testing')
            // console.log(myExpr)
            if (!myExpr.includes('+') && !myExpr.includes('-') && !myExpr.includes('*') && !myExpr.includes('/')) {
                return parseFloat(myExpr);
            } else {
                continue;
            }
        }
        if (myExpr.includes('+-')) {
            myExpr = myExpr.replace('+-', '-');
            // console.log(myExpr);
            continue;
        }
        const firstNum = findFirstNumBefore(myExpr,'+');
        const secondNum = findSecondNumBefore(myExpr,"+");
        // console.log('checking', firstNum, secondNum);
        let result;
        // console.log('check')
        // console.log(myExpr[myExpr.indexOf(`${firstNum}+`)-1], myExpr.indexOf(`${firstNum}+`)-1 )
        if (myExpr[myExpr.indexOf(`${firstNum}+`)-1] === '-') {
            result = - parseFloat(firstNum) + parseFloat(secondNum);
            if (result > 0) {
                myExpr = setCharAt(myExpr,myExpr.indexOf(`${firstNum}+${secondNum}`)-1,'+')
            } else {
                myExpr = setCharAt(myExpr,myExpr.indexOf(`${firstNum}+${secondNum}`)-1,'');
            }
        } else {
            result = parseFloat(firstNum) + parseFloat(secondNum)
        }
        myExpr = myExpr.replace(`${firstNum}+${secondNum}`, result);
        // console.log('+', myExpr);
    }
    // console.log(parseInt(myExpr))
    return parseFloat(myExpr)

    function findFirstNumBefore(e, op) {
        const regex = new RegExp("[\\d\\.]+(?=\\"+op+")");
        return e.match(regex)[0]
    }

    function findSecondNumBefore(e, op) {
        const regex = new RegExp("(?<=\\" + op + ")[\\d\\.]+");
        return e.match(regex)[0]
    }

    function checkBrackets(e) {
        let brackets = []
        for (const letter of e) {
            if (letter === '(') {
                brackets.push('(');
            } else if (letter === ')') {
                if (brackets[brackets.length - 1] === '(') {
                    brackets.pop();
                } else
                    return false;
            }
        }
        return brackets.length === 0;
    }

    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
}

module.exports = {
    expressionCalculator
}