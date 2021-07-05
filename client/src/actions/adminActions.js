import axios from 'axios'
import {LOADING,NOT_LOADING,ADMIN_AUTH_SUCCESS,ADMIN_AUTH_FAILURE} from './constants/constants'
export const adminLogin = ()=> async(dispatch)=>{
   
   dispatch({
      type:LOADING
   })
   try {
         const {data:{authenticated}} = await axios.get('auth/admin/login',{headers:{
         'Accept':'application/json',
         'Content-Type':'application/json',
         'X-Auth-Token':localStorage.getItem('token')
      }}) 
      dispatch({type:NOT_LOADING})
      const action = authenticated?ADMIN_AUTH_SUCCESS:ADMIN_AUTH_FAILURE

      dispatch({
         type:action
      })  
         if(authenticated){
            return Promise.resolve('success')
         }
         else{
            return Promise.reject('failure')
         }
      
   } catch (error) {
      console.log(error.message)
      return Promise.reject('failure')
   }

}


