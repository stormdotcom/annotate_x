import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button, Input } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";

import { verifyFiles } from "../../utils/imageUtils";
import { actions } from "../../slice";

const ImageUploader = () => {
    const dispatch = useDispatch();

    const handleImage = (e) => {
        let files = e.target.files;
        if (files && files.length > 0) {
            const results = verifyFiles(files);
            const validFiles = [];
            results.forEach(result => {
                if (result.isVerified) {
                    validFiles.push({ id: result.id, image: result.file });
                } else {
                    toast.error(result.message);
                }
            });

            if (validFiles.length > 0) {
                dispatch(actions.setImageList(validFiles));
            }
        }
    };

    return (
        <Box>
            <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImage}
                style={{ display: "none" }}
                id="image-uploader-input"
            />
            <label htmlFor="image-uploader-input">
                <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
                    Upload Images
                </Button>
            </label>
            <ToastContainer />
        </Box>
    );
};

export default ImageUploader;
