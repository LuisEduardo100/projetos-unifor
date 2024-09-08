import styles from './styles.module.css';
import { useState } from 'react';

export default function Calculadora() {
    const [input, setInput] = useState('');
    const [table, setTable] = useState([]);
    const resultArray = []
    const [expressionsResult, setExpressionsResult] = useState([])

    const handleClick = (value) => {
        setInput(input + value);
    }

    const handleDelete = () => {
        setInput(input.slice(0, -1))
    }

    const handleClear = () => {
        setInput('')
        setTable([])
    }

    const handleEvaluate = () => {

        console.log(solve(input))
        setTable(solve(input))
    };

    class Expression {
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

    function solve(exp) {
        var expObj = new Expression(exp);
        // resultado final
        return expObj.solve()
    }

    function extractUniqueLetters(inputString) {
        // Create a regular expression that matches all letters (case-insensitive)
        const regex = /[a-zA-Z]/g;
        // Use the match method to find all letters in the string
        const lettersArray = inputString.match(regex);

        // If lettersArray is null, return an empty array
        if (!lettersArray) return [];

        // Create a Set from the array to remove duplicates, then convert it back to an array
        const uniqueLettersSet = new Set(lettersArray.map(letter => letter.toLowerCase()));
        return Array.from(uniqueLettersSet);
    }

    return (
        <div className={styles.container_pai}>
            <div className={styles.container}>
                <h1>Tabela Verdade Online</h1>
                <input value={input} readOnly className={styles.input} />
                <div className={styles.container_btn}>
                    <button className={`${styles.red_btn}`} onClick={handleClear}>AC</button>
                    <button className={`${styles.red_btn}`} onClick={handleDelete}>DEL</button>
                    <button className={`${styles.evaluate_btn}`} onClick={handleEvaluate}>=</button>
                </div>
                <div className={styles.container_btn}>
                    <button className={styles.btn} onClick={() => handleClick('a')}>A</button>
                    <button className={styles.btn} onClick={() => handleClick('b')}>B</button>
                    <button className={styles.btn} onClick={() => handleClick('c')}>C</button>
                    <button className={styles.btn} onClick={() => handleClick('d')}>D</button>
                    <button className={styles.btn} onClick={() => handleClick('e')}>E</button>
                    <button className={styles.btn} onClick={() => handleClick('f')}>F</button>
                    <button className={styles.btn} onClick={() => handleClick('g')}>G</button>
                    <button className={styles.btn} onClick={() => handleClick('h')}>H</button>
                    <button className={styles.btn} onClick={() => handleClick('i')}>I</button>
                    <button className={styles.btn} onClick={() => handleClick('j')}>J</button>

                </div>
                <div className={styles.container_btn}>
                    <button className={styles.btn} onClick={() => handleClick('∧')}>∧</button>
                    <button className={styles.btn} onClick={() => handleClick('∨')}>∨</button>
                    <button className={styles.btn} onClick={() => handleClick('~')}>~</button>
                    <button className={styles.btn} onClick={() => handleClick('→')}>→</button>
                    <button className={styles.btn} onClick={() => handleClick('↔')}>↔</button>
                    <button className={styles.btn} onClick={() => handleClick('+')}>+</button>
                    <button className={styles.btn} onClick={() => handleClick('(')}>(</button>
                    <button className={styles.btn} onClick={() => handleClick(')')}>)</button>
                </div>
            </div>
            {table.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            {Object.keys(table[0]).map((key) => (
                                <th className={styles.th} key={key}>{key === 'Result' ? input : key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Itera sobre as linhas da tabela */}
                        {table.map((row, index) => (
                            <tr className={styles.tr} key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td className={styles.td} key={index}>{
                                        value.toString() === "0" ? "F" :
                                        value.toString() === "1" ? "V" : 
                                        value.toString()
                                    }</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
