import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';

const MenuLink=({label, to, activeOnlyWhenExact})=>(
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (

            <li className={match ? "active nav-item" : "nav-item "}>
                 <Link className='nav-link' to={to}>{label}</Link>
            </li>

        )}
    />
);

const menus=[
    {
        path:'/',
        exact:true,
        label:'Thanh Toán'
    },
    {
        path:'/products',
        exact:true,
        label:'Quản lý Món ăn'
    },
    {
        path:'/bill',
        exact:false,
        label:'Hóa đơn'
    },
    {
        path:'/setting',
        exact:false,
        label:'Cài đặt'
    },
    {
        path:'/account',
        exact:false,
        label:'Tài khoản'
    },
];
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'Quán ăn'
        }
    }

    componentDidMount() {
        var name=JSON.parse(localStorage.getItem("NAME"));
        this.setState({
            name
        })
    }

    render() {
        var {name}=this.state;
        return (
            <div >
                <ul className="nav nav-inline navbar-expand-md navbar-dark bg-light">
                    <small className="navbar-brand text-black-50 ml-2">{name}</small>

                    {this.showMenus(menus)}
                </ul>


            </div>

        );
    }
    showMenus=(menus)=>{
      var result=null;
      if (menus.length>0){
          result=menus.map((menu,i)=>{
              return  (  <MenuLink
                  key={i}
                  label={menu.label}
                  to={menu.path}
                  activeOnlyWhenExact={menu.exact}/>)
          })
      }
      return result;
    };
}

export default Menu;
