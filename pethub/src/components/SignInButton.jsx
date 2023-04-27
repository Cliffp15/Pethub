import React, { useState } from "react";

import SignInDialog from "../pages/SignInDialog";

function SignInButton({ className, children }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {children({ handleClickOpen })}
      <SignInDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default SignInButton;
