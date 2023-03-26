import React, { useState } from "react";
import { Typography } from "@material-ui/core";
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
      <Typography
        variant="subtitle1"
        style={{ color: "white", cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        Sign in
      </Typography>
      <SignInDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default SignInButton;
