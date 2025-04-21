import React from "react";
import RoutePages from "./components/RoutePages";
import { BrowserRouter } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <RoutePages />
    </BrowserRouter>
  );
}

export default App;
