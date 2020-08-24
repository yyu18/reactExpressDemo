import React from 'react';
import {  useHistory  } from 'react-router-dom'

export const UserProfile = (props)=>{
    const history = useHistory()
    let images = props.info.image
    let userId = props.info.userId
    let profileURL = '/myProfile'
    console.log(props.info.userId)

    const handleClickUser = () =>{
        history.push(profileURL+'/'+userId.userId);
    }
    return (                   
    <div className="product-box" >
        <div className="img-wrapper">
            <div className="front">
            {
                images[0] ? 
                 <img src={images[0]} className="img-fluid blur-up lazyload bg-img" style={{width:"255px",height:"255px"}}/>
                :    
                <img src="/assets/images/pro3/default-user-image.png" className="img-fluid blur-up lazyload bg-img" alt=""/>
            } 
            </div>
            <div className="back">
            {
                images[1] ? 
                 <img src={images[1]} className="img-fluid blur-up lazyload bg-img"style={{width:"255px",height:"255px"}}/>
                :    
                <img src="/assets/images/pro3/default-user-image.png" className="img-fluid blur-up lazyload bg-img" alt=""/>
            }
            </div>
            <div className="cart-info cart-wrap">

                    <button data-toggle="modal" data-target="#addtocart" title="Message">
                        <i className="ti-comment-alt" ></i>
                    </button> 

                    <a href=" " title="Likes">
                        <i className="ti-heart" aria-hidden="true"></i>
                    </a>       

                    <a href=" " data-toggle="modal" data-target="#quick-view" title="Thumb Up">
                        <i className="ti-thumb-up" aria-hidden="true"></i>
                    </a> 

                    <a href=" " title="Quick View">
                        <i className="ti-search" aria-hidden="true"></i>
                    </a>
            </div>
        </div>
        <div className="product-detail" onClick = {handleClickUser} >
            <div className="rating"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i></div>
            <a href=" ">
                <h6>
                {
                    userId &&
                    userId.email
                }
                </h6>
            </a>
            <h4>
            {
                userId &&
                userId.username
            }
            </h4>
        </div>
    </div>)
}
