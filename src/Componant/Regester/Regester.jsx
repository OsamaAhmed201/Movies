import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Regester() {
    const [user, setuser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: '',
    })
    const [errorUser,seterrorUser]=useState("");
    const [errorList,seterrorList]=useState([]);
let[loding,setloding]=useState(false)
    const navigate = useNavigate();
    function gotoLogin() {
        navigate('/login')
    }

    async function regesterDataForm(e) {
        e.preventDefault();
        setloding(true)
        let validRespons=validatData();
        console.log(validRespons);
        if(validRespons.error){
            seterrorList(validRespons.error.details);
        }
        else{

            let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user)
            console.log(data);
            if (data.message === 'success') {
                gotoLogin()
            }
            else {
                seterrorUser(data.message)
            }
        }
        setloding(false)

    }


    function validatData() {
        const schema = Joi.object({
          first_name: Joi.string().alphanum().required().min(4).max(10),
          last_name: Joi.string().alphanum().required().min(4).max(10),
          age: Joi.number().required().min(20).max(80),
          email: Joi.string().required().email({ tlds: { allow: ["net", "com"] } }),
          password: Joi.number().required(),
    
        });
       return schema.validate(user,{abortEarly:false})
    }

    function getdataInput(e) {
        let myuser = { ...user };
        myuser[e.target.name] = e.target.value;
        setuser(myuser)
        
    }

    return (
        <div className='py-5'>
             <h2 className='mb-4 text-center'>"" Register Form ""</h2>
            {errorList.map((errorUser, index) => <div key={index} className='alert text-danger '>{errorUser.message}</div>)}
            <form onSubmit={regesterDataForm}>
                <label htmlFor="first_name">FirstName: </label>
                <input onChange={getdataInput} type="text" id='first_name' className='form-control mb-2' name='first_name' />
              
                <label htmlFor="last_name">last_name: </label>
                <input onChange={getdataInput} type="text" id='last_name' className='form-control mb-2' name='last_name' />

                <label htmlFor="age">age: </label>
                <input onChange={getdataInput} type="number" id='age' className='form-control mb-2' name='age' />

                <label htmlFor="email">email:</label>
                <input onChange={getdataInput} type="email" id='email' className='form-control mb-2' name='email' />
                {errorUser.length > 0 ? <div className='alert text-danger'>{errorUser}</div> : ''}
                <label htmlFor="password">password: </label>
                <input onChange={getdataInput} type="password" id='password' className='form-control mb-2' name='password' />
                <button type='submit' className='btn btn-info mt-3'>
                    {loding?<i className='fa fa-spinner fa-spin'></i>:'Regester'}
                </button>
            </form>
        </div>
    )
}
