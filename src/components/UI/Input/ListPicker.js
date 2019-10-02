import React from 'react';

import classes from './ListPicker.module.css'

/**
 * Created by Doa on 20-9-2019.
 */
const ListPicker = (props) => {

    let choices = [
        'name',
        'last seen',
    ];

    if (props.choices === 'filter') {
        choices = [
            'paused',
            'available',
            'finished',
            'none'
        ];
    }

    return (
        <div className={classes.ListPicker}>
            {choices.map((choice) =>
                <p className={classes.ListItem}
                    key={choice}
                   onClick={() => props.chosen(props.choices, choice)}>
                    {choice}
                </p>
            )}
        </div>);
};

export default ListPicker;