import '../css/forms.css';
import larrow from '../images/rp.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";
import Alert from '@mui/material/Alert';
import Boost_ke from '../images/logo_2.png';
import CheckIcon from '@mui/icons-material/Check';
import { Helmet } from 'react-helmet';
import CircularProgress from '@mui/material/CircularProgress';

function Resetpassword() {

    const params = useParams();
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [accurate, setAccurate] = useState(false);
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (cpassword !== password) {
            setAccurate(true);
            return;
        }

        setAccurate(false);
        setLoading(true);
        setError('');

        try {
            await axios.post('/user/reset-password', {
                "resetCode": code,
                "newPassword": password,
                "email": params.email
            });

            alert('Password reset successful!');
            navigate('/login');
        } catch (error) {
            //console.error('Password reset failed:', error);
            setError('Invalid OTP Code!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='resetpass'>
            <Helmet>
                <title>OTP reset password | Boost KE </title>
                <meta name="description" content="Use OTP code to reset your password." />
            </Helmet>
            <div className='resetpass_image'>
                <NavLink to="/forgotpassword"><img src={ larrow } alt="Back" /></NavLink>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='boost_reset_title'>
                    <span className='boost_logo'>
                        <img src={ Boost_ke } alt='boost_logo'/> 
                    </span>
                    <h2><span>:: </span>Reset Password</h2>
                </div>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> OTP CODE sent to: { params.email } </Alert>
                { accurate && <Alert variant="filled" severity="error">Passwords do not match!</Alert> }
                { error && <Alert variant="filled" severity="error">{error}</Alert> }
                <input type='text' value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder='Enter OTP code' required/>
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='New password' required/>
                <input type='password' value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}} placeholder='Confirm password' required/>
                <button type='submit' disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Save and back to login'}
                </button>
            </form>
        </div>
    );
}

export default Resetpassword;
