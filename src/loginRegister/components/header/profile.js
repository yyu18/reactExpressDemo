import React from 'react';
import { Button } from 'react-bootstrap';
import {  useHistory  } from 'react-router-dom'
import Cookies from 'js-cookie'

let profileURL = '/myProfile'

export const Profile = () => {
    const history = useHistory();
    const handleClick = () => {
        let userId = Cookies.get('userId')
        history.push(profileURL+'/'+userId);
    }

    return (
        <Button onClick={handleClick} variant="primary">
            Profile
        </Button>
    )
}