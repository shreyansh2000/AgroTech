import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Welcome from "./components/WelcomeScreen/Welcome";
import AboutUs from "./components/AboutUs";
import Header from "./components/header";
import Home from "./components/home";
import InformationHub from "./components/InformationHub";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import { useState } from 'react';
import YourComponent from "./components/IntegrateModel";
import HistoryPage from "./components/History";
import ResetPassword from "./components/auth/reset";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Welcome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset",
      element: <ResetPassword />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/Welcome",
      element: <Welcome />,
    },
    {
      path: "/AboutUs",
      element: <AboutUs />,
    },
    {
      path: "/InformationHub",
      element: <InformationHub />,
    },
    {
      path: "/history",
      element: <HistoryPage />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
