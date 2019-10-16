import React from 'react';
import Img from 'react-image';

import {convertStringToDate} from '../../../shared/utility'
import seriesPlaceholder from '../../../assets/images/series_placeholder.png'
import StarRating from '../../UI/StarRating/StarRating'
import Spinner from '../../UI/Spinner/Spinner'

import classes from './EpisodeDetails.module.css'



/**
 * Created by Doa on 1-10-2019.
 */
const EpisodeDetails = (props) => {

    let url = "https://image.tmdb.org/t/p/original/" + props.episode.still_path;
    let airDateParts = props.episode.air_date.split('-');
    let airDate = new Date(airDateParts[0], airDateParts[1] - 1, airDateParts[2]);
    let available = <p style={{color: 'green'}}>Available</p>
    console.log(airDate)
    if (convertStringToDate(props.episode.air_date) > new Date()) {
        available = <p style={{color: 'blue'}}>Available at {props.episode.air_date}</p>
    }

    return (
        <div className={classes.EpisodeDetails}>
            <p className={classes.Title}> {props.episode.name} </p>
            <Img className={classes.Img}
                 src={[url, seriesPlaceholder]}
                 alt='episode still'
            loader={<Spinner/>}/>
            <div className={classes.Top}>
                <StarRating
                    rating={props.episode.vote_average * 10}
                    details/>
                {available}
            </div>
            <span className={classes.Overview}>{props.episode.overview}</span>
        </div>
    );
};

export default EpisodeDetails;