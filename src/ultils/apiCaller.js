import axios from 'axios';
import {API_URL} from "../constants/config";

export default function apiCaller(endpoint,method='GET',body){
        return axios({
            method,
            url:`${API_URL}/${endpoint}`,
            data:body
        }).catch((err)=>{
            console.log(err);
        })
};