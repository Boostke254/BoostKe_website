import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import profile from '../images/seller_profile.png';

function Seller() {
    const [showContacts, setShowContacts] = useState(false);

    return (
        <div className="seller_profile">
            <div role="presentation" className='breadcrumb'>
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink underline="hover" color="inherit" to="/">Home</NavLink>
                    <NavLink underline="hover" color="inherit" to="/categories/Electronics">Electronics</NavLink>
                    <NavLink underline="hover" color="inherit" to="/view">Beats by Dre Headsets</NavLink>
                    <Typography color="text.primary">Alex Mwakideu</Typography>
                </Breadcrumbs>
            </div>

            <div className='seller_details'>
                <div className='seller_image'>
                    <img src={ profile } loading='lazy' alt='profile'/>
                </div>
                <div className='seller_info'>
                    <h5>SELLER PROFILE</h5>
                    <hr/>
                    <p><b>Seller Name:</b></p>
                    <p>Alex Mwakideu</p>
                    <p><b>Located:</b></p>
                    <p>Nairobi, Kenya</p>

                    { showContacts ? <div>
                        <button onClick={()=>{setShowContacts(false)}}>Close Contacts</button>
                        <p><b>Phone number: </b>+254769227770</p>
                        <p><b>Email address: </b>alekki@gmail.com</p>
                    </div> : <button onClick={()=>{setShowContacts(true)}}>Show Contacts</button> }
                </div>
            </div>
        </div>
    );
}

export default Seller;