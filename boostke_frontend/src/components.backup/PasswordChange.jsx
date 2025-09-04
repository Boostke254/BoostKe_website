import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {  
    const navigate = useNavigate();
    const [ password, setPassword ] = useState('');
    const [ passwordsMatch, setPasswordsMatch ] = useState(false);
    const [ cpassword, setCPassword ] = useState('');
    
    const [passwordError, setPasswordError] = useState(null);

    useEffect(()=>{
        setPasswordsMatch(false);
    }, [ password, cpassword ])

    const handlePassword = (e)=>{
        e.preventDefault(); 
        if(cpassword!==password){
            setPasswordsMatch(true);
        }else{
            setPasswordsMatch(false);
        }
    }

    const handlePasswordChange = (e)=>{
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Password validation logic
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword) && newPassword.length > 0) {
            setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
        }else{
            setPasswordError(null);
        }
    }
    
    const backToProfile = ()=>{
        navigate('/profile');
    }  

  return (
    <form onSubmit={ handlePassword }>                    
        { passwordsMatch? <Alert variant="filled" severity="error">Passwords do not match!</Alert> : '' }
        <label htmlFor='old'>Old password</label>
        <input type='password' id='old' placeholder='Old password' required/>
        <label htmlFor='new'>New password</label>
        <input type='password' value={password} onChange={handlePasswordChange} id='new' placeholder='New password' required/>
        {passwordError && <p style={{ color: 'red', margin: 0, fontSize: 12 }}>{passwordError}</p>}
        <label htmlFor='confirm'>Confirm password</label>
        <input type='password' value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}} id='confirm' placeholder='Confirm password' required/>
        <div className='buttons'>
            <button type='submit'>Update Password</button>
            <button onClick={ backToProfile }>Discard</button>
        </div>                
    </form>
  )
}

export default PasswordChange