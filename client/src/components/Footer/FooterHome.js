import React from 'react';
import '../../index.css';

class FooterHome extends React.Component {
    render() {
        return (

            <footer class="page-footer font-small blue pt-4 footer">

                <div class="container-fluid text-center text-md-left">

                    <div class="row">

                        <div class="col-md-6 mt-md-0 mt-3">

                            <h5 class="text-uppercase">Footer Content</h5>
                            <p>Here you can use rows and columns to organize your footer content.</p>

                        </div>


                        <hr class="clearfix w-100 d-md-none pb-3" />


                        <div class="col-md-3 mb-md-0 mb-3">

                            <h5 class="text-uppercase">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>

                            </ul>

                        </div>

                        <div class="col-md-3 mb-md-0 mb-3">


                            <h5 class="text-uppercase">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>
                            </ul>

                        </div>


                    </div>


                </div>



                <div class="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
                </div>


            </footer>


        )
    }
}


export default FooterHome;