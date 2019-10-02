import React from 'react';
import classes from './NumberPicker.module.css'

/**
 * Created by Doa on 20-9-2019.
 */
const NumberPicker = (props) => {

    const numbers = [];
    let style = {};

    for (let i = props.min; i <= props.max; i++) {
        if (i === props.current) {
            style = {backgroundColor: 'lightblue'}
        } else style = {};

        numbers.push(<span key={i}
                           className={classes.Number}
                           style={style}
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