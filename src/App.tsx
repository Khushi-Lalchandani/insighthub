

import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { DashboardPreferencesProvider } from "./context/DashboardPreferencesContext";
function App() {
  return (<>

    <BrowserRouter>
      <AuthProvider>
        <DashboardPreferencesProvider>
          <AppRoutes />
        </DashboardPreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </>)
}

export default App
