import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import AppRoutes from "./routes/AppRoutes";
import ProjectLayout from "./project/ProjectLayout";
import { useEffect } from "react";
import { isAuthenticated } from "./common/utils";

function App() {
  useEffect(() => {
    if (!isAuthenticated()) {
      // window.location.reload("/login");
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProjectLayout>
          <AppRoutes />
        </ProjectLayout>

      </ThemeProvider>
    </div>
  );
}

export default App;
