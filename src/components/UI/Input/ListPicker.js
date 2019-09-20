import React from 'react';

// import classes from './ListPicker.module.css'

/**
 * Created by Doa on 20-9-2019.
 */
const ListPicker = (props) => {
    return (<div>
        {props.choices.map((choice) =>
            <p key={choice}
            onClick={()=> props.chosen(choice)}>
                {choice}
            </p>
        )}
    </div>);
};

export default ListPicker;