import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Fab from "@material-ui/core/Fab";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { withRouter } from "react-router-dom";
import Modal from "../components/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  place: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
}));

export default withRouter(
  ({
    viewModel: stagesViewModel,
    match: {
      params: { tripId },
    },
  }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [stages, setStages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stageImageName, setStageImageName] = useState("");
    const stageName = useRef(null);
    const stageDescription = useRef(null);
    const stagePlace = useRef(null);
    const stageImage = useRef(null);

    useEffect(() => {
      stagesViewModel.getTripStages(setStages, tripId);
    }, [stagesViewModel, tripId]);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="container mt-3">
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stages.map((stage, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h5">
                    {stage.name} - {stage.place}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <div>
                    <div>
                      <img className="img-fluid" alt="" src={stage.image} />
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {stage.description}
                    </Typography>
                  </div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === stage.length - 1 ? "Finish" : "Next"}
                      </Button>
                      <IconButton
                        aria-label="settings"
                        onClick={() => {
                          stagesViewModel.deleteTripStage(stage.id, tripId);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === stages.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All stages completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
          <Fab
            aria-label="add"
            className={classes.fab}
            color="primary"
            onClick={handleModalOpen}
          >
            <LocationCityIcon />
          </Fab>
          <Modal
            onClose={handleModalClose}
            open={isModalOpen}
            ui={
              <>
                <Typography variant="h3">Create a stage</Typography>
                <div className="mt-3">
                  <TextField
                    id="standard-basic"
                    label="Stage name"
                    variant="outlined"
                    ref={stageName}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <TextField
                    id="standard-textarea"
                    label="Stage description"
                    placeholder="description"
                    rows="4"
                    rowsMax="4"
                    variant="outlined"
                    ref={stageDescription}
                    multiline
                    fullWidth
                  />
                </div>
                <div className={classes.place}>
                  <TextField
                    id="place"
                    className={classes.startingDate}
                    label="Place"
                    ref={stagePlace}
                    variant="outlined"
                  />
                  <div>
                    <span className="mr-2">{stageImageName}</span>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      ref={stageImage}
                      onChange={(e) => {
                        setStageImageName(e.currentTarget.files[0].name);
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
                      stagesViewModel
                        .createTripStage(
                          tripId,
                          stageName.current.lastChild.firstChild.value,
                          stageDescription.current.lastChild.firstChild.value,
                          stagePlace.current.lastChild.firstChild.value,
                          stageImage.current.files[0]
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
        </div>
      </div>
    );
  }
);
