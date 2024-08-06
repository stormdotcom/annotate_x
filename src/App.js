import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
