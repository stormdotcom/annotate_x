import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import AppRoutes from "./routes/AppRoutes";
import ProjectLayout from "./project/ProjectLayout";

function App() {
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
