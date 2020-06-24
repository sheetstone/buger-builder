import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/actions'

const Logout = (props) => {
    const {onLogout} = props;
    
    useEffect(() => {
        onLogout();
    },[onLogout]) 


    return <Redirect to='/' />;

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreator.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);