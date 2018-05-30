import React, { Component } from 'react';


class Setting extends Component {
    constructor(props) {
        super(props);
        this.state={
            totalTable:5,
            name:'Quán Ăn'
        }
    }
    componentDidMount(){
            var name=JSON.parse(localStorage.getItem("NAME"));
            var totalTable=JSON.parse(localStorage.getItem("TOTALTABLE"));
            this.setState({
                totalTable,
                name
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
    onSave=()=>{
      var {name,totalTable}=this.state;
      var arr=[];
      var task=[];
      if(confirm('Việc thay đổi số bàn sẽ làm những hóa đơn đang thanh toán hiện tại mất đi.Bạn có đồng ý?')) {//eslint-disable-line
          if (totalTable > 4) {
              localStorage.setItem("NAME", JSON.stringify(name));
              localStorage.setItem("TOTALTABLE", JSON.stringify(totalTable));
              for (var i=0;i<totalTable;i++){
                  arr.push(task);
              }
              localStorage.setItem("CART",JSON.stringify(arr));
              alert('Thay đổi thành công');
          } else {
              alert('Vui lòng nhập số bàn lớn hơn 4')
          }
      }

    };

    render() {
        var {name,totalTable}=this.state;
        return (
            <div className='container'>
                    <h2 className='text-center mt-5 text-black-50'>CÀI ĐẶT THÔNG TIN QUÁN ĂN</h2>
                <div className="card mt-5">
                    <div className="card-header bg-primary">
                       Cài đặt:
                    </div>
                    <div className="card-block">
                        <div className="form-group mt-2 ml-2 mr-2">
                            <label>Tên quán  ăn:</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Tên nhà hàng"
                                   onChange={this.onChange}
                                   value={name}
                                   name='name'
                                   required/>

                        </div>
                        <div className='form-group ml-2 mr-2'>
                            <label>Số lượng bàn:</label>
                            <input type="number"
                                   className="form-control"
                                   placeholder="Số lượng bàn"
                                   onChange={this.onChange}
                                   value={totalTable}
                                   name='totalTable'
                                   required/>
                        </div>
                        <div className='form-group ml-2 mr-2'>

                        </div>
                        <div className="text-center mb-2">
                            <button type="button"
                                    className="btn btn-danger"
                                    onClick={this.onSave}
                            ><i className="fa  fa-user-circle mr-2"></i>Đồng ý</button>
                        </div>
                    </div>


                </div>

            </div>

        );
    }
}

export default Setting;
