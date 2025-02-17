import { Navigate } from "react-router-dom";
import RootLayouts from "@m/components/layouts/RootLayout.jsx";
import MainLayouts from "@m/components/layouts/MainLayout.jsx";
import Loading from "@m/components/pages/loading/Loading.jsx";
import Home from "@m/components/pages/main/Home.jsx";

// ルート定義を簡略化
const route = (path, element, children = []) => ({ path, element, children });

const mainRoutes = [
  route("/main", <MainLayouts />, [route("sheet", <Home />)]),
];

export const routes = [
  route("/", <RootLayouts />, [
    route("", <Navigate to="loading" replace />),
    route("loading", <Loading />),
    ...mainRoutes,
  ]),
];
