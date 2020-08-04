import React from 'react';
import { Button } from 'react-bootstrap';
import {  useHistory  } from 'react-router-dom'
export const Profile = (props) => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/order-system/myProfile');
    }

    return (
        <Button onClick={handleClick} variant="primary">
            Profile
        </Button>
    )
}