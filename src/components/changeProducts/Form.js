import React, { Component } from 'react';


class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            price:'',
            description:''
        }
    }
    onCloseForm=()=>{
        this.props.onCloseForm();
    };
    onChange=(e)=>{
        var target=e.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:value
        })
    };

    onSubmit=(e)=>{
        e.preventDefault();
        if (this.state.price<=0){
            alert('Giá trị của sản phẩm không thể là âm!')
        } else
        this.props.onSubmit(this.state);
    };
    render() {
        return (
            <div className="card">
                <div className="card-header bg-primary">
                    Thêm sản phẩm
                    <span
                        className='float-lg-right fa fa-times-circle-o text-danger '
                        id='curso'
                        onClick={this.onCloseForm}
                    ></span>
                </div>
                <div className="card-block">
                    <div className="form-group mt-2 ml-2 mr-2">
                        <label>Tên món ăn:</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Tên món"
                               value={this.state.name}
                               name='name'
                               onChange={this.onChange}
                               required/>

                    </div>
                    <div className='form-group ml-2 mr-2'>
                        <label>Giá:</label>
                        <input type="number"
                               className="form-control"
                               placeholder="Giá"
                               value={this.state.price}
                               name='price'
                               onChange={this.onChange}
                               required/>
                    </div>
                    <div className='form-group ml-2 mr-2'>
                        <label>Mô tả:</label>
                        <textarea
                            className='form-control'
                            name='description'
                            onChange={this.onChange}
                            value={this.state.description}
                        >

                                </textarea>
                    </div>
                    <div className="text-center mb-2">
                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={this.onSubmit}
                        ><i className="fa fa-plus mr-2"></i>Thêm</button>
                        &nbsp;
                        <button type="button"
                                className="btn btn-danger"
                                onClick={this.onCloseForm}
                        ><i className="fa fa-times-circle-o mr-2"></i>Hủy Bỏ</button>
                    </div>
                </div>


            </div>

        );
    }
}

export default Form;
