import { signOut } from "firebase/auth"; 
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    })
    .catch((error) => {
      navigate("/error");
    });
  }
  return (
    <div>
        <img 
            src="" 
            alt="logo"
        />
        {user && (
          <div>
          <img alt="usericon" src={user?.photoURL}/>
        
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        )}
    </div>
  )
}

export default Header