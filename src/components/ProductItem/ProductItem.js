import React, { Component } from 'react';


class ProductItem extends Component {
    render() {
        var {product,index}=this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{product.name}</td>
                <td>{this.formatNumber(product.price,'.','.')}</td>
                <td>{product.description}</td>
                <td><button
                    className='btn btn-success btn-sm '
                    onClick={()=>this.props.onAddToCart(product,1)}
                > Thêm<span className='ml-2 fa fa-plus-circle text-danger'></span></button></td>
            </tr>

        );
    }
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

export default ProductItem;
