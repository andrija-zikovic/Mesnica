import "./App.css";
import Client from "./Client/Client";
import Admin from "./Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataClientProvider } from "./context/DataClient";
import { DataAdminProvider } from "./context/DataAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <DataClientProvider>
              <Client />
            </DataClientProvider>
          }
        />
        <Route
          path="admin/*"
          element={
            <DataAdminProvider>
              <Admin />
            </DataAdminProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
