// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProjectLayout from "../project/ProjectLayout";
import GoogleSignIn from "../project/GoogleSignIn";
import EditorWrapper from "../pages/editor/components/ImageEditor/EditorWrapper";
import { isAuthenticated } from "../common/utils";
import ErrorBoundary from "../common/component/ErrorBoundary";
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    return !isAuthenticated() ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <ErrorBoundary>
                            <PublicRoute>
                                <GoogleSignIn />
                            </PublicRoute>
                        </ErrorBoundary>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ProjectLayout>
                                <Routes>
                                    <Route path="/" element={<ErrorBoundary><p>Home</p></ErrorBoundary>} />
                                    <Route path="/editor" element={<ErrorBoundary><EditorWrapper /></ErrorBoundary>} />
                                    <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
                                </Routes>
                            </ProjectLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ErrorBoundary>
                            <NotFound />
                        </ErrorBoundary>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
