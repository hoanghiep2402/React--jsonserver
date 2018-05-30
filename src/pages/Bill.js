import React, { Component } from 'react';
import PaymentResult from '../components/Payment/PaymentResult'
import PaymentBillList from '../components/Payment/PaymentBillList';
import PaymentItem from "../components/Payment/PaymentItem";
import apiCaller from "../ultils/apiCaller";


class Bill extends Component {
    constructor(props) {
        super(props);
        var d=new Date();
        this.state={
            bills:[],
            update:false,
            billsOfDay :`bill${d.getDate()}${d.getMonth()+1}${d.getFullYear()}`
        }
    }

     componentDidMount(){
        var {billsOfDay}=this.state;
         apiCaller(billsOfDay,"GET",null).then(res=>{
             if (res.status===200){
                 this.setState({
                     bills:res.data
                 })
             }
         });
    }
    componentDidUpdate(){
        var {billsOfDay,update}=this.state;
        if (update){
            apiCaller(billsOfDay,"GET",null).then(res=>{
                if (res.status===200){
                    this.setState({
                        bills:res.data,
                        update:false
                    })
                }
            });
        }

    }

    onChange=(billsOfDay)=>{
        console.log(billsOfDay);
        this.setState({
            update:true,
            billsOfDay:billsOfDay
        })
    };

    render() {
        var {bills}=this.state;
        var totalDay=this.total(bills);
        return (
            <div className='container'>
                <h3 className='text-center text-danger mt-5'>DANH SÁCH HÓA ĐƠN</h3>

                <PaymentBillList
                    onChange={this.onChange}
                >
                    {bills?this.showPaymentBill(bills):<tr><td>Chưa có hóa đơn</td></tr>}
                </PaymentBillList>


                <PaymentResult totalDay={totalDay}/>

            </div>

        );
    }
    showPaymentBill=(bills)=>{
        var {billsOfDay}=this.state;
        var result=<tr><td>Chưa có hóa đơn ngày này</td></tr>;
            if (bills.length>0){
               result= bills.map((bill,i)=>{
                    return <PaymentItem
                        key={i}
                        index={i}
                        bill={bill}
                        billsOfDay={billsOfDay}
                    />
                })
            }
        return result;
    };
    total=(bills)=>{
        var res=0;
        if (bills.length>0){
           bills.forEach((bill)=>{
               return res+=(bill.total-bill.discount);
           })
        }
        return res;
    }
}

export default Bill;
