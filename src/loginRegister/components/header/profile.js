import React from 'react';
import { Button } from 'react-bootstrap';
import {  useHistory,Link  } from 'react-router-dom'
import Cookies from 'js-cookie'

let profileURL = 'http://192.168.2.24:3000/myProfile'

export const Profile = () => {
    const history = useHistory();
    let userId = Cookies.get('userId')
    let URL = profileURL+'/'+userId

    return (
        <a href={URL}>
            <Button variant="primary">
                Profile
            </Button>
        </a>
    )
}