import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const starRating = (props) => {

    let stars = [];
    let rating = Math.round(props.rating);
    for (let i = 5; i <= 100; i = i + 20) {
        if (rating >= i + 10) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={'star'}
                    color={'yellow'}/>
            )
        } else if (rating >= i) {
            stars.push(
                <span
                    key={i}
                    className="fa-layers fa-fw">
            <FontAwesomeIcon icon={'star'}
                             color={'grey'}/>
                <FontAwesomeIcon icon={'star-half'}
                                 color={'yellow'}/>
            </span>
            )
        }
        else stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={'star'}
                    color={'grey'}/>
            )
    }
    return (
        <>
            <div className={'fa-lg'}>
                {stars}
            </div>
            {'  ' + rating + ' / 100'}
        </>
    )
};
export default starRating;

