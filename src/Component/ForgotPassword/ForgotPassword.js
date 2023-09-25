import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import '../ForgotPassword/Forgotpassword.css'


function ForgotPassword() {
    const emailRef = useRef();
    const [error, setError] = useState(null);

    const sendPasswordResetEmailHandler = (event) => {
        event.preventDefault(); 

        setError(null);

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: emailRef.current.value,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to send password reset email");
                }
                console.log(response.json());
                
            })
            .catch(error => {
                setError(error.message);
                console.log("An error occurred while sending password reset email".error.message);

            });
    }

    return (
        <>
        <h1 style={{textAlign:"center"}}>Change your Forgot Password</h1>
        <div className='main-Container'>
         <div>
           <label className='lebel1'>Email:-</label>
           <input type='text' id='emailid' ref={emailRef}/>
         </div>
         <div>
            
            <button onClick={sendPasswordResetEmailHandler} className='btnSend'>Send Link</button>
         </div>
        </div>
        {error && <p style={{color:"red",textAlign:"center"}}>{error}</p>}
        <p style={{textAlign:"center",fontWeight:"bold"}} >
          <NavLink to='/'>
            Allready a User?
            <b style={{color:"red"}}  >Login</b>
            </NavLink>
        </p>
        </>
      );
    }
    
    
export default ForgotPassword;
