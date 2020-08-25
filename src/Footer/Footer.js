import React from 'react';

 const Footer = () =>{
    return (

<footer className="footer-light">
    <div className="light-layout">
        <div className="container">
            <section className="small-section border-section border-top-0">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="subscribe">
                            <div>
                                <h4>KNOW IT ALL FIRST!</h4>
                                <p>from Hubert</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form action="https://pixelstrap.us19.list-manage.com/subscribe/post?u=5a128856334b598b395f1fc9b&amp;id=082f74cbda" className="form-inline subscribe-form auth-form needs-validation" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                              target="_blank">
                            <div className="form-group mx-sm-3">
                                <input type="text" className="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter your email" required="required" />
                            </div>
                            <button type="submit" className="btn btn-solid" id="mc-submit">subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <section className="section-b-space light-layout">
        <div className="container">
            <div className="row footer-theme partition-f">
                <div className="col-lg-4 col-md-6">
                    <div className="footer-title footer-mobile-title">
                        <h4>about</h4>
                    </div>
                    <div className="footer-contant">
                    <div class="brand-logo">
                            <a href=" "><img src="/assets/images/icon/Logo_new.png" className="img-fluid blur-up lazyloaded" alt="" style={{width:"180px"}}/></a>
                        </div>
                        <p>Hubert is a full stack javascript developer, the preference front end technology include pure React with hooks, react bootstrap. API tech related with graphQL, RESTFul API, built in ExpressJs. backend with node, express and lots of different node package. database using mongo and redis</p>
                        <div className="footer-social">
                            <ul>
                                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-rss" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col offset-xl-1">
                    <div className="sub-title">
                        <div className="footer-title">
                            <h4>my account</h4>
                        </div>
                        <div className="footer-contant">
                            <ul>
                                <li><a href="#">profile</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="sub-title">
                        <div className="footer-title">
                            <h4>why we choose</h4>
                        </div>
                        <div className="footer-contant">
                            <ul>
                                <li><a href="#">About Me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="sub-title">
                        <div className="footer-title">
                            <h4>store information</h4>
                        </div>
                        <div className="footer-contant">
                            <ul className="contact-list">
                                <li><i className="fa fa-map-marker"></i>Toronto</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <div className="sub-footer">
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="footer-end">
                        <p><i className="fa fa-copyright" aria-hidden="true"></i> this full stack javascript project built in 2020 </p>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="payment-card-bottom">
                        <ul>
                            <li>
                                <a href="#"><img src="../assets/images/icon/visa.png" alt=""/></a>
                            </li>
                            <li>
                                <a href="#"><img src="../assets/images/icon/mastercard.png" alt=""/></a>
                            </li>
                            <li>
                                <a href="#"><img src="../assets/images/icon/paypal.png" alt=""/></a>
                            </li>
                            <li>
                                <a href="#"><img src="../assets/images/icon/american-express.png" alt=""/></a>
                            </li>
                            <li>
                                <a href="#"><img src="../assets/images/icon/discover.png" alt=""/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
    )
}
export default Footer