import { useState, useRef } from 'react';
import '../Pages/AuthPage.css';

function AuthForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (isLogin) {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error.message);
        }

        // Handle successful login here
      } catch (error) {
        // Handle login errors here
        console.error('Login failed:', error.message);
      }
    } else {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error.message);
        }

        // Handle successful signup here
      } catch (error) {
        // Handle signup errors here
        console.error('Signup failed:', error.message);
      }
    }
  };

  return (
    <section className='section'>
      <h1 className='h1'>{isLogin ? 'Login' : 'Signup'}</h1>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input className='input' type='email' id='email' required ref={emailRef} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input className='input' type='password' id='password' required ref={passwordRef} />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input className='input' type='password' id='confirmPassword' required ref={confirmPasswordRef} />
          </div>
        )}
        <div>
          <button className='button'>{isLogin ? 'Login' : 'Signup'}</button>
          <button className='button' type='button' onClick={switchAuthModeHandler}>
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
