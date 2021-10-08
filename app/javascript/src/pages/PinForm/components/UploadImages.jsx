import React, { useState, useEffect } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles({
  imagePreview: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  legend: {
    fontSize: 12,
    marginLeft: "0.2rem",
    marginTop: "0.2rem",
    marginBottom: "1rem",
  },
});

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const UploadImages = (props) => {
  const classes = useStyles();
  const [files, setFiles] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        files[file.name] = file;
        setErrorMessage("");
      } else {
        setErrorMessage("File is too big. Should be less than 5MB.");
      }
    }
    return { ...files };
  };

  const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    props.updateFilesCb(filesAsArray);
  };

  const handleDelete = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  useEffect(() => {
    if (Object.keys(files).length >= 3) setButtonDisabled(true);
    else if (Object.keys(files).length < 3) setButtonDisabled(false);
  }, [files]);

  return (
    <>
      <Box
        textAlign="center"
        style={{
          border: "2px dotted lightgray",
          borderRadius: "6px",
          marginBottom: "1rem",
        }}
      >
        {buttonDisabled ? (
          <Button
            disabled
            color="secondary"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            Upload pictures
          </Button>
        ) : (
          <Button
            variant="outlined"
            component="label"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
            color="secondary"
          >
            Upload pictures
            <input
              type="file"
              accept="image/*"
              name="upload_image"
              onChange={handleNewFileUpload}
              hidden
            />
          </Button>
        )}
      </Box>
      {errorMessage ? (
        <Typography className={classes.legend} color="error">
          {errorMessage}
        </Typography>
      ) : (
        <Typography className={classes.legend} color="textSecondary">
          You can upload up to three pictures.
        </Typography>
      )}
      <Typography style={{ marginBottom: "1rem" }} color="textSecondary">
        Preview
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(files).map((fileName, index) => {
          let file = files[fileName];
          let isImageFile = file.type.split("/")[0] === "image";
          return (
            <Box key={fileName}>
              {isImageFile && (
                <div style={{ position: "relative", padding: "0.25rem" }}>
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "1px",
                      right: "1px",
                      zIndex: 100,
                    }}
                    onClick={() => handleDelete(fileName)}
                  >
                    <ClearIcon color="primary" />
                  </IconButton>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${index}`}
                    className={classes.imagePreview}
                  />
                </div>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default UploadImages;
