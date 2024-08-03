import { Delete, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../constants";
import { actions } from "../slice";

const Labels = () => {
    const dispatch = useDispatch();
    const labels = useSelector(state => state[STATE_SLICE_KEY].shapes);
    const currentShape = useSelector(state => state[STATE_SLICE_KEY].currentShape);
    const handleSelect = (data) => {
        if (data) {
            dispatch(actions.setCurrentShape(data));
        }
    };

    const handleDelete = (l) => dispatch(actions.deleteLabel(l));
    return (
        <>
            <div style={{ height: "50px" }}></div>
            <Box sx={{ mt: 1, mb: 4 }}>
                <Typography sx={{ fontWeight: 700 }}>Label</Typography>
                <Box sx={{ maxHeight: "79vh", overflowY: "scroll" }}>
                    {labels.map((item, idx) => (
                        <Box
                            onClick={() => handleSelect(item)}
                            key={idx}
                            sx={{
                                border: item.id === currentShape.id ? "2px solid black" : "none",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "15px",
                                textAlign: "center",
                                "&:hover": {
                                    bgcolor: "grey"
                                },
                                bgcolor: "lightgrey",
                                my: 1,
                                justifyContent: "space-between",
                                px: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: item.id === currentShape.id ? 700 : 400,
                                    "&:hover": {
                                        cursor: "pointer"
                                    },
                                    flexGrow: 1
                                }}
                            >
                                {item.label}
                            </Typography>
                            <Box sx={{ display: "flex" }}>
                                <IconButton onClick={() => handleDelete(item)}>
                                    <Delete />
                                </IconButton>
                                <IconButton>
                                    <RemoveRedEyeOutlined />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default Labels;
