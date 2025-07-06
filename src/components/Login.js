import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm) {
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )

      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(
            addUser({
              uid: uid, 
              email: email,
              displayName: displayName, 
              photoURL: photoURL,
            })
          );
          navigate("/home")
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
        navigate("/home")
      })
  
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        // ..
      });
    }

    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);      });
    }
  }
  
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <div>
       <Header />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (<input ref={name} type="text" placeholder="Name"/>)}
        <input 
          ref={email}
          type="text" 
          placeholder="Email Address" 
        />
        <input 
          ref={password}
          type="password" 
          placeholder="Password" 
        />
        <p>{errorMessage}</p>
        <button onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm}>{isSignInForm 
          ? "New? Sign Up." 
          : "Coming back? Sign In."}</p>
      </form>
    </div>
  )
}

export default Login;