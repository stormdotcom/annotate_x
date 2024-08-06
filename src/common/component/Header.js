import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { isAuthenticated } from "../utils";

import logo from "../../assets/img/logo.png";

const Header = ({ signOut }) => {
    const user = isAuthenticated();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        signOut();
        window.location.href = "/login";
    };

    return (
        <AppBar position="static" sx={{ py: 0, bgcolor: "#ffff", maxHeight: 43 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <img src={logo} alt="AnnotateX" height={25} />
                {isMobile ? (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ ml: "auto" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                {user && (
                                    <ListItem onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                )}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <>
                        {user && (
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleMenuOpen}
                                sx={{ ml: "auto" }}
                            >
                                <MenuIcon sx={{ color: "text.primary" }} />
                            </IconButton>
                        )}
                        {user && (
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
