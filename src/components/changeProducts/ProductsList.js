import React, { Component } from 'react';


class ProductsList extends Component {
    render() {
        return (
            <table className='table mt-3' border="1">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Món ăn</th>
                    <th className="text-center">Giá</th>
                    <th className="text-center">Mô tả</th>
                    <th className="text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td><input type='text' className='input-group' placeholder='Tìm Kiếm'/></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                {this.props.children}
                </tbody>
            </table>

        );
    }
}

export default ProductsList;
