import axios from 'axios';
import { ALLMOVIES, movieApi } from './../types/moviesType';
 
export const getAllMovie= (dispatch)=>{
    return async()=>{
        let respons = await axios.get(movieApi)
        console.log(respons.data);
        dispatch({type:ALLMOVIES ,data:respons.data.results,pages:respons.data.totle_pages})
    }
   
return 
}