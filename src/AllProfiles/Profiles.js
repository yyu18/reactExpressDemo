import React from 'react';
import Profile from './userProfile'
const Profiles = ()=>{
    return (
    <>
        <section class="section-b-space p-t-0 ratio_asos">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="theme-tab">
                            <div class="tab-content-cls">
                                <div id="tab-4" class="tab-content active default">
                                    <div class="no-slider row">

                                    <Profile />
                                    <Profile />
                                    <Profile />
                                    
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