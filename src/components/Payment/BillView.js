import React, { Component } from 'react';
import apiCaller from "../../ultils/apiCaller";
import nl2br from 'react-newline-to-break';

class BillView extends Component {
    constructor(props) {
        super(props);
        this.state={
            bill:[]
        }
    }
    componentDidMount() {
        var {match}=this.props;
        apiCaller(`${match.params.day}/${match.params.id}`, "GET", null).then(res => {
            if (res.status===200){
                this.setState({
                    bill:res.data
                })
            }

        });
    }
    goBack=()=>{
      var {history}=this.props;
        history.goBack(-1);
    };

    render() {
        var {history}=this.props;
        var {bill}=this.state;
        console.log(bill.foods);
        return (
            <div className='container-fluid mt-5'>
                <div className="card ">
                    <div className="card-header bg-success">
                            <h3 className='text-center text-black-50'>Hóa đơn bàn {bill.tableId}</h3>
                    </div>
                    <div className="card-block">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className='text-center'>Món ăn</th>
                                <th className='text-center'>Số lượng</th>
                                <th className='text-center'>Giá</th>
                                <th className='text-center'>Thành tiền</th>
                                <th className='text-center'>Tổng tiền</th>
                                <th className='text-center'>Giảm giá</th>
                                <th className='text-center'>Còn lại</th>
                                <th className='text-center'>Người thanh toán</th>
                                <th className='text-center'>Giờ thanh toán</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>

                                <td className="text-center"> {nl2br(bill.foods?this.printBr(bill.foods,'name'):'')}<br/></td>
                                <td className="text-center">{nl2br(bill.foods?this.printBr(bill.foods,'quantity'):'')}</td>
                                <td className="text-center">{nl2br(bill.foods?this.printBr(bill.foods,'price'):'')}</td>
                                <td className="text-center">{nl2br(bill.foods?this.cashPerFood(bill.foods):'')}</td>
                                <td className="text-center">{this.formatNumber(bill.total,'.',',')}</td>
                                <td className="text-center">{this.formatNumber(bill.discount,'.',',')}</td>
                                <td className="text-center">{this.formatNumber(bill.total-bill.discount,'.',',')}</td>
                                <td className="text-center">{bill.person}</td>
                                <td className="text-center">{bill.time}</td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        <button
                            type='button'
                            className='btn btn-primary float-lg-right'
                            onClick={this.goBack}
                        >Thoát</button>
                    </div>
                </div>
            </div>

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
    };
    printBr=(arr,name)=>{
        var res='';
        if (arr.length>0){
            arr.forEach((x)=>{
                res+=`${x[name]}\n`;
            });
        }
        return res;
    };
    cashPerFood=(arr)=>{
        var res='';
        if (arr.length>0){
            arr.forEach((x)=>{
                res+=`${x.price*x.quantity}\n`;
            })
        }
        return res;
    }
}

export default BillView;
