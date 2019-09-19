import React from 'react';

import classes from './SeriesListItem.module.css'
import seriesPlaceHolder from '../../assets/images/series_placeholder.png'
import stepForward from '../../assets/images/step_forward.svg'

/**
 * Created by Doa on 9-9-2019.
 */
const SeriesListItem = (props) => {
    const p = props.series;
    const nextAirDate = (p.nextAirDate === "none") ? <p>Series has ended</p> : <p>Next airdate {p.nextAirDate}</p>

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
                     src={seriesPlaceHolder}
                     alt='season'/>

                <img className={classes.forward}
                     src={stepForward}
                     alt='forward'
                     onClick={props.Onforward}/>
            </div>

            <div className={classes.cardFooter}>{props.series.episodeTitle}</div>
        </div>
    )
};

export default SeriesListItem;

