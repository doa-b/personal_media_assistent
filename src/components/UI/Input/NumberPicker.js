import React from 'react';
import classes from './NumberPicker.module.css'

/**
 * Created by Doa on 20-9-2019.
 */
const NumberPicker = (props) => {

    const numbers = [];

    for (let i = 0; i <= props.max; i++) {
        numbers.push(<span key={i}
                           className={classes.Number}
                           onClick={() => props.chosen(i)}>{i}</span>)
    }

    return (
        <>
            <h3> Select {props.name}</h3>
            <div className={classes.Numbers}>
                {numbers}
            </div>
        </>);
};

export default NumberPicker;