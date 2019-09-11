import React from 'react';

/**
 * Created by Doa on 11-9-2019.
 */
const name = (props) => {
    return (
        <label>
            Name:
            <input
                type="text"
                name="name"
                placeholder="your full name"
                value={props.value}
            onChange={props.changed}>
            </input>
        </label>
    );
};

export default name;