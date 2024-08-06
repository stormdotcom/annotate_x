import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                bgcolor: "primary.main",
                color: "white",
                textAlign: "center",
                p: 0.5
            }}
        >
            <Typography variant="p">© 2024 Annotate X. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;
