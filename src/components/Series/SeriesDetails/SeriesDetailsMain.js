import React from 'react';

import classes from './SeriesDetailsMain.module.css'

import ScoreIndicator from 'react-score-indicator'

import Poster from '../../UI/TmdbImages/Poster'

/**
 * Created by Doa on 17-9-2019.
 */
const seriesDetailsMain = (props) => {
    console.log(props.details);
    let nextEpisode = <h4>Series has ended</h4>;
    let next = props.details.next_episode_to_air;
    let url = "https://image.tmdb.org/t/p/w500/" + props.details.poster_path;

    let seasonList = (
        props.details.seasons.map((season) => {
            return (
                <li key={season.id}>
                    ({season.season_number}) episodes: {season.episode_count}
                </li>)
        })
    );
    if (next) {
        nextEpisode = (
            <div>
                <h4> Next Episode {next.air_date} </h4>
                <p> S{next.season_number} E{next.episode_number} </p>
                <p> {next.name} </p>
            </div>
        )
    }
    return (
        <div className={classes.SeriesDetailsMain}>
            <img src={url}></img>
            <p>{props.details.overview}</p>
                {props.details.number_of_episodes} episodes in {props.details.number_of_seasons} seasons
                {nextEpisode}
                {'first air date: ' + props.details.first_air_date}

            <ScoreIndicator value={props.details.vote_average * 10} maxValue={100}/>

            {/*<ul>*/}
                {/*{seasonList}*/}
            {/*</ul>*/}
        </div>
    );
};

export default seriesDetailsMain;