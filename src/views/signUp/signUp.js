import TextField from '@mui/material/TextField';
import './style.css'
// import Grid from "@mui/material/Grid";
import aplo_logo from '../../assets/images/aplo_logo.svg';
import aplo_text from '../../assets/images/aplo_text.svg';
import arrow from '../../assets/images/arrow.svg';
import React, { useState, useEffect } from 'react';
import axios from "./api";
import { Autocomplete } from '@mui/material';
import eventEmitter from "@/plugins/eventEmitter";

function SignUp() {
    const [activities, setActivities] = useState([]);
    const [brands, setBrands] = useState([])
    const [brandName, setBrandName] = useState('')
    const [brandId, setBrandId] = useState(null)
    const [activityName, setActivityName] = useState('')
    const [activityId, setActivityId] = useState(null)
    const [website, setWebsite] = useState('')
    const [fullname, setFullname] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const validEmail= (email)=> {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const handleClick = () => {
        if (validEmail(email) === false) {
            eventEmitter.emit('snackbar',"Email is wrong")
        }
        else{
        eventEmitter.emit('loading', true)
        let formData = new FormData();
        if(brandId!=null){
        formData.append('brandId', brandId);
        }
        formData.append('brandName', brandName);
        if(activityId!=null){
        formData.append('activityId', activityId);
        }
        formData.append('activityName', activityName);
        formData.append('fullName', fullname);
        formData.append('position', position);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('website', website);

       
        axios.submit(formData).then((res) => {
            eventEmitter.emit('loading', false)
            eventEmitter.emit('snackbar',res.data.message)

            console.log(res)
        }).catch((err) => {
            eventEmitter.emit('loading', false)
            eventEmitter.emit('snackbar')
        });
    }
    };


    useEffect(() => {
        let loaded = 0
        eventEmitter.emit('loading', true);
        function checkLoaded() {
            if (loaded === 2) {
                eventEmitter.emit('loading', false);
            }
        }
        async function fetch() {
            // eventEmitter.emit('loading', true)
            axios.getAllBrands().then((res) => {
                setBrands(res.data.data);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })

            axios.getAllActivities().then((res) => {
                setActivities(res.data.data);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })
        }
        fetch();
    }, [])
    return (
        <div className='container-signup signup'>
            <div className="flex justify-between flex-row responsive">

                <div className="flex align-i-center logos">
                    <div className="logo"><img src={aplo_logo} alt="" /></div>
                    <div className="logo_text ml-45"><img src={aplo_text} alt="" /></div>
                </div>

                <div className="fieldes">
                    <div className="fs-24 ml-20 mb-30">Request Business Access</div>

                    <div className='flex input-text align-i-center mt-38'>
                        <div className='fs-18'>BRAND NAME</div>
                        <div className='line'></div>
                        <Autocomplete
                            freeSolo
                            options={brands}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => { setBrandName(value.name); setBrandId(value.id); }}
                            renderInput={(params) => <TextField {...params} value={brandName} onChange={(e) => { setBrandName(e.target.value); setBrandId(null) }} placeholder='Select or Add' />}
                            fullWidth
                        />
                    </div>

                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>ACTIVITY</div>
                        <div className='line'></div>
                        <Autocomplete
                            freeSolo
                            options={activities}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => { setActivityName(value.name); setActivityId(value.id); }}
                            renderInput={(params) => <TextField {...params} value={activityName} onChange={(e) => { setActivityName(e.target.value); setActivityId(null) }} placeholder='Select or Add' />}
                            fullWidth
                        />
                    </div>

                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>WEBSITE</div>
                        <div className='line'></div>
                        <TextField variant="standard" placeholder='TYPE' onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>FULL NAME</div>
                        <div className='line'></div>
                        <TextField variant="standard" placeholder='TYPE' onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>POSITION</div>
                        <div className='line'></div>
                        <TextField variant="standard" placeholder='TYPE' onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>E-MAIL</div>
                        <div className='line'></div>
                        <TextField variant="standard" placeholder='TYPE' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="fs-14 ml-20">Use the business e-mail</div>
                    <div className='flex input-text align-i-center mt-20'>
                        <div className='fs-18'>PASSWORD</div>
                        <div className='line'></div>
                        <TextField variant="standard" type="password" placeholder='********' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="btn flex mt-20" onClick={handleClick}>
                        <div className='text bold'>MAKE A REQUEST</div>
                        <div className="box-arrow"><img src={arrow} alt="" /></div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default SignUp;