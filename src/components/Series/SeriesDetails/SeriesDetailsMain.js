import React from 'react';
import Img from 'react-image';
import classes from './SeriesDetailsMain.module.css'
import StarRating from '../../UI/StarRating/StarRating'
import seriesPlaceholder from '../../../assets/images/series_placeholder.png';



/**
 * Created by Doa on 17-9-2019.
 */
const seriesDetailsMain = (props) => {
    console.log(props.details);
    let nextEpisode = <i className={classes.Ended}>Series has ended</i>;
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
            <div className={classes.Next}>
                <p>Newest episode: <span>"{next.name}"</span></p>
                <p>
                    <span>(S{next.season_number} E{next.episode_number})</span>
                    on <span>{next.air_date}</span>
                    </p>
            </div>
        )
    }
    return (
        <>
            <div className={classes.Top}>
                <span className={classes.Name}>{props.details.name}</span>
                <StarRating rating={props.details.vote_average * 10}/>
            </div>
            <Img className={classes.Img}
                 src={[url, seriesPlaceholder]}
                 alt='episode still'/>
            <div className={classes.SeriesDetailsMain}>
                <div className={classes.Info}>
                    <p>First air date:<span>{props.details.first_air_date}</span></p>
                    <p>
                        <span>{props.details.number_of_episodes}</span>
                        episodes in<span>{props.details.number_of_seasons}</span>seasons
                    </p>
                </div>
                <p>{props.details.overview}</p>
                {nextEpisode}
            </div>
        </>
    );
};

export default seriesDetailsMain;