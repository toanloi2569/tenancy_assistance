import React, { Component } from 'react';

export default class OverViewAreaBox extends Component {
    render() {
        return (
            <div class="col-lg-4 col-md-6">
                <div class="single-recent-blog-post border">
                    <div class="thumb">
                        <img class="img-fluid" src="image/area-1.jpg" alt="post" />
                    </div>
                    <div class="details text-center" style={{paddingTop:"5px"}}>
                        <a href="/"><h4 class="sec_h4"> Khu vuc Hai Ba Trung</h4></a>
                    </div>  
                </div>
            </div>
        );
    }
}