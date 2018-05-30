import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '600px'
    }
};

class BillList extends Component {
    constructor(props) {
        super(props);
        this.state={
            tableId:1,
            discount:0,
            modalIsOpen: false,
            totalTable:5
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        var totalTable=parseInt(JSON.parse(localStorage.getItem("TOTALTABLE")));
        this.setState({
           totalTable
        });
    }
    onChange=(e)=>{
     var tableId= parseInt(e.target.value,10);
     this.props.getTableId(tableId);
     this.setState({
         tableId,
         discount:0
     })
    };
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = 'black';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    onChangeDiscount=(e)=>{
        var discount= parseInt(e.target.value,10);
        if (discount>=0){
            this.setState({
                discount
            })
        }

    };
    onSaveDiscount=()=>{
        this.closeModal();
        this.props.onDiscount(parseInt(this.state.discount,10));
    };
    onPayment=()=>{
      if( confirm('Bạn có thực sự muốn thanh toán hóa đơn này?')){//eslint-disable-line
          this.props.onPayment();
      }
    };
    showListTable=()=>{
      var {totalTable}=this.state;
      var res=[];
      for(var i=1;i<=totalTable;i++){
          res.push(i);
      }
       return res;
    };

    render() {
        var arr=this.showListTable();

        return (
            <div>
            <div className="card">
                <div className="card-header bg-success">
                    <span className='text-lg-left text-nowrap'>Thanh Toán</span>
                    <span className='float-lg-right'>
                                  <select
                                      value={this.state.tableId}
                                      className='custom-select'
                                      onChange={this.onChange}>
                                      {/*<option value={1}>Bàn 1</option>*/}
                                      {/*<option value={2}>Bàn 2</option>*/}
                                      {/*<option value={3}>Bàn 3</option>*/}
                                      {/*<option value={4}>Bàn 4</option>*/}
                                      {/*<option value={5}>Bàn 5</option>*/}
                                      {arr.map((item)=>{
                                          return (<option value={item} key={item}>Bàn {item}</option>)
                                      })}
                                  </select>
                              </span>
                </div>
                <div className="card-block">
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Món ăn</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>

                </div>
                <div className="card-footer text-muted">
                    <button
                        type="button"
                        className="btn btn-primary btn-md "
                        onClick={this.onPayment}
                    >
                        Thanh toán
                    </button>

                        <button
                            type='button'
                            className='btn btn-success btn-md ml-3'
                            onClick={this.openModal}
                        >
                           Giảm giá
                        </button>
                </div>


            </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <div className="card">
                        <div className="card-header bg-success">
                            <h4 ref={subtitle => this.subtitle = subtitle}>Giảm giá</h4>
                        </div>
                        <div className="card-block mt-3">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control ml-2 mr-5"
                                    placeholder="Nhập vào giá giảm"
                                    onChange={this.onChangeDiscount}
                                    value={(this.state.discount!==0)?this.state.discount:''}
                                />
                                    
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <button className='btn btn-success'
                                    onClick={this.onSaveDiscount}
                            >Đồng ý</button>
                            <button className='btn btn-warning ml-3' onClick={this.closeModal}>Hủy</button>

                        </div>
                    </div>


                </Modal>

            </div>


        );
    }
}

export default BillList;
