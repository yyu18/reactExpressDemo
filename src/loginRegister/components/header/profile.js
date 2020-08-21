import React from 'react';
import { Button } from 'react-bootstrap';
import {  useHistory  } from 'react-router-dom'
import Cookies from 'js-cookie';
export const Profile = (props) => {
    const history = useHistory();
    const handleClick = () => {
        let userId = Cookies.get('userId')
        history.push('/order-system/myProfile/'+userId);
    }

    return (
        <Button onClick={handleClick} variant="primary">
            Profile
        </Button>
    )
}