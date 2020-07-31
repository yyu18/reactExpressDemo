import React from 'react';
import { Button } from 'react-bootstrap';
export const Profile = (props) => {

    const handleClick = () => {
        window.open("http://192.168.2.24:3000/order-system/myProfile");
    }

    return (
        <Button onClick={handleClick} variant="primary">
            Profile
        </Button>
    )
}