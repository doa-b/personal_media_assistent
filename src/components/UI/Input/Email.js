import React from 'react';

/**
 * Created by Doa on 11-9-2019.
 */

const email = (props) => {
    return (
        <label>
            Email:
            <input
                type="email"
                name="email"
                placeholder="your email"
                value={props.value}
                onChange={props.changed}>
            </input>
        </label>
    );
};

export default email;