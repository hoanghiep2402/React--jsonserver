import React, { Component } from 'react';
import apiCaller from "../../ultils/apiCaller";


class ProductItemEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            id:0,
            name:'',
            price:0,
            description:''
        }
    }
    componentDidMount(){
        var {match}=this.props;
        apiCaller(`products/${match.params.id}`,"GET",null).then(res=>{
            if (res.status===200) {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    price: res.data.price,
                    description: res.data.description
                })
            }else {
                alert('Lỗi khi lấy dữ liệu!')
            }
        })
    }
    onChange=(e)=>{
      var target=e.target;
      var name=target.name;
      var value=target.value;
      this.setState({
          [name]:value
      })
    };
    onUpdate=(e)=>{
        e.preventDefault();
        var {history}=this.props;
        var {id,name,price,description}=this.state;
        if (!price<=0) {
            apiCaller(`products/${id}`, "PUT", {
                id,
                name,
                price,
                description
            }).then(res=>{
                if (res.status===200){
                    history.goBack();
                }
            })
        }else {
            alert('Vui lòng nhập giá lớn hơn 0');
        }
    };
    onExit=(e)=>{
      e.preventDefault();
      var  {history}=this.props;
      history.goBack();
    };
    render() {
        var {name,price,description}=this.state;
        return (
            <div className='container mt-5'>
            <div className="card">
                <div className="card-header bg-primary">
                    Sửa sản phẩm
                    <span
                        className='float-lg-right fa fa-times-circle-o text-danger '
                        id='curso'
                        onClick={this.onExit}
                    ></span>
                </div>
                <div className="card-block">
                    <div className="form-group mt-2 ml-2 mr-2">
                        <label>Tên món ăn:</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Tên món"
                               name='name'
                               value={name}
                               onChange={this.onChange}
                               required/>

                    </div>
                    <div className='form-group ml-2 mr-2'>
                        <label>Giá:</label>
                        <input type="number"
                               className="form-control"
                               placeholder="Giá"
                               name='price'
                               value={price}
                               onChange={this.onChange}
                               required/>
                    </div>
                    <div className='form-group ml-2 mr-2'>
                        <label>Mô tả:</label>
                        <textarea
                            className='form-control'
                            name='description'
                            value={description}
                            onChange={this.onChange}
                        >

                                </textarea>
                    </div>
                    <div className="text-center mb-2">
                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={this.onUpdate}
                        ><i className="fa fa-wrench mr-2"></i>Sửa</button>
                        &nbsp;
                        <button type="button"
                                className="btn btn-danger"
                                onClick={this.onExit}
                        ><i className="fa fa-times-circle-o mr-2"></i>Hủy Bỏ</button>
                    </div>
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

export default ProductItemEdit;
