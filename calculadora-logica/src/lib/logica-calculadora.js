export class Expression {
    constructor(textExpression) {
        this.textExpression = textExpression;
        this.possibleVariables = extractUniqueLetters(textExpression)
        this.resultArray = []
    }

    _getLogicValues() {
        var currentFactor = (2 ** this.possibleVariables.length) / 2;
        var currentCounter = 0;
        var pushZeros = true;
        var result = {};
        for (let letter of this.possibleVariables) {
            var tempArray = [];
            for (let i = 0; i < 2 ** this.possibleVariables.length; i++) {
                if (currentCounter >= currentFactor) {
                    currentCounter = 0;
                    pushZeros = !pushZeros;
                }

                if (pushZeros) {
                    tempArray.push(0);
                } else {
                    tempArray.push(1);
                }
                currentCounter++;
            }
            currentFactor /= 2;
            result[letter] = tempArray;
        }
        return result;
    }

    _replaceOperators(textExpression) {
        textExpression = textExpression.replace(/~/g, '!');  // not
        textExpression = textExpression.replace(/∧/g, '&&'); // and
        textExpression = textExpression.replace(/∨/g, '||'); // or
        textExpression = textExpression.replace(/↔/g, ' == '); // equivalent
        textExpression = textExpression.replace(/→/g, ' <= '); // implies
        textExpression = textExpression.replace(/\+/g, ' !== '); // xor (different)
        return textExpression;
    }

    solve() {
        var logicValues = this._getLogicValues();

        for (let i = 0; i < 2 ** this.possibleVariables.length; i++) {
            var tempExpression = this.textExpression;
            var tempDict = {}

            Object.keys(logicValues).forEach(function (key) {
                tempExpression = tempExpression.replace(new RegExp(key, 'g'), logicValues[key][i]);
                tempDict[key] = logicValues[key][i];
            })

            tempExpression = this._replaceOperators(tempExpression);

            try {
                var evaluatedResult = eval(tempExpression) ? 'V' : 'F';
                tempDict["Result"] = evaluatedResult;
            } catch (e) {
                console.log("Erro: " + e);
                tempDict["Result"] = "Erro";
            }
            this.resultArray.push(tempDict);
        }

        return this.resultArray;
    }
}

function extractUniqueLetters(inputString) {
    const regex = /[a-zA-Z]/g;
    const lettersArray = inputString.match(regex);

    if (!lettersArray) return [];

    const uniqueLettersSet = new Set(lettersArray.map(letter => letter));
    return Array.from(uniqueLettersSet);
}