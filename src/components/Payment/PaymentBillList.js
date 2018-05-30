import React, { Component } from 'react';

class PaymentBillList extends Component {
    constructor(props) {
        super(props);
        var d=new Date();
        this.state={
            today:`${d.getDate()}${d.getMonth()+1}${d.getFullYear()}`
        };
    }
    onChange=(e)=>{
       var today=e.target.value;
       this.setState({
           today
       });
        this.props.onChange(`bill${today}`);
        console.log(`bill${today}`)
    };

    render() {
        var {today}=this.state;
        return (
            <div className="card mt-5">
                <div className="card-header bg-success ">
                    <h4>Hóa đơn đã thanh toán<span className='float-lg-right'><select
                        className='custom-select-sm'
                        onChange={this.onChange}
                        value={today}
                    >
                            <option  value={2652018}>26/05/2018</option>
                            <option  value={2752018}>27/05/2018</option>
                            <option  value={2852018}>28/05/2018</option>
                            <option  value={2952018}>29/05/2018</option>
                            <option  value={3052018}>30/05/2018</option>
                        </select></span></h4>
                </div>
                <div className="card-block">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Tổng tiền</th>
                            <th className='text-center'>Giảm giá</th>
                            <th className='text-center'>Còn lại</th>
                            <th className='text-center'>Thời gian</th>
                            <th className='text-center'>Người thanh toán</th>
                            <th className='text-center'> Xem chi tiết hóa đơn</th>
                        </tr>
                        </thead>
                        <tbody>
                             {this.props.children}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default PaymentBillList;
