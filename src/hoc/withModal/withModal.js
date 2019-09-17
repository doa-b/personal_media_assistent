import React, {Component} from 'react';
import classes from './withModal.module.css';
import Aux from '../Auxiliary/Auxiliary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

/**
 * Created by Doa on 25-7-2019.
 */
class WithModal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default WithModal;