import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';


const WithErrorModal = (props) => {
    const [error, setError] = useState(null);

    useEffect(()=> {
        setError(props.error);
    },[props])

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return (
        <>
            <Modal show={error}
                close={errorConfirmedHandler}>
                {error? error.message: null};
            </Modal>
            {props.children}
        </>
    )
}

export default WithErrorModal;