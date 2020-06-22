import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.scss';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(prev => {
            return !prev;
        })
    }

    return (
        <Aux>
            <Toolbar 
                isAuth={props.isAuthenticated}
                sideDrawOpen={showSideDrawer} hamburgerClicked={sideDrawerCloseHandler}/>
            <SideDrawer 
                isAuth={props.isAuthenticated}
                showed={sideDrawerCloseHandler} 
                show={showSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
        )
        

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);