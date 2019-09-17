import React from 'react';

import classes from './SeriesDetailsMain.module.css'

/**
 * Created by Doa on 17-9-2019.
 */
const seriesDetailsMain = (props) => {
    let nextEpisode=<h4>Series has ended</h4>;
    let next=props.details.next_episode_to_air;
    let url = `https://image.tmdb.org/t/p/original/${props.details.poster_path}`;
    let url2 = "https://image.tmdb.org/t/p/original/fNSVO2LRkAmbyA8kFNnr4Btq1xp.jpg";
    let seasonList = (
        props.details.seasons.map((season) => {
            return (
            <li key={season.id}>
                ({season.season_number}) episodes: {season.episode_count}
            </li>)
        })
    );
    if (next) {
        nextEpisode=(
            <div>
                <h4> Next Episode {next.air_date} </h4>
                <p> S{next.season_number} E{next.episode_number} </p>
                <p> {next.name} </p>
            </div>
        )
    }
    return (
        <div className={classes.SeriesDetailsMain}>
            <h3>{props.details.name}</h3>
            <img src={url2}></img>
            <p>{'first air date: ' + props.details.first_air_date}</p>
            <p>{props.details.overview}</p>
            <ul>
                {seasonList}
            </ul>
            <p>{props.details.number_of_episodes} episodes in {props.details.number_of_seasons} seasons</p>
            {nextEpisode}
            <p>
                {props.details.poster_path}
            </p>


            <img scr={`https://image.tmdb.org/t/p/original${props.details.poster_path}`}
            alt="kip"/>
            <img scr={"https://image.tmdb.org/t/p/original" + props.details.poster_path}
                 >
            </img>

        </div>
    );
};

export default seriesDetailsMain;