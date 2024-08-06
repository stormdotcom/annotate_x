
import React, { useEffect } from "react";
import { auth, googleProvider } from "../app/firebase";
import { Box, Button } from "@mui/material";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                localStorage.removeItem("user");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/");
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error during Google login:", error);
        }
    };

    return (
        <Box>
            <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button variant="contained" onClick={handleLogin}>Login with Google</Button>
            </Box>
        </Box>
    );
};

export default GoogleSignIn;
