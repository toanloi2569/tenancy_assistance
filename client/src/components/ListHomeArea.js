import React, { Component } from 'react';
import OverViewHomeBox from './OverViewHomeBox'

export default class ListHome extends Component {
    render() {
        return (
            <section class="accomodation_area section_gap bg-warning">
                <div class="container tab-content">
                    <div class="section_title text-center">
                        <h2 class="title_color">Bài đăng mới nhất</h2>
                    </div>
                    <div class="row">
                        <OverViewHomeBox />
                        <OverViewHomeBox />
                        <OverViewHomeBox />
                        <OverViewHomeBox />
                    </div>
                </div>
            </section>
        );
    }
}