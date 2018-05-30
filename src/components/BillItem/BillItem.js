import React, { Component } from 'react';

class BillList extends Component {
    onDelete=(id)=>{
        this.props.onDelete(id);
    };
    onUpdate=(id,value)=>{
        this.props.onUpdate(id,value);
    };
    render() {
        var {food,index}=this.props;
        return (

            <tr key={index}>
                <td>{index+1}</td>
                <td>{food.name}</td>
                <td>{this.formatNumber(food.price,'.',',')}</td>
                <td className="center-on-small-only">
                    <span className="qty">{food.quantity} </span>
                    <div className="btn-group radio-group" data-toggle="buttons">
                        <label className="btn btn-sm btn-primary
                                                btn-rounded waves-effect waves-light"
                               onClick={()=>this.onUpdate(food.id,-1)}
                        >
                            <a>—</a>
                        </label>
                        <label className="btn btn-sm btn-secondary
                                                btn-rounded waves-effect waves-light"
                               onClick={()=>this.onUpdate(food.id,1)}
                        >
                            <a>+</a>
                        </label>
                    </div>
                </td>
                <td>{this.formatNumber(food.price*food.quantity,'.',',')}</td>
                <td>
                    <button type="button"
                            className="btn btn-sm btn-danger waves-effect waves-light"
                            data-toggle="tooltip" data-placement="top"
                            title="" data-original-title="Remove item"
                            onClick={()=>this.onDelete(food.id)}
                    >
                        X
                    </button>
                </td>
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

export default BillList;
