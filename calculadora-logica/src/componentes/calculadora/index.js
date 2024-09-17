import styles from './styles.module.css';
import { useState } from 'react';
import { Expression } from '../../lib/logica-calculadora.js';

export default function Calculadora() {
    const [input, setInput] = useState('');
    const [table, setTable] = useState([]);
    const [classification, setClassification] = useState('');

    const handleClick = (value) => {
        setInput(input + value);
    }

    const handleDelete = () => {
        setInput(input.slice(0, -1))
    }

    const handleClear = () => {
        setInput('')
        setTable([])
        setClassification('')
    }

    const handleEvaluate = () => {
        console.log(solve(input))
        setTable(solve(input))
        setClassification(classifyProposition(solve(input)))
    };

    function solve(exp) {
        var expObj = new Expression(exp);
        return expObj.solve()
    }

    function classifyProposition(table) {
        const results = table.map(row => row.Result)

        if (results.every(result => result === 'V')) {
            return 'Tautologia'
        } else if (results.every(result => result === 'F')) {
            return 'Contradição'
        } else {
            return 'Contingência'
        }
    }

    return (
        <div className={styles.container_pai}>
            <div className={styles.container}>
                <h1>Tabela Verdade Online</h1>
                <input value={input} type='text' className={styles.input} onChange={(e) => setInput(e.target.value)} />
                <div className={styles.container_btn}>
                    <button className={`${styles.red_btn}`} onClick={handleClear}>AC</button>
                    <button className={`${styles.red_btn}`} onClick={handleDelete}>DEL</button>
                    <button className={`${styles.evaluate_btn}`} onClick={handleEvaluate}>=</button>
                </div>
                <div className={styles.container_btn}>
                    <button className={styles.btn} onClick={() => handleClick('A')}>A</button>
                    <button className={styles.btn} onClick={() => handleClick('B')}>B</button>
                    <button className={styles.btn} onClick={() => handleClick('C')}>C</button>
                    <button className={styles.btn} onClick={() => handleClick('D')}>D</button>
                    <button className={styles.btn} onClick={() => handleClick('E')}>E</button>
                    <button className={styles.btn} onClick={() => handleClick('F')}>F</button>
                    <button className={styles.btn} onClick={() => handleClick('G')}>G</button>
                    <button className={styles.btn} onClick={() => handleClick('H')}>H</button>
                    <button className={styles.btn} onClick={() => handleClick('I')}>I</button>
                    <button className={styles.btn} onClick={() => handleClick('J')}>J</button>

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
                <div className={styles.classification}> 
                    <h3>Classificação: {classification}</h3>
                </div>
            )}
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
            <div className={styles.classification}>
            </div>
        </div>
    )
}
