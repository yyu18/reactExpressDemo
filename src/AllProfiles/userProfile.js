import React from 'react';
const userProfile = ()=>{
    return (                   
    <div class="product-box">
        <div class="img-wrapper">
            <div class="front">
                <img src="/assets/images/pro3/default-user-image.png" class="img-fluid blur-up lazyload bg-img" alt=""/>
            </div>
            <div class="back">
                <img src="/assets/images/pro3/default-user-image.png" class="img-fluid blur-up lazyload bg-img" alt=""/>
            </div>
            <div class="cart-info cart-wrap">

                    <button data-toggle="modal" data-target="#addtocart" title="Message">
                        <i class="ti-comment-alt" ></i>
                    </button> 

                    <a href="javascript:void(0)" title="Likes">
                        <i class="ti-heart" aria-hidden="true"></i>
                    </a>       

                    <a href="#" data-toggle="modal" data-target="#quick-view" title="Thumb Up">
                        <i class="ti-thumb-up" aria-hidden="true"></i>
                    </a> 

                    <a href="compare.html" title="Quick View">
                        <i class="ti-search" aria-hidden="true"></i>
                    </a>
            </div>
        </div>
        <div class="product-detail">
            <div class="rating"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></div>
            <a href="product-page(no-sidebar).html">
                <h6>Software Engineer</h6>
            </a>
            <h4>Hubert</h4>
        </div>
    </div>)
}

export default userProfile