import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductsListItem extends Component {
    render() {
        var {product,index}=this.props;

        return (

                <tr>
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>{this.formatNumber(product.price,'.',',')}</td>
                    <td>{product.description}</td>
                    <td className="text-center">
                        <Link
                            to={`products/${product.id}/edit`}
                            className="btn btn-warning"
                        >
                            <span className="fa fa-pencil "></span>Sửa
                        </Link>
                        &nbsp;
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={()=>this.onDeleteProduct(product.id)}
                        >
                            <span className="fa fa-trash "></span>Xóa
                        </button>
                    </td>
                </tr>


        );
    }
    onDeleteProduct=(id)=>{
        if (confirm('Bạn có thực sự muốn xóa món này?')) { //eslint-disable-line
            this.props.onDeleteProduct(id);
        }

    };
    formatNumber=(num, dau1, dau2)=>{
        num += '';
        var x = num.split(dau1);
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + dau2 + '$2');
        }
        return x1 + x2;
    }
}

export default ProductsListItem;
