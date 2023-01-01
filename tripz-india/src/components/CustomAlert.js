import React from "react";
import { Alert,AlertTitle } from "@mui/material";
const CustomAlert = (props) => {
  return (
    props.alert && <div>
      <Alert 
      severity={props.alert.type}
      >
        <AlertTitle>{props.alert.title}</AlertTitle>
        {props.alert.msg}
      </Alert>
    </div>
  );
};

export default CustomAlert;
