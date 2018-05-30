import React from 'react';
import HomePage from "./pages/HomePage";
import ChangeProduct from "./pages/ChangeProduct";
import Bill from "./pages/Bill";
import Account from "./pages/Account";
import Setting from "./pages/Setting";
import NotFoundPage from "./pages/NotFoundPage";
import ProductItemEdit from "./components/changeProducts/ProductItemEdit";
import BillView from "./components/Payment/BillView";

const routes=[
    {
        path:'/',
        exact:true,
        main: ()=><HomePage/>
    },
    {
        path:'/products',
        exact:true,
        main: ()=><ChangeProduct/>
    },
    {
        path:'/bill',
        exact:true,
        main: ()=><Bill/>
    },
    {
        path:'/setting',
        exact:false,
        main: ()=><Setting/>
    },
    {
        path:'/account',
        exact:false,
        main: ()=><Account/>
    },
    {
        path:'/products/:id/edit',
        exact:false,
        main: ({match,history})=><ProductItemEdit history={history} match={match}/>
    },
    {
        path:'/bill/:day/:id',
        exact:false,
        main: ({match,history})=><BillView history={history} match={match}/>
    },
    {
        path:'',
        exact:false,
        main: ()=><NotFoundPage/>
    },
];

export default routes;