// import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const componentWrapper = (Component) => {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      location={useLocation()}
    />
  );
};

export default componentWrapper;
