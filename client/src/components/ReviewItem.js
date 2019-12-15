import React, { Component } from 'react';

export default class ReviewItem extends Component {
    render() {
        return (
            <div class="media testimonial_item">
                <img class="rounded-circle" src="image/testtimonial-1.jpg" alt=""/>
                <div class="media-body">
                    <p>As conscious traveling Paupers we must always be concerned about our dear Mother Earth. If you think about it, you travel across her face, and She is the </p>
                    <a href="#"><h4 class="sec_h4">Fanny Spencer</h4></a>
                    <div class="star">
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star-half-o"></i></a>
                    </div>
                </div>
            </div>
                );
            }
        }
