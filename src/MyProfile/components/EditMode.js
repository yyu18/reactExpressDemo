import React, { useContext,useState } from 'react'
import { MyProfileContext } from '../../context'
import { Button } from 'react-bootstrap'

export const EditMode = () => {
    let validateEditURI = 'http://localhost:5000/profiles/users-profile'
    const myProfile = useContext(MyProfileContext)
    let accessToken = myProfile.accessToken
    let userId = myProfile.userId
    const [error,setError] = useState({})
    const handleEdit = async() =>{
        try{
        let response = await fetch(validateEditURI+'/'+userId,{
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + accessToken
            }
        })

        let data = await response.json()
        if(data.error) return setError({
            error:data.error,
            info:data.info
        })

        } catch (err) {
            console.error(err)
            setError({
                error:true,
                info:err.message
            })
        }
    }
    return ( 
        <>
        <Button onClick = {handleEdit} variant="primary" >EDIT</Button>
            {
                error.error&&
                    <p style={{color:'red'}}>
                    {error.info}
                    </p>
            } 
          </>
        )
}