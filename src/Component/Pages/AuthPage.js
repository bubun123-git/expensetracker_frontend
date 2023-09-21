import { useState, useRef } from 'react';
import '../Pages/AuthPage.css';

function AuthForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY_HERE')
        .then((res) => {
          // Handle the sign-up response
        })
        .catch((error) => {
          // Handle errors
        });
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY_HERE', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed!';
              throw new Error(errorMessage);
            });
          }
        })
        .catch((error) => {
          // Handle errors
        });
    }
  };

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div>
          <button>{isLogin ? 'Login' : 'Signup'}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
