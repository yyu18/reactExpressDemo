import React,{useMemo,useState} from 'react';
import {UserProfile} from './userProfile'
const Profiles = ()=>{
    const graphQLURI = 'http://192.168.2.24:5001/graphql'
    const [Feedback,setFeedback] = useState({})
    let rows = []
    useMemo(async ()=>{
        if(Feedback.error===undefined){
            try{
                let value = {
                    query:'{ profile(page:1, limit:100) { previous{page limit} results{myProfile{name type content} userId{username email userId} image }  next{page limit } }}'
                }

                let response = await fetch(graphQLURI, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body:JSON.stringify(value)
                    })
                    
                let data = await response.json()
                
                if(data.error)  return setFeedback({ error:true, info:'query failed' })  

                return setFeedback({
                    error:false,
                    info:data.data.profile
                })
            } catch (err) {
                setFeedback({
                    error:true,
                    info:'query failed'
                })    
            }
        }
    })

    if(Feedback.error===false) {
        Feedback.info.results.map((e,index)=>{
            rows.push(<UserProfile  key = {index} info={e}/>)
        })
    }
    
    return (
    <>
        <section className="section-b-space p-t-0 ratio_asos">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="theme-tab">
                            <div className="tab-content-cls">
                                <div id="tab-4" className="tab-content active default">
                                    <div className="no-slider row">
                                        {
                                        Feedback.error===false&&
                                            rows
                                        }
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default Profiles