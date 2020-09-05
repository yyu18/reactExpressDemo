import React,{ useMemo,useReducer,useState } from 'react';
import {openSearch,closeSearch,openNav,closeNav} from './MenuFunctionController';
import {Login} from './Login';
import { Button } from 'react-bootstrap';
import {Register} from './Register';
import {FormContext} from '../../../context';
import reducer from '../../reducer';
import {Profile} from './profile';
import Cookies from 'js-cookie';
import {  useHistory,Link  } from 'react-router-dom'

const domain = 'localhost'
const logoutURI = 'http://localhost:4000/users-status'
const homepage = '/'
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
            history.push(homepage)
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
                        <Link to='/'>
                        <ul>
                            <li>Welcome to Hubert's Order System Demo</li>
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Call Us: 123 - 456 - 7890</li>
                        </ul>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6 text-right">
                    <ul className="header-dropdown">
                        <FormContext.Provider value = {value}>
                        {
                        token ? 
                            <>
                                <li className="mobile-wishlist"><a href=" ">1<i className="fa fa-heart" aria-hidden="true"></i></a></li>
                                <li className="onhover-dropdown mobile-account"> <i className="fa fa-user" aria-hidden="true"></i> My Account
                                <ul className="onhover-show-div">
                                    <li> 
                                        <Profile />
                                    </li>
                                    <li>    
                                        <Button variant="primary" onClick={logout}>
                                            Logout
                                        </Button>
                                    </li>
                                    </ul>
                                    </li>
                                    </>
                            :
                            <li className="onhover-dropdown mobile-account"> <i className="fa fa-user" aria-hidden="true"></i> My Account
                                <ul className="onhover-show-div">
                                    <li><Login /></li>
                                    <li><Register /></li>
                                </ul>
                            </li>
                        }
                            </FormContext.Provider>
                    </ul>                 
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
                            <a onClick={openNav}>
                                <div className="bar-style"><i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
                            </a>
                            <div id="mySidenav" className="sidenav">
                                <a className="sidebar-overlay" onClick={closeNav}> </a>
                                <nav>
                                    <div onClick={closeNav}>
                                        <div className="sidebar-back text-left"><i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back</div>
                                    </div>
                                    <ul id="sub-menu" className="sm pixelstrap sm-vertical">

                                        <li> <a href=" ">demo</a>
                                            <ul>
                                                <li><a href=" ">demo</a></li>
                                            
                                            </ul>
                                        </li>
                                        <li><a href=" ">demo</a></li>
                                
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <Link to='/'>
                            <div className="brand-logo">
                                <img src="/assets/images/icon/Logo_new.png" className="img-fluid blur-up lazyloaded" alt="" style={{width:"180px"}}/>
                            </div>
                        </Link>
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
                                        <a href=" ">demo</a>
                                        <ul>
                                            <li>
                                                <a href=" ">demo</a>
                                                <ul>
                                                    <li><a target="_blank" href="index.html">demo</a></li>
                                                </ul>
                                            </li>
                                
                                            <li>
                                                <a href=" ">demo</a>
                                                <ul>
                                                    <li><a target="_blank" href="electronic-1.html">demo</a></li>
                                                </ul>
                                            </li>
                                            <li><a target="_blank" href="bags.html">demo</a></li>
                                        </ul>
                                    </li>

                                    <li className="mega" id="hover-cls"><a href=" ">demo
                                        <div className="lable-nav">new</div>
                                    </a>
                                        <ul className="mega-menu full-mega-menu">
                                            <li>
                                                <div className="container">
                                                    <div className="row">

                                                        <div className="col mega-box">
                                                            <div className="link-section">
                                                                <div className="menu-title">
                                                                    <h5>demo</h5></div>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li><a href="element-image-ratio.html">demo<i className="fa fa-bolt icon-trend" aria-hidden="true"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
     
                                                        <div className="col mega-box">
                                                            <div className="link-section">
                                                                <div className="menu-title">
                                                                    <h5>demo</h5></div>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li><a href="email-order-success.html">demo</a></li>
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
                                        <div><img src="/assets/images/icon/setting.png" className="img-fluid blur-up lazyload" alt=""/> <i className="ti-settings"></i></div>
                                        <div className="show-div setting">
                                            
                                                <h6>Language</h6>
                                                <ul className="list-inline">
                                                    <li>English</li>
                                                    <li>Chinese</li>
                                                </ul>
                                                <h6>Theme</h6>
                                                <ul className="list-inline">
                                                    <li>Dark</li>
                                                    <li>White</li>
                                                </ul>
                                           
   
                                        </div>
                                    </li>
                                    <li className="onhover-div mobile-cart">
                                        <div><img src="/assets/images/icon/cart.png" className="img-fluid blur-up lazyload" alt=""/> <i className="ti-shopping-cart"></i></div>
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
                                        </ul>  <ul className="show-div shopping-cart">
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
                                    <li className="onhover-div mobile-cart">
                                        <div><img src="/assets/images/icon/users.png" className="img-fluid blur-up lazyload" alt=""/> <i className="ti-shopping-cart"></i></div>
                                        
                                        <ul className="show-div shopping-cart">
                                            
                                            <li>
                                                <div className="media" >
                                                    <a href=" "><img alt="" className="mr-3" src="../assets/images/pro3/default-user-image.png"/></a>
                                                    <div className="media-body">
                                                        <a href=" ">
                                                            <h4>Hubert</h4>
                                                        </a>
                                                        <h4><span>Software Eng</span></h4>
                                                    </div>
                                                </div>
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