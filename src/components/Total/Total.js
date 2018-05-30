import React, { Component } from 'react';


class Total extends Component {
    constructor(props) {
        super(props);
        this.state={
            total:0,
            discount:0,
            sum:0
        }
    }

    render() {
        var {total,discount}=this.props;
        return (
            <div >
                <div className="card">
                    <div className="card-header bg-success">
                        Tổng tiền
                    </div>
                    <div className="card-block">
                        <h4 className='mt-3 ml-3'>Tổng Tiền:  <span className='float-lg-right'>{this.formatNumber(total,'.',',')}</span></h4>
                        <h4 className='mt-3 ml-3'>Giảm giá: <span className='float-lg-right'>{this.formatNumber(discount,'.',',')}</span></h4>
                        <h4 className='mt-3 ml-3'>Còn lại: <span className='float-lg-right'>{this.formatNumber(total-discount,'.',',')}</span></h4>
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
    }
}

export default Total;
