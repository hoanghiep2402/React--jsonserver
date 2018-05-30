import React, { Component } from 'react';
import BillList from "../components/BillList/BillList";
import Total from "../components/Total/Total";
import ProductList from "../components/ProductList/ProductList";
import ProductItem from "../components/ProductItem/ProductItem";
import BillItem from "../components/BillItem/BillItem";
import apiCaller from '../ultils/apiCaller';
import  randomstring from 'randomstring';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            products:[{
                foods:[]
            }],
            billing:[],
            totalTable:5,
            filterName:'',
            tableId:1,
            update:false,
            discount:0
        }
    }

    componentDidMount(){

        apiCaller('products','GET',null).then(res=>{
            this.setState({
                products:res.data,
            });
        });

    };
    componentWillMount(){
        var arr=JSON.parse(localStorage.getItem('CART'));
        if(arr){
            this.setState({
                billing:arr
            })
        }
    }


    onFilterName=(filterName)=>{
       filterName= filterName.toLowerCase();
        this.setState({
            filterName
        })
    };
    onAddToCart=(product,quantity)=>{
            var {billing,tableId}=this.state;
            var index=this.findIndexInFoods(billing[tableId-1],product.id);
            if (index===-1){
                billing[tableId-1].push({
                    id:product.id,
                    name:product.name,
                    price:product.price,
                    quantity
                });
                localStorage.setItem('CART',JSON.stringify(billing));
            }else {
                billing[tableId-1][index].quantity+=1;
                localStorage.setItem('CART',JSON.stringify(billing));
            }
            this.setState({
                billing
            })
    };

    getTableId=(idTable)=>{
        if (idTable>0){
            this.setState({
                tableId:idTable,
                discount:0
            })
        }
    };
    onDelete=(id)=>{
        var {billing,tableId}=this.state;
        var index=this.findIndexInFoods(billing[tableId-1],id);
        if (index!==-1){
            billing[tableId-1].splice(index,1);
        }
        this.setState({
            billing
        });
        localStorage.setItem('CART',JSON.stringify(billing));
    };
    onUpdate=(id,value)=>{
        var {billing,tableId}=this.state;
        var index=this.findIndexInFoods(billing[tableId-1],id);
        if (index!==-1){
            if ( billing[tableId-1][index].quantity===1&&value===-1){
                billing[tableId-1].splice(index,1);
            }else {
                billing[tableId-1][index].quantity+=value
            }
        }
        this.setState({
            billing
        });
        localStorage.setItem('CART',JSON.stringify(billing));
    };
    onDiscount=(discount)=>{
        if (discount<0){
            alert('Vui lòng nhập giá trị giảm không âm!')
        } else {
            this.setState({
                discount
            })
        }
    };
    onPayment=()=>{
        var day=new Date();
        var str=`bill${day.getDate()}${day.getMonth()+1}${day.getFullYear()}`;
        var {discount,tableId,billing}=this.state;
        var total =this.getTotal(billing[tableId-1]);
        var payment=total-discount;
        var id=randomstring.generate(9);
        var d= new Date();
        var time=`${d.getHours()}:${d.getMinutes()}`;

        console.log(billing[tableId-1]);
        if (!billing[tableId-1]){
            alert('Trong hóa đơn chưa có gì để thanh toán!');
        } else {
            var foods=billing[tableId-1].slice();
            billing[tableId-1].splice(0,100);
            var bill={
                id,
                total,
                discount,
                foods,
                person:'Admin',
                time,
                tableId
            };
            apiCaller(str,"POST",bill).then(res=>{
                if (res.status===201){
                    this.setState({
                        billing,
                        discount:0
                    });
                    localStorage.setItem("CART",JSON.stringify(billing));
                    alert('Thanh toán thành công');
                }else {
                    alert('Lỗi khi thanh toán');
                }
            })
        }

    };

    render() {
        var {products,filterName,tableId,billing}=this.state;
        if (filterName){
             products=products.filter((product)=>{
               return product.name.toLowerCase().indexOf(filterName)!==-1;
            });
        }

        var foodId=billing[tableId-1];
        var total=this.getTotal(billing[tableId-1]);
        var {discount}=this.state;
        return (
            <div className='container-fluid mt-4'>
                <div className="row">
                    <div className='col-9 h-50'>

                        <BillList
                            getTableId={this.getTableId}
                            onDiscount={this.onDiscount}
                            onPayment={this.onPayment}
                        >
                            {foodId?this.showBillList(foodId):<tr><td>Chưa có món ăn nào</td></tr>}
                        </BillList>
                    </div>

                    <div className='col-3'>
                        <Total total={total} discount={discount}/>

                    </div>

                    <div className='col-12 mt-5'>
                        <ProductList
                            onFilterName={this.onFilterName}
                        >
                            {this.showProducts(products)}
                        </ProductList>
                    </div>
                </div>

            </div>

        );
    }
    showProducts=(products)=>{
        var result=null;
            if (products.length>0){
                result=products.map((product,i)=>{
                    return <ProductItem
                        key={i}
                        index={i}
                        product={product}
                        onAddToCart={this.onAddToCart}
                    />
                })
            }
        return result
    };
    showBillList=(foods)=>{
        var result=<tr><td>Chưa có sản phẩm nào</td></tr>;
        if (foods.length>0){
            result=foods.map((food,i)=>{
                return <BillItem
                    key={i}
                    index={i}
                    food={food}
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                />
            })
        }
        return result
    };
    findIndexInFoods=(foods,id)=>{
        var index=-1;
        if (foods.length>0) {
            foods.forEach((food,i)=>{
                if (food.id===id){
                    index=i
                }
            })
        }
        return index;
    };
    getTotal=(foods)=>{
        var result=0;
        foods.forEach((food)=>{
           result+=food.price*food.quantity;
        });
        return result;
    }
}





export default HomePage;
