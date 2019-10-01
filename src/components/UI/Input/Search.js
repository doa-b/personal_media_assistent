import React from 'react';

/**
 * Created by Doa on 11-9-2019.
 */
const search = (props) => {
    return (
        <>
            <input
                type="text"
                id="search"
                defaultValue={props.value}           >
            </input>

            <button onClick={()=>props.clicked('doa')}>
                search
            </button>
        </>
    );
};

export default search;