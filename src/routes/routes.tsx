import { useRoutes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/cadastro", element: <Cadastro /> },
  ]);

  return routes;
};

const RoutesWrapper = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default RoutesWrapper;