import React from 'react';
import { convertStringToDate } from '../../../shared/utility'

import classes from './EpisodeDetails.module.css'

import StarRating from '../../UI/StarRating/StarRating'

/**
 * Created by Doa on 1-10-2019.
 */
const EpisodeDetails = (props) => {

    let url = "https://image.tmdb.org/t/p/w300/" + props.episode.still_path;
    let airDateParts = props.episode.air_date.split('-');
    let airDate = new Date(airDateParts[0], airDateParts[1] - 1, airDateParts[2]);
    let available = <p style={{color: 'green'}}>Available</p>
    console.log(airDate)
    if (convertStringToDate(props.episode.air_date) > new Date()) {
        available = <p style={{color: 'blue'}}>Available at {props.episode.air_date}</p>
    }

    return (
        <div className={classes.EpisodeDetails}>
            {available}
            <div className={classes.Top}>
                <img src={url}
                     alt='episode still'/>
                <div className={classes.ScoreIndicator}>
                <StarRating
                rating={props.episode.vote_average * 10} />
                </div>
            </div>
            <p>{props.episode.overview}</p>
        </div>
    );
};

export default EpisodeDetails;