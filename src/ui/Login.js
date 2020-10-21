import { Button, makeStyles, Snackbar, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import logo from "../LiferayTravels.png";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(3),
  },
  input: {
    width: "35rem",
    marginTop: theme.spacing(3),
  },
}));

export default ({ loginViewModel }) => {
  const classes = useStyles();
  const userName = useRef(null);
  const password = useRef(null);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const openSnackBar = () => {
    setIsSnackBarOpen(true);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(false);
  };

  return (
    <>
      <div className="container">
        <div className={classes.login}>
          <img className="img-fluid" src={logo} alt="Logo" />
          <TextField
            id="standard-basic"
            className={classes.input}
            label="Username"
            variant="outlined"
            ref={userName}
            fullWidth
          />
          <TextField
            id="standard-textarea"
            className={classes.input}
            label="Password"
            variant="outlined"
            type="password"
            ref={password}
            fullWidth
          />
          <Button
            color="primary"
            variant="contained"
            className={classes.input}
            onClick={() => {
              loginViewModel
                .login(
                  userName.current.lastChild.firstChild.value,
                  password.current.lastChild.firstChild.value
                )
                .then((loginSuccess) => {
                  if (!loginSuccess) {
                    openSnackBar();
                  }
                });
            }}
          >
            Sign In
          </Button>
          <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={6000}
            onClose={closeSnackBar}
          >
            <div>The username or the password provided was incorrect.</div>
          </Snackbar>
        </div>
      </div>
    </>
  );
};
