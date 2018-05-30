import React, { Component } from 'react';


class NotFoundPage extends Component {
    render() {
        return (
            <div className='container' >

                <div className="alert alert-warning mt-5" role="alert">
                    <h4 className="alert-heading">404 Không Tìm Thấy Trang</h4>
                    <p>Vui lòng liên hệ 0975545539 (Pass: Bạn Anh Hiệp)</p>
                </div>
            </div>

        );
    }
}

export default NotFoundPage;
