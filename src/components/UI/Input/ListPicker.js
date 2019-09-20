import React from 'react';

// import classes from './ListPicker.module.css'

/**
 * Created by Doa on 20-9-2019.
 */
const ListPicker = (props) => {

    let choices=[
        'name',
        'next airdate',
        'last seen',
        ]

    if (props.choices === 'filter') {
        choices = [
            'paused',
            'available',
            'finished',
            'all'
        ];
    }

    return (<div>
        {choices.map((choice) =>
            <p key={choice}
            onClick={()=> props.chosen(props.choices, choice)}>
                {choice}
            </p>
        )}
    </div>);
};

export default ListPicker;