import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, withRouter } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, TextField } from "@material-ui/core";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  startingDate: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  test: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
}));

export default withRouter(({ homeViewModel, location }) => {
  const classes = useStyles();
  const [trips, setTrips] = useState([]);
  const [actions, setActions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripImageName, setTripImageName] = useState("");

  const tripName = useRef(null);
  const tripDescription = useRef(null);
  const tripStartingDate = useRef(null);
  const tripImage = useRef(null);

  const queryParams = useQueryParams(location);

  useEffect(() => {
    const searchParam = queryParams.get("search") || "";
    searchParam
      ? homeViewModel.filterTrips(setTrips, setActions, searchParam)
      : homeViewModel.getTrips(setTrips, setActions);
  }, [homeViewModel, queryParams]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {trips &&
          trips.map((trip, index) => (
            <div key={index} className="col-6">
              <Card className="mt-3">
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="travel"
                      alt="travelImage"
                      src={trip.image}
                    />
                  }
                  action={
                    // Step 6. Actions -- Add the necessary code to show the DeleteIcon depending on the actions
                    // HINT: exists an action called "delete"
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        homeViewModel.deleteTrip(trip.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={trip.name}
                  subheader={trip.startingDate}
                />
                <Link to={`${trip.id}/stages`}>
                  <CardMedia className={classes.media} image={trip.image} />
                </Link>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {trip.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          ))}
        {/* // Step 6. Actions -- Add to the query the necessary code to retrieve the actions */}
        <>
          <Fab
            aria-label="add"
            className={classes.fab}
            color="primary"
            onClick={handleModalOpen}
          >
            <AddIcon />
          </Fab>
          <Modal
            onClose={handleModalClose}
            open={isModalOpen}
            ui={
              <>
                <Typography variant="h3">Create a trip</Typography>
                <div className="mt-3">
                  <TextField
                    id="standard-basic"
                    label="Trip name"
                    variant="outlined"
                    ref={tripName}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <TextField
                    id="standard-textarea"
                    label="Trip description"
                    placeholder="description"
                    rows="4"
                    rowsMax="4"
                    variant="outlined"
                    ref={tripDescription}
                    multiline
                    fullWidth
                  />
                </div>
                <div className={classes.startingDate}>
                  <TextField
                    id="date"
                    label="Starting date"
                    type="date"
                    ref={tripStartingDate}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div>
                    <span className="mr-2">{tripImageName}</span>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      ref={tripImage}
                      onChange={(e) => {
                        setTripImageName(e.currentTarget.files[0].name);
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                </div>
                <div className={classes.createButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      homeViewModel
                        .createTrip(
                          tripName.current.lastChild.firstChild.value,
                          tripDescription.current.lastChild.firstChild.value,
                          tripStartingDate.current.lastChild.firstChild.value,
                          tripImage.current.files[0]
                        )
                        .then(handleModalClose);
                    }}
                  >
                    Create
                  </Button>
                </div>
              </>
            }
          />
        </>
      </div>
    </div>
  );
});
