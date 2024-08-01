import React, { useState } from "react";

import { ColorLens } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Select, Menu, MenuItem, IconButton, FormControl, InputLabel, TextField, Grid, Box } from "@mui/material";

import { STATE_SLICE_KEY } from "../constants";
import { actions } from "../slice";
import data from "../../data.json";

const colors = data.colors;

const Toolbar = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const selectedShapeType = useSelector(state => state[STATE_SLICE_KEY].selectedShapeType);
    const shapeTypes = useSelector(state => state[STATE_SLICE_KEY].shapeTypes);
    const selectedLabel = useSelector(state => state[STATE_SLICE_KEY].selectedLabel);
    const selectedColor = useSelector(state => state[STATE_SLICE_KEY].selectedColor);


    const setSelectedShapeType = (obj) => dispatch(actions.setShapeType(obj));
    const setLabel = (label) => dispatch(actions.setSelectedLabel(label));
    const setColor = (color) => dispatch(actions.setSelectedColor(color));
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (newColor) => {
        setColor(newColor);
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={2} alignItems="center" sx={{ my: 2 }}>
            <Grid item xs={12} md={4}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Select shape</InputLabel>
                    <Select
                        value={selectedShapeType}
                        onChange={(e) => setSelectedShapeType(e.target.value)}
                        label="Select shape"
                    >
                        {shapeTypes.map((item, idx) => (
                            <MenuItem key={idx} value={item.value} >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    label="Label"
                    variant="outlined"
                    value={selectedLabel}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={4} style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleClick} >
                    <ColorLens fontSize="large" style={{ color: "grey", bgcolor: "white" }} />

                </IconButton>
                <Box sx={{ position: "relative", bgcolor: selectedColor, width: "15px", height: "15px", borderRadius: "50%" }}>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {colors.map((col) => (
                        <MenuItem key={col} onClick={() => handleClose(col)} >
                            <div style={{ width: "24px", height: "24px", backgroundColor: col, borderRadius: "50%" }} />
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
        </Grid>
    );
};

export default Toolbar;
