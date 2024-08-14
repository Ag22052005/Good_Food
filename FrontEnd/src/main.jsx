import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./assets/screens/Home.jsx";
import Login from "./assets/screens/Login.jsx";
import SignUp from "./assets/screens/SignUp.jsx";
import UserInfoProvider from "./store/store.jsx";
import CartList from "./assets/components/CartList.jsx";
import Header from "./assets/components/Header.jsx";
import TransactionList from "./assets/components/TransactionList.jsx";
import CheckOut from "./assets/screens/CheckOut.jsx";
import ChatBotScreen from "./assets/screens/ChatBotScreen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/mycart",
    element: (
      <>
        <Header></Header>
        <CartList />
      </>
    ),
  },
  {
    path: "/transaction",
    element: (
      <>
        <Header></Header>
        <TransactionList />
      </>
    ),
  },
  {
    path: "/checkout",
    element: (
      <>
        <CheckOut />
      </>
    ),
  },
  {
    path: "/chatbot",
    element: (
      <>
        <ChatBotScreen />
      </>
    ),
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserInfoProvider>
      <RouterProvider router={router} />
    </UserInfoProvider>
  </React.StrictMode>
);
