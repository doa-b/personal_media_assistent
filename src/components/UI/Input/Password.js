import React from 'react';

/**
 * Created by Doa on 11-9-2019.
 */
const email = (props) => {
    return (
        <label>
            Password:
            <input
                type="password"
                name="password"
                placeholder="your password"
                value={props.value}
                onChange={props.changed}>
            </input>
        </label>
    );
};

export default email;