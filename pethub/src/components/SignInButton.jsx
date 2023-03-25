import React, { useState } from "react";
import Button from "@mui/material/Button";
import SignInDialog from "../pages/SignInDialog";

function SignInButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Sign in
      </Button>
      <SignInDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default SignInButton;
