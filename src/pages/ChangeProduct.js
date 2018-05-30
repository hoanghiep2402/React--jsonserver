import React, { Component } from 'react';
import Form from "../components/changeProducts/Form";
import ProductsList from "../components/changeProducts/ProductsList";
import ProductsListItem from "../components/changeProducts/ProductListItem";
import apiCaller from '.././ultils/apiCaller';
import randomstring from 'randomstring';

class ChangeProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDislayForm:false,
            products:[],
            update:false

        };
    }
    componentDidMount(){
        apiCaller('products','GET',null).then(res=>{
           this.setState({
               products:res.data
           });
        });

    };

    onDeleteProduct=(id)=>{
           var {products}=this.state;
            apiCaller(`products/${id}`,'DELETE',null).then((res)=>{
               if (res.status===200){
                   var index=this.findIndex(products,id);
                   if (index!==-1){
                       this.setState({
                           update:true
                       })
                   }
               }
            });

    };
    componentDidUpdate(){
        var {update}=this.state;
        if (update){
            apiCaller('products','GET',null).then(res=>{
                this.setState({
                    products:res.data
                });
            });
            this.setState({
                update:false
            })
        }

    }

    handleForm=()=>{
        var {isDislayForm}=this.state;
      this.setState({
          isDislayForm:  !isDislayForm
      })
    };
    onCloseForm=()=>{
        this.setState({
            isDislayForm:  false
        })
    };
    onSubmit=(data)=>{
        var task={
            id:randomstring.generate(7),
            name:data.name,
            price:parseInt(data.price,10),
            description:data.description
        };
        apiCaller('products',"POST",task).then(res=>{
            this.setState({
                update:true,
                isDislayForm:false
            })
        })


    };

    render() {

        var {products,isDislayForm}=this.state;
        var eleForm=isDislayForm ? <Form
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
        /> : '';
        return (
            <div className='container-fluid mt-5' >
                    <h3 className='text-danger text-center'>Danh sách sản phẩm</h3>
                <div className='row'>
                    <div className={isDislayForm?'col-3':''}>
                        {eleForm}
                    </div>

                    {/*table*/}

                    <div  className={isDislayForm?'col-9':'col-12'}>
                        <button
                            type='button'
                            className='btn btn-success'
                            onClick={this.handleForm}
                        >Thêm món ăn <i className="fa fa-plus "></i></button>

                        <ProductsList>
                            {this.showProducts(products)}
                        </ProductsList>

                    </div>
                </div>
            </div>


        );
    }
    showProducts=(products)=>{
        var result=null;
        if (products.length>0){
            result=products.map((product,i)=>{
                return <ProductsListItem
                    key={i}
                    index={i}
                    product={product}
                    onDeleteProduct={this.onDeleteProduct}
                />
            })
        }
        return result
    };
    findIndex=(products,id)=>{
        var result=-1;
        products.forEach((product,i)=>{
            if (product.id===id)
                result=i;
        });

        return result;
    }
}

export default ChangeProduct;
