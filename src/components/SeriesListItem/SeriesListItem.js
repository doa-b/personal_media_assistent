import React from 'react';

import classes from './SeriesListItem.module.css'
import seriesPlaceHolder from '../../assets/images/series_placeholder.png'
import stepForward from '../../assets/images/step_forward.svg'
import StatusIcon from '../../components/StatusIcon/StatusIcon'

/**
 * Created by Doa on 9-9-2019.
 */
const SeriesListItem = (props) => {
    return (
        <div className={classes.cardBody}>
            <div className={classes.cardHeader}>Series Title</div>
            <div className={classes.cardMain}>
                <div className={classes.cardDetails}>
                    <p>Season 1</p>
                    <p>Episode 5</p>
                    <p>Next airdate 12-3-2016</p>
                </div>
                {/*<div className={classes.image}>*/}
                    <img className={classes.image}
                        src={seriesPlaceHolder}
                       />
                {/*</div>*/}
                {/*<div className={classes.forward}>*/}
                    <img className={classes.forward}
                        src={stepForward}
                        /></div>
            {/*</div>*/}
            <div className={classes.cardFooter}>Episode Title</div>
        </div>
    )
};

export default SeriesListItem;

