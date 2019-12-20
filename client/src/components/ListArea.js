import React, { Component } from 'react';
import OverViewAreaBox from './OverViewAreaBox'

export default class ListArea extends Component {
    render() {
        return (
            <section class="latest_blog_area section_gap">
                <div class="container">
                    <div class="section_title text-center">
                        <h2 class="title_color">Khu Vực Phổ Biến</h2>
                    </div>
                    <div class="row mb_30">
                        <OverViewAreaBox />
                        <OverViewAreaBox />
                        <OverViewAreaBox />
                    </div>
                </div>
            </section>
        );
    }
}
