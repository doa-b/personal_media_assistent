import React from 'react';

import classes from './SeriesListItem.module.css'
import stepForward from '../../../assets/images/step_forward.svg'
import stop from '../../../assets/images/stop.svg'
import pause from '../../../assets/images/pause.svg'

/**
 * Created by Doa on 9-9-2019.
 */
const SeriesListItem = (props) => {
    const p = props.series;
    const nextAirDate = (p.nextAirDate === "none") ? <p>Series has ended</p> : <p>Next {p.nextAirDate}</p>;
    const url = "https://image.tmdb.org/t/p/w300/" + p.image;
    let myStatusIcon = stepForward;
    if (props.series.myStatus === 'paused') {
        myStatusIcon = pause
    } else if (props.series.myStatus === 'finished') {
        myStatusIcon = stop
    }

    return (
        <div className={classes.cardBody}>
            <div className={classes.cardHeader}>{p.name}</div>
            <div className={classes.cardMain}>
                <div className={classes.cardDetails}>
                    <p>Season <em>{p.season}</em> ({p.seasonTotal})</p>
                    <p>Episode <em>{p.episode}</em> ({p.episodeTotal})</p>
                    <div className={classes.next}>
                        {nextAirDate}
                    </div>
                </div>
                <img className={classes.image}
                     src={url}
                     alt='episode'/>

                <img className={classes.forward}
                     src={myStatusIcon}
                     alt='series Status'
                     onClick={props.Onforward}/>
            </div>

            <div className={classes.cardFooter}>{props.series.episodeTitle}</div>
        </div>
    )
};

export default SeriesListItem;

