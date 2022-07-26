import TextField from '@mui/material/TextField';
import './style.css'
import Grid from "@mui/material/Grid";
import aplo_logo from '../../assets/images/aplo_logo.svg';
import aplo_text from '../../assets/images/aplo_text.svg';
import arrow from '../../assets/images/arrow.svg';
import { useNavigate } from "react-router-dom";


import axios from "./api";

function LandPage() {
    const navigate = useNavigate();
    return (
        <div className='container-login login'>
            <Grid container spacing={12} alignItems="center" justifyContent="center" direction="row">
                <Grid item lg={6} xs={12}>
                    <Grid container spacing={1}  alignItems="center" justifyContent="center" direction="row">
                        <Grid item lg={4} >
                            <div className="logo"><img src={aplo_logo} alt=""/></div>
                        </Grid>
                        <Grid item lg={4} >
                            <div className="logo_text"><img src={aplo_text} alt=""/></div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} xs={11} md={7}>

                    <div className="btn flex" onClick={(e) => { navigate('/signin') }}>
                        <div className='text bold'>LOG IN</div>
                        <div className="box-arrow"><img src={arrow} alt=""/></div>
                    </div>

                    <div className="btn flex mt-40" onClick={(e) => { navigate('/signup') }}>
                        <div className='text bold'>CREATE AN ACCOUNT</div>
                        <div className="box-arrow"><img src={arrow} alt=""/></div>
                    </div>

                </Grid>
            </Grid>
            {/* <TextField id="standard-basic" label="Standard" placeholder='hii' variant="standard" /> */}
        </div>
    );
}

export default LandPage;