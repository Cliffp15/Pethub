import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import SignInDialog from "../pages/SignInDialog";

function SignInButton({ className }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        variant="subtitle1"
        className={className}
        style={{ color: "black", cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        Sign in
      </Typography>
      <SignInDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default SignInButton;
