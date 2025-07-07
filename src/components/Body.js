import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import CreateQuiz from "./CreateQuiz";
import JoinQuiz from "./JoinQuiz";
import QuizPage from "./QuizPage";
import Home from "./Home";
import ResponsesPage from './ResponsesPage';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";


const RequireUnauth = () => {
    const user = useSelector(state => state.user);
    return user ? <Navigate to="/home" replace /> : <Outlet />;
};

const RequireAuth = () => {
    const user = useSelector(state => state.user);
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

const Body = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          } else {
            dispatch(removeUser());
          }
        });
        return unsubscribe;
    }, [dispatch]);
    

    const appRouter = createBrowserRouter([
        {
          element: <RequireUnauth />,
          children: [
            { path: "/", element: <Login /> },
          ]
        },
        {
          element: <RequireAuth />,
          children: [
            { path: "/home",        element: <Home /> },
            { path: "/create-quiz", element: <CreateQuiz /> },
            { path: "/join-quiz",   element: <JoinQuiz /> },
            { path: "/quiz/:code",  element: <QuizPage /> },
            { path: "/quiz/:code/responses", element: <ResponsesPage /> }
          ]
        },
        { path: "*", element: <Navigate to="/" replace /> },
    ]);

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
     )
}

export default Body;