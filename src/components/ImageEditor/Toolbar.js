import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { ColorLens } from '@mui/icons-material';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#FFEB33', '#FF33A8'];

const Toolbar = ({ selectedShape, setSelectedShape, color, setColor }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (newColor) => {
        setColor(newColor);
        setAnchorEl(null);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <label>Select shape: </label>
            <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
                <option value="circle">Circle</option>
                <option value="rect">Rectangle</option>
                <option value="roundedRect">Rounded Rectangle</option>
            </select>
            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                <IconButton onClick={handleClick}>
                    <ColorLens style={{ color }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {colors.map((col) => (
                        <MenuItem key={col} onClick={() => handleClose(col)}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: col, borderRadius: '50%' }} />
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>
    );
};

export default Toolbar;
