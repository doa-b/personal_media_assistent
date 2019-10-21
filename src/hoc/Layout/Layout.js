import React, {Component} from 'react';
import { connect } from 'react-redux'

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/**
 * Created by Doa on 8-9-2019.
 */
class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    };

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {

        return (
            <>
                <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler}
                auth={this.props.isAuthenticated}
                avatar={this.props.avatar}/>/>
                <SideDrawer
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer}
                auth={this.props.isAuthenticated}
                avatar={this.props.avatar}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
        avatar: state.auth.photoUrl
    }
};

export default connect(mapStateToProps)(Layout);

