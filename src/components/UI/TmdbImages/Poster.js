import React from 'react';


/**
 * Created by Doa on 1-10-2019.
 */
const poster = (props) => {

    let path = "https://image.tmdb.org/t/p/original/";

    if (window.innerWidth < 780) path = "/w780/";
    if (window.innerWidth < 500) path = "/w500/";
    if (window.innerWidth < 342) path = "/w342/";
    if (window.innerWidth < 185) path = "/w185/";
    if (window.innerWidth < 154) path = "/w154/";
    if (window.innerWidth < 92) path = "/w92/";
    return (
        <>
            <img scr={"https://image.tmdb.org/t/p"+path+props.poster_path.toString()}
            alt={'series poster'}/>
        </>
    );
};

export default poster;