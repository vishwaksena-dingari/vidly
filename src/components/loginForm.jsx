import React from "react";
import { Navigate } from "react-router-dom";
import Joi from "joi";
import Form from "./common/form";
import auth from "../services/authService";
import componentWrapper from "./componentWrapper";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    // call server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // this.props.navigate("/");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/" />;
    return (
      <div className="container col-12 col-sm-8 col-md-6">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default componentWrapper(LoginForm);
