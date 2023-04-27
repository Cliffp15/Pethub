import React, { useState } from "react";

import SignUpDialog from "../pages/SignUpDialog";

function SignUpButton({ className, children }) {
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
      <SignUpDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default SignUpButton;
