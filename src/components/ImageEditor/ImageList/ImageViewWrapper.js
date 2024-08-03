import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../../constants";
import ImageView from "./ImageView";
import ImageUploader from "./ImageUploader";

const ImageViewWrapper = () => {
    const selectedFiles = useSelector(state => state[STATE_SLICE_KEY].imageList);
    const currentImage = useSelector(state => state[STATE_SLICE_KEY].currentImage);
    return (
        <div>
            <div style={{ width: "50px" }}></div>
            <Grid container spacing={2} sx={{ mt: 1, maxHeight: "79vh", overflowY: "scroll" }}>
                {selectedFiles.map((file) => (
                    <Grid item key={file.id}>
                        <ImageView
                            isSelected={currentImage.id === file.id}
                            imageSrc={file.image}
                        />
                    </Grid>
                ))}
            </Grid>
            <ImageUploader />
        </div>
    );
};

export default ImageViewWrapper;
