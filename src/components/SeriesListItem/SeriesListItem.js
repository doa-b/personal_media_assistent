import React from 'react';

import classes from './SeriesListItem.module.css'
import seriesPlaceHolder from '../../assets/images/series_placeholder.png'
import stepForward from '../../assets/images/step_forward.svg'

/**
 * Created by Doa on 9-9-2019.
 */
const SeriesListItem = (props) => {

    return (
        <div className={classes.cardBody}>
            <div className={classes.cardHeader}>{props.series.name}</div>
            <div className={classes.cardMain}>
                <div className={classes.cardDetails}>
                    <p>Season <em>{props.series.season}</em> (8)</p>
                    <p>Episode <em>{props.series.episode}</em> (12)</p>
                    <div className={classes.next}>
                        {props.series.nextAirDate
                            ? <p>Next airdate {props.series.nextAirDate}</p>
                            : <p> series ended</p>
                        }
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

