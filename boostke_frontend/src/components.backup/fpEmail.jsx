import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

function Forgotpemail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleCodeSubmission = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrMsg('Invalid email format!');
            return;
        }

        setLoading(true);
        setErrMsg('');

        try {          
            const response = await axios.post('/user/request-password-reset', { email });

            // console.log(response); 
            //go to reset panel
            navigate(`/resetpassword/${email}`);        

        } catch (error) {
            if (!error?.response) {                
                setErrMsg('Server Timeout');
            } else if (error?.response.status === 400) {              
                setErrMsg(error.response.data.detail);
            } else if (error?.response.status === 401) {              
                setErrMsg('Invalid email!');
            } else if (error?.response.status === 500) {              
                setErrMsg('Server failure!');
            } else {          
                setErrMsg(error.response.data.error);
            }

            console.log(error);
        } finally {                   
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleCodeSubmission}>
            <h5>Enter your email address:</h5>
            {errMsg && <Alert variant="filled" severity="error">{errMsg}</Alert>}
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    disabled={loading}
                    required
                />
                {loading ? (
                    <button disabled><CircularProgress thickness={8} size={14} sx={{ color: '#1b1c1e' }}/></button>
                ) : (
                    <button type="submit">Send code</button>
                )}
            </div>
        </form>
    );
}

export default Forgotpemail;