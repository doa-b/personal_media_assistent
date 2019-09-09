import React, {Component} from 'react';

import classes from './Layout.module.css';

import Aux from '../Auxiliary/Auxiliary';

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
            <Aux>
                <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;