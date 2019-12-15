import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (
            <div class="hotel_booking_area position">
                <div class="container">
                    <div class="hotel_booking_table">
                        <div class="col-md-3">
                            <h2>Tìm Phòng</h2>
                        </div>
                        <div class="col-md-9">
                            <div class="boking_table">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <div class="book_tabel_item">
                                            <div class="form-group">
                                                <label for="sort" class="col-sm-auto control-label"> Thành Phố </label>
                                                <div class='input-group'>
                                                    <select class="wide">
                                                        <option value="" selected>Adult</option>
                                                        <option value="1">Old</option>
                                                        <option value="2">Younger</option>
                                                        <option value="3">Potato</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="sort" class="col-sm-auto control-label"> Quận </label>
                                                <div class='input-group'>
                                                    <select class="wide">
                                                        <option data-display="Adult">Adult</option>
                                                        <option value="1">Old</option>
                                                        <option value="2">Younger</option>
                                                        <option value="3">Potato</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="book_tabel_item">
                                            <div class="form-group">
                                                <label for="sort" class="col-sm-auto control-label"> Giá Phòng</label>
                                                <div class='input-group'>
                                                    <select class="wide">
                                                        <option value="" selected>Adult</option>
                                                        <option value="1">Old</option>
                                                        <option value="2">Younger</option>
                                                        <option value="3">Potato</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="sort" class="col-sm-auto control-label"> Phường</label>
                                                <div class='input-group'>
                                                    <select class="wide">
                                                        <option value="" selected>Adult</option>
                                                        <option value="1">Old</option>
                                                        <option value="2">Younger</option>
                                                        <option value="3">Potato</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <a class="book_now_btn button_hover" href="#">Tìm Kiếm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}