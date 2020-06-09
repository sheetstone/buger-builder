import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.scss';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    sideDrawOpen={this.state.sideDrawOpen} hamburgerClicked={this.sideDrawerCloseHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    showed={this.sideDrawerCloseHandler} 
                    show={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);