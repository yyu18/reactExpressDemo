import React,{ useMemo,useReducer,useState } from 'react';
import {openSearch,closeSearch,openNav,closeNav} from './MenuFunctionController';
import {Login} from './Login';
import { Button } from 'react-bootstrap';
import {Register} from './Register';
import {FormContext} from '../../../context';
import reducer from '../../reducer';
import {Profile} from './profile';
import Cookies from 'js-cookie';
import {  useHistory  } from 'react-router-dom'

const domain = '192.168.2.24'
const logoutURI = 'http://192.168.2.24:4000/users-status'

const Header=(props)=>{
    const history = useHistory();
    const [RegisterFormInfo,setRegisterForm] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [UserInfo, DispatchUser]  = useReducer(reducer,{});
    //useCallback example
    /*const UserInfoChange = useCallback(
        (event)=>
        {
            console.log(event.currentTarget.value)
            DispatchUserInfo({
                type:'changeUserInfo',
                payload:event.currentTarget
            })
        },[DispatchUserInfo]
    )*/
    
    const logout = async ()=>{
        const response = await fetch(logoutURI+'/'+Cookies.get('email'), {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Cookies.get('refreshToken')
            }
          })
    
        let data = await response.json();
        if(!data.error) {
            Cookies.remove('userId',{domain:domain});
            Cookies.remove('email',{domain:domain});
            Cookies.remove('accessToken',{domain:domain});
            Cookies.remove('refreshToken',{domain:domain});
            DispatchUser({type:'login',payload:{}});
            setRegisterForm({
                username:'',
                email:'',
                password:'',
                confirmPassword:''
            })
            history.push('/order-system')
        }
    }

    const value = useMemo(()=> {
        return {
            RegisterFormInfo:RegisterFormInfo,
            setRegisterForm:setRegisterForm,
            UserInfo:UserInfo,
            dispatch:DispatchUser
        }
        },[UserInfo,RegisterFormInfo,setRegisterForm,DispatchUser])
  
    let token = Cookies.get('refreshToken');

    return( 
        <header>
            <div className="mobile-fix-option"></div>
            <div className="top-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="header-contact">
                        <ul>
                            <li>Welcome to Hubert's Order System Demo</li>
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Call Us: 123 - 456 - 7890</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 text-right">
                  
                        {
                            token ? 
                            <ul className="header-dropdown">
                            <li className="mobile-wishlist"><a href=" ">1<i className="fa fa-heart" aria-hidden="true"></i></a></li>
                            <li className="onhover-dropdown mobile-account"> <i className="fa fa-user" aria-hidden="true"></i> My Account
                            <ul className="onhover-show-div">
                                <FormContext.Provider value = {value}>
                                        <li> 
                                            <Profile />
                                        </li>
                                        <li>    
                                            <Button variant="primary" onClick={logout}>
                                                Logout
                                            </Button>
                                        </li>
                                </FormContext.Provider>
                            </ul>
                            </li>
                            </ul>
                            :
                            <ul className="header-dropdown">
                                <FormContext.Provider value = {value}>
                                    <li><Login /></li>
                                    <li><Register /></li>
                                </FormContext.Provider>
                        </ul>
                        }
                </div>
            </div>
        </div>
    </div>

    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <div className="main-menu">
                    <div className="menu-left">
                        <div className="navbar">
                            <a href=" " onClick={openNav}>
                                <div className="bar-style"><i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
                            </a>
                            <div id="mySidenav" className="sidenav">
                                <a href=" " className="sidebar-overlay" onClick={closeNav}> </a>
                                <nav>
                                    <div onClick={closeNav}>
                                        <div className="sidebar-back text-left"><i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back</div>
                                    </div>
                                    <ul id="sub-menu" className="sm pixelstrap sm-vertical">
                                        <li> <a href=" ">clothing</a>
                                            <ul className="mega-menu clothing-menu">
                                                <li>
                                                    <div className="row m-0">
                                                        <div className="col-xl-4">
                                                            <div className="link-section">
                                                                <h5>women's fashion</h5>
                                                                <ul>
                                                                    <li><a href=" ">dresses</a></li>
                                                                    <li><a href=" ">skirts</a></li>
                                                                    <li><a href=" ">westarn wear</a></li>
                                                                    <li><a href=" ">ethic wear</a></li>
                                                                    <li><a href=" ">sport wear</a></li>
                                                                </ul>
                                                                <h5>men's fashion</h5>
                                                                <ul>
                                                                    <li><a href=" ">sports wear</a></li>
                                                                    <li><a href=" ">western wear</a></li>
                                                                    <li><a href=" ">ethic wear</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4">
                                                            <div className="link-section">
                                                                <h5>accessories</h5>
                                                                <ul>
                                                                    <li><a href=" ">fashion jewellery</a></li>
                                                                    <li><a href=" ">caps and hats</a></li>
                                                                    <li><a href=" ">precious jewellery</a></li>
                                                                    <li><a href=" ">necklaces</a></li>
                                                                    <li><a href=" ">earrings</a></li>
                                                                    <li><a href=" ">wrist wear</a></li>
                                                                    <li><a href=" ">ties</a></li>
                                                                    <li><a href=" ">cufflinks</a></li>
                                                                    <li><a href=" ">pockets squares</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4">
                                                            <a href=" " className="mega-menu-banner"><img src="../assets/images/mega-menu/fashion.jpg" alt="" className="img-fluid blur-up lazyload" /></a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li> <a href=" ">bags</a>
                                            <ul>
                                                <li><a href=" ">shopper bags</a></li>
                                                <li><a href=" ">laptop bags</a></li>
                                                <li><a href=" ">clutches</a></li>
                                                <li> <a href=" ">purses</a>
                                                    <ul>
                                                        <li><a href=" ">purses</a></li>
                                                        <li><a href=" ">wallets</a></li>
                                                        <li><a href=" ">leathers</a></li>
                                                        <li><a href=" ">satchels</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li> <a href=" ">footwear</a>
                                            <ul>
                                                <li><a href=" ">sport shoes</a></li>
                                                <li><a href=" ">formal shoes</a></li>
                                                <li><a href=" ">casual shoes</a></li>
                                            </ul>
                                        </li>
                                        <li><a href=" ">watches</a></li>
                                        <li> <a href=" ">Accessories</a>
                                            <ul>
                                                <li><a href=" ">fashion jewellery</a></li>
                                                <li><a href=" ">caps and hats</a></li>
                                                <li><a href=" ">precious jewellery</a></li>
                                                <li> <a href=" ">more..</a>
                                                    <ul>
                                                        <li><a href=" ">necklaces</a></li>
                                                        <li><a href=" ">earrings</a></li>
                                                        <li><a href=" ">wrist wear</a></li>
                                                        <li> <a href=" ">accessories</a>
                                                            <ul>
                                                                <li><a href=" ">ties</a></li>
                                                                <li><a href=" ">cufflinks</a></li>
                                                                <li><a href=" ">pockets squares</a></li>
                                                                <li><a href=" ">helmets</a></li>
                                                                <li><a href=" ">scarves</a></li>
                                                                <li> <a href=" ">more...</a>
                                                                    <ul>
                                                                        <li><a href=" ">accessory gift sets</a></li>
                                                                        <li><a href=" ">travel accessories</a></li>
                                                                        <li><a href=" ">phone cases</a></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><a href=" ">belts & more</a></li>
                                                        <li><a href=" ">wearable</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href=" ">house of design</a></li>
                                        <li> <a href=" ">beauty & personal care</a>
                                            <ul>
                                                <li><a href=" ">makeup</a></li>
                                                <li><a href=" ">skincare</a></li>
                                                <li><a href=" ">premium beaty</a></li>
                                                <li> <a href=" ">more</a>
                                                    <ul>
                                                        <li><a href=" ">fragrances</a></li>
                                                        <li><a href=" ">luxury beauty</a></li>
                                                        <li><a href=" ">hair care</a></li>
                                                        <li><a href=" ">tools & brushes</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href=" ">home & decor</a></li>
                                        <li><a href=" ">kitchen</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="menu-right pull-right">
                        <div>
                            <nav id="main-nav">
                                <div className="toggle-nav"><i className="fa fa-bars sidebar-bar"></i></div>
                                <ul id="main-menu" className="sm pixelstrap sm-horizontal">
                                    <li>
                                        <div className="mobile-back text-right">Back<i className="fa fa-angle-right pl-2" aria-hidden="true"></i></div>
                                    </li>


                                    <li>
                                        <a href=" ">Home</a>
                                        <ul>
                                            <li>
                                                <a href=" ">clothing</a>
                                                <ul>
                                                    <li><a target="_blank" href="index.html">fashion 1</a></li>
                                                    <li><a target="_blank" href="fashion-2.html">fashion 2</a></li>
                                                </ul>
                                            </li>
                                            <li><a target="_blank" href="shoes.html">shoes</a></li>
                                            <li>
                                                <a href=" ">electronics</a>
                                                <ul>
                                                    <li><a target="_blank" href="electronic-1.html">electronic 1</a></li>
                                                </ul>
                                            </li>
                                            <li><a target="_blank" href="bags.html">bags</a></li>
                                        </ul>
                                    </li>


                                    <li>
                                        <a href=" ">shop</a>
                                        <ul>
                                            <li><a href="category-page.html">left sidebar</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href=" ">product</a>
                                        <ul>
                                            <li>
                                                <a href=" ">sidebar</a>
                                                <ul>
                                                    <li><a href="product-page.html">left sidebar</a></li>
                                                    <li><a href="product-page(no-sidebar).html">no sidebar</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href=" ">thumbnail image</a>
                                                <ul>
                                                    <li><a href="product-page(right-image).html">right image</a></li>
                                                    <li><a href="product-page(image-outside).html">image outside <span className="new-tag">new</span></a></li>
                                                </ul>
                                            </li>
                                            <li><a href="product-page(4-image).html">4 image <span className="new-tag">new</span></a></li>
                                        </ul>
                                    </li>


                                    <li className="mega" id="hover-cls"><a href=" ">features
                                        <div className="lable-nav">new</div>
                                    </a>
                                        <ul className="mega-menu full-mega-menu">
                                            <li>
                                                <div className="container">
                                                    <div className="row">

                                                        <div className="col mega-box">
                                                            <div className="link-section">
                                                                <div className="menu-title">
                                                                    <h5>theme elements</h5></div>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li><a href="element-image-ratio.html">image size <i className="fa fa-bolt icon-trend" aria-hidden="true"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
     
                                                        <div className="col mega-box">
                                                            <div className="link-section">
                                                                <div className="menu-title">
                                                                    <h5>email template   </h5></div>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li><a href="email-order-success.html">order success</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>

                                    <li><a href=" ">pages</a>
                                        <ul>
                                            <li>
                                                <a href=" ">account</a>
                                                <ul>
                                                    <li><a href="wishlist.html">wishlist</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="about-page.html">about us</a></li>

                                            <li>
                                                <a href=" ">compare</a>
                                                <ul>
                                                    <li><a href="compare.html">compare</a></li>
                                                    <li><a href="compare-2.html">compare-2 <span className="new-tag">new</span></a></li>
                                                </ul>
                                            </li>
                                            <li><a href="lookbook.html">lookbook</a></li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href=" ">blog</a>
                                        <ul>
                                            <li><a href="blog-page.html">left sidebar</a></li>
                                        </ul>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                        <div>
                            <div className="icon-nav">
                                <ul>
                                    <li className="onhover-div mobile-search">
                                        <div><img src="/assets/images/icon/search.png" onClick={openSearch} className="img-fluid blur-up lazyload" alt="" /> <i className="ti-search" onClick={openSearch}></i></div>
                                        <div id="search-overlay" className="search-overlay">
                                            <div> <span className="closebtn" onClick={closeSearch} title="Close Overlay">×</span>
                                                <div className="overlay-content">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <form>
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search a Product" />
                                                                    </div>
                                                                    <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="onhover-div mobile-setting">
                                        <div><img src="../assets/images/icon/setting.png" className="img-fluid blur-up lazyload" alt=""/> <i className="ti-settings"></i></div>
                                        <div className="show-div setting">
                                            <h6>language</h6>
                                            <ul>
                                                <li><a href=" ">english</a></li>
                                                <li><a href=" ">french</a></li>
                                            </ul>
                                            <h6>currency</h6>
                                            <ul className="list-inline">
                                                <li><a href=" ">euro</a></li>
                                                <li><a href=" ">rupees</a></li>
                                                <li><a href=" ">pound</a></li>
                                                <li><a href=" ">doller</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="onhover-div mobile-cart">
                                        <div><img src="../assets/images/icon/cart.png" className="img-fluid blur-up lazyload" alt=""/> <i className="ti-shopping-cart"></i></div>
                                        <ul className="show-div shopping-cart">
                                            <li>
                                                <div className="media">
                                                    <a href=" "><img alt="" className="mr-3" src="../assets/images/fashion/product/1.jpg"/></a>
                                                    <div className="media-body">
                                                        <a href=" ">
                                                            <h4>item name</h4>
                                                        </a>
                                                        <h4><span>1 x $ 299.00</span></h4>
                                                    </div>
                                                </div>
                                                <div className="close-circle"><a href=" "> <i className="fa fa-times" aria-hidden="true"></i></a></div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <a href=" "><img alt="" className="mr-3" src="../assets/images/fashion/product/2.jpg"/></a>
                                                    <div className="media-body">
                                                        <a href=" ">
                                                            <h4>item name</h4>
                                                        </a>
                                                        <h4><span>1 x $ 299.00</span></h4>
                                                    </div>
                                                </div>
                                                <div className="close-circle"><a href=" "> <i className="fa fa-times" aria-hidden="true"></i></a></div>
                                            </li>
                                            <li>
                                                <div className="total">
                                                    <h5>subtotal : <span>$299.00</span></h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="buttons"><a href="cart.html" className="view-cart">view cart</a> <a href=" " className="checkout">checkout</a></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </header>
    )
}

export default Header;