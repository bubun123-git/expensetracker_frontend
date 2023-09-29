import React, { useState, useRef, useContext } from "react";
import '../Pages/AuthPage.css'
import { AuthContext } from "../../Store/Auth-Context";
import { useHistory, NavLink  } from "react-router-dom";


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    let history = useHistory()
    const authCtx = useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

        setIsLogin(true);
        if(!isLogin && enteredPassword !== enteredConfirmPassword) {
            alert('Passwords do not match!')
            return;
        }

        let url;
        setIsLoading(true)
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc'
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setIsLoading(false)
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {
                    let errormessage = 'Authentication Failed!'
                    if (data && data.error && data.error.message) {
                        errormessage = data.error.message
                    }

                    throw new Error(errormessage)

                });
            }
        }).then(data => {
            authCtx.login(data.idToken);
            history.replace('/')
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <section className="auth-form">
            <h1>{isLogin ? 'LOGIN' : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type='email' id="email" required ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor="password">Your Password</label>
                    <input type='password' id="password" required ref={passwordInputRef} />
                </div>
                {!isLogin && (
                    <div >
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' ref={confirmPasswordInputRef} required />
                    </div>
                )}
                <NavLink className ="forgot-password-button " to="/ForgotPassword">Forgot Password ?</NavLink><br/>
                <div className="auth-button">
                    {!isLoading && <button class="btn btn-warning" >{isLogin ? 'Login' : "Create Account"}</button>}<br /><br />
                    {isLoading && <p>Pending Request</p>}
                    <button type="button" class="btn btn-warning" onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create New Account' : 'Login with Existing Account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthPage;
