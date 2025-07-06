import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import CreateQuiz from "./CreateQuiz";
import JoinQuiz from "./JoinQuiz";
import QuizPage from "./QuizPage";
import Home from "./Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";


const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/create-quiz",
            element: <CreateQuiz />
        },
        {
            path: "/join-quiz",
            element: <JoinQuiz />
        },
        {
            path: "/quiz/:code",
            element: <QuizPage />
        },
        {
            path: "/home",
            element: <Home />
        }

    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(
                    addUser({
                        uid: uid, 
                        email: email, 
                        displayName: displayName, 
                        photoURL: photoURL,
                    })
                );
            } else {
                dispatch(removeUser());
            }
          });
    }, [])

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
     )
}

export default Body;