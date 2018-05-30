import React, { Component } from 'react';


class PaymentResult extends Component {
    render() {
        var {totalDay}=this.props;
        return (
                <h3 className='text-danger mt-4'>Tổng cộng:   {this.formatNumber(totalDay,'.',',')} VNĐ</h3>
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

export default PaymentResult;
