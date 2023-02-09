import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [user, setuser] = useState({
    email: '',
    password: '',
})
const [errorUser,seterrorUser]=useState("");
const [errorList,seterrorList]=useState([]);
let[loding,setloding]=useState(false)
const navigate = useNavigate();
function gotoHome() {
    navigate('/home')
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

        let { data } = await axios.post('https://route-movies-api.vercel.app/signin', user)
        console.log(data);
        if (data.message === 'success') {
            
            localStorage.setItem("userToken",data.token);
            props.saveuserData();
          gotoHome()
        }
        else {
            seterrorUser(data.message)
        }
    }
    setloding(false);

}


function validatData() {
    const schema = Joi.object({
      email: Joi.string().required().email({ tlds: { allow: ["net", "com"] } }),
      password: Joi.number().required(),

    });
   return schema.validate(user,{abortEarly:false})
}

function getdataInput(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setuser(myuser)
    console.log(myuser);
}

return (
    <div className='py-5'>
        <h2 className='mb-4 text-center'>""Longin Form ""</h2>
        {errorList.map((errorUser, index) => <div key={index} className='alert text-danger '>{errorUser.message}</div>)}
        <form onSubmit={regesterDataForm}>
            <label htmlFor="email">email:</label>
            <input onChange={getdataInput} type="email" id='email' className='form-control mb-2' name='email' />
            {errorUser.length > 0 ? <div className='alert text-danger'>{errorUser}</div> : ''}
            <label htmlFor="password">password: </label>
            <input onChange={getdataInput} type="password" id='password' className='form-control mb-2' name='password' />
            <button type='submit' className='btn btn-info mt-3'>
                {loding?<i className='fa fa-spinner fa-spin'></i>:'Login'}
            </button>
        </form>
    </div>
)
}
