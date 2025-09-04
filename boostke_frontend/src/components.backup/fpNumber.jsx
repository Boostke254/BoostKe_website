import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Forgotpnumber() {
    const [number, setNumber] = useState(null);
    //go to reset panel
    const navigate = useNavigate();
    const handleCodeSubmission = ()=>{
        
        navigate(`/resetpassword/${number}`);
        
    }
    
    return (
        <form onSubmit={ handleCodeSubmission }>
            <h5>Enter your phone number: </h5>
            <div>
                <input type="number" value={number} onChange={(e)=>{setNumber(e.target.value)}} placeholder="254xx" disabled required/>
                <button type='submit' disabled>Send code</button>
            </div>
        </form>
    );
}

export default Forgotpnumber;