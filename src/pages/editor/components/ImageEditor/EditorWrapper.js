import React, { useRef } from "react";
import ImageEditor from "./ImageEditor";
import { Box } from "@mui/material";
import Labels from "./Labels";
import ImageViewWrapper from "./ImageList/ImageViewWrapper";
import { FileProvider } from "../FileContext";

const EditorWrapper = () => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    return (
        <div>
            <FileProvider>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 7fr 3fr",
                        gap: 2,
                        height: "100vh"
                    }}
                >
                    <Box sx={{ gridColumn: "1 / 2" }}>
                        <ImageViewWrapper />
                    </Box>
                    <Box sx={{ gridColumn: "2 / 3" }}>
                        <ImageEditor canvasRef={canvasRef} imageRef={imageRef} />
                    </Box>
                    <Box sx={{ gridColumn: "3 / 4" }}>
                        <Labels imageRef={imageRef} />
                    </Box>
                </Box>
            </FileProvider>
        </div>

    );
};

export default EditorWrapper;
