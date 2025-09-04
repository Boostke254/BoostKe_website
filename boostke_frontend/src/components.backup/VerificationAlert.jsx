// src/components/VerificationAlert.js
import React from 'react';
import Alert from "@mui/material/Alert";

function VerificationAlert({ message, severity }) {
  return (
    message && (
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    )
  );
}

export default VerificationAlert;
