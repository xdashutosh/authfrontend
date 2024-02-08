import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import Profile from "./Profile";
import Header from "./Header";
import { ProtectedRoute } from "protected-route-react";
import { useSelector } from "react-redux";

function App() {
 const {currentUser} = useSelector((state)=>state.user);

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      
      <Route path="/login" element={<ProtectedRoute isAuthenticated={!currentUser} redirect="/">
        <Login/>
      </ProtectedRoute>}/>
      <Route path="/register" element={<ProtectedRoute isAuthenticated={!currentUser} redirect="/">
        <Signup/>
      </ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute isAuthenticated={currentUser} redirect="/login">
        <Profile/>
      </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
