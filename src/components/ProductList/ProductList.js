import React, { Component } from 'react';

class ProductList extends Component {
    onChange=(e)=>{
      var filterName=e.target.value;
      this.props.onFilterName(filterName);
    };
    render() {
        return (
            <div className="card">
                <div className="card-header bg-success">
                    Món ăn
                </div>
                <div className="card-block">
                    <table className='table' >
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Món ăn</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td></td>
                            <td><input
                                type='text'
                                className='input-group'
                                onChange={this.onChange}
                                placeholder='Tìm Kiếm'/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {this.props.children}
                        </tbody>

                    </table>

                </div>

            </div>

        );
    }
}

export default ProductList;
