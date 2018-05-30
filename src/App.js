import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
        <Router>
      <div >
          <Menu/>

          {/*<div className='container-fluid mt-4'>*/}
              {/*<div className="row">*/}
                  {/*<div className='col-9 h-50'>*/}

                    {/*<BillList/>*/}
                  {/*</div>*/}

                  {/*<div className='col-3'>*/}
                    {/*<Total/>*/}

                  {/*</div>*/}

                  {/*<div className='col-12 mt-5'>*/}
                    {/*<ProductList/>*/}
                  {/*</div>*/}
              {/*</div>*/}

          {/*</div>*/}
          {this.showContentMenus(routes)}
      </div>
        </Router>
    );
  }
  showContentMenus=(routes)=>{
      var result=null;

      if (routes.length>0){
          result=routes.map((route,i)=>{
            return  <Route key={i} path={route.path} exact={route.exact} component={route.main}/>
          })
      }
      return <Switch>{result}</Switch>;
  }
}

export default App;
