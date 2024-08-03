import React from "react";
import ImageEditor from "./ImageEditor";
import { Box } from "@mui/material";
import Labels from "./Labels";

const EditorWrapper = () => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "2fr 7fr 3fr",
                gap: 2,
                height: "100vh"
            }}
        >
            <Box sx={{ gridColumn: "1 / 2" }}>

            </Box>
            <Box sx={{ gridColumn: "2 / 3" }}>
                <ImageEditor />
            </Box>
            <Box sx={{ gridColumn: "3 / 4" }}>
                <Labels />
            </Box>
        </Box>
    );
};

export default EditorWrapper;
