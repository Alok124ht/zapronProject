import { Typography } from "@material-ui/core";
import React from "react";
function WelcomePage() {
  const username = localStorage.getItem("token").split(".")[1]; // decode username from token
  const decodedUsername = JSON.parse(atob(username)).username;

  return (
    <Typography variant="h4" align="center">
      Welcome, {decodedUsername}!
    </Typography>
  );
}

export default WelcomePage;