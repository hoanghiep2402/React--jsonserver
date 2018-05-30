import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PaymentItem extends Component {

    render() {
        var {index,bill,billsOfDay}=this.props;
        console.log(billsOfDay);
        return (
            <tr>
                <td className='text-center'>{index+1}</td>
                <td className='text-center'>{this.formatNumber(bill.total,'.',',')}</td>
                <td className='text-center'>{this.formatNumber(bill.discount,'.',',')}</td>
                <td className='text-center'>{this.formatNumber(bill.total-bill.discount,'.',',')}</td>
                <td className='text-center'>{bill.time}</td>
                <td className='text-center'>{bill.person}</td>
                <td className='text-center'><Link to={`bill/${billsOfDay}/${bill.id}`}
                                               className="btn btn-primary btn-floating "
                >
                    <i className="fa fa-eye">Xem chi tiết</i>
                </Link> </td>

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

export default PaymentItem;
