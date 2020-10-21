import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default ({ homeViewModel }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    homeViewModel.getUsers(setUsers);
  }, [homeViewModel]);

  return (
    <Paper>
      <List className={classes.root}>
        {users &&
          users.map((user, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={"http://localhost:8080" + user.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {user.emailAddress}
                      </Typography>
                      {" - " + user.biography}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
      </List>
    </Paper>
  );
};
