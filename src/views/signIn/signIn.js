import TextField from '@mui/material/TextField';
import './style.css'
import aplo_logo from '../../assets/images/aplo_logo.svg';
import aplo_text from '../../assets/images/aplo_text.svg';
import arrow from '../../assets/images/arrow.svg';
import eventEmitter from "@/plugins/eventEmitter";
import React, { useState,useContext} from 'react';
import axios from "./api";
import UserContext from "../../context/user";

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useContext(UserContext);
    const handleClick = () => {
       
        eventEmitter.emit('loading', true)
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.login(formData).then((res) => {
            eventEmitter.emit('loading', false)
            eventEmitter.emit('snackbar',res.data.message)
            if(res.data.message==="login successfully"){
                console.log('hi')
            }
            console.log(res)
        }).catch((err) => {
            eventEmitter.emit('loading', false)
            eventEmitter.emit('snackbar')
        });
    
    };
    return (



        <div className='container-login signin'>
            <div className="flex justify-between flex-row responsive">

                <div className="flex align-i-center logos">
                    <div className="logo"><img src={aplo_logo} alt="" /></div>
                    <div className="logo_text ml-45"><img src={aplo_text} alt="" /></div>
                </div>

                <div className="fieldes">
                    <div className="fs-24 ml-20">SIGN IN</div>

                    <div className='flex input-text align-i-center mt-38'>
                        <div className='fs-18'>E-MAIL</div>
                        <div className='line'></div>
                        <TextField variant="standard" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className='flex input-text align-i-center mt-30'>
                        <div className='fs-18'>PASSWORD</div>
                        <div className='line'></div>
                        <TextField variant="standard" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="btn flex mt-30" onClick={handleClick}>
                        <div className='text bold'>LOG IN</div>
                        <div className="box-arrow"><img src={arrow} alt="" /></div>
                    </div>
                    <div className='fs-18 light mt-20 pointer'>Forgot your password</div>


                </div>
            </div>
        </div>
    );
}

export default SignIn;