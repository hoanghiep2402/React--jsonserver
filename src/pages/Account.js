import React, { Component } from 'react';
import logo from "../image/devteam.png";

class Account extends Component {
    render() {
        return (
            <div className='justify-content-center align-content-center mt-3 '>
                <h2 className='text-center text-black-50'>Thông tin tài khoản</h2>
                <div className="row">
                    <div className="col-4">
                        <img src={logo} className="img-thumbnail  d-block mt-3" alt="logo"/>
                    </div>
                    <div className="col-8 mt-3">
                        <div className="card mr-2">
                            <div className="card-header bg-success text-center">
                                Thông tin tài khoản
                            </div>
                            <div className="card-block">
                                <p className=' ml-5 mt-3'>Tên: Trần Hoàng Hiệp</p>
                                <p className=' ml-5 mt-3'>Loại tài khoản: Admin</p>
                            </div>
                          
                        </div>
                    </div>
                </div>


            <div className='container mt-5 ' >


            </div>
            </div>
        );
    }
}

export default Account;
