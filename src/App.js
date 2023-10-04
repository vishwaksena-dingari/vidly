import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/customers" element={<Customers />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies" element={<Movies user={this.state.user} />} />
            <Route element={<ProtectedRoute {...this.props.children} />}>
              <Route path="/movies/:id" element={<MovieForm />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;

//