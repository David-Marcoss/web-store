import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./router";
import { UserLoggedProvider } from "./shared/contexts";
import "./style.css";
import { Header } from "./shared/components/Header";

function App() {
  return (
    <BrowserRouter>
      <UserLoggedProvider>
        <Header />
        <MainRoutes />
      </UserLoggedProvider>
      </BrowserRouter>
  );
}

export default App;
