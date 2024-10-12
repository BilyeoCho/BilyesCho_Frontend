import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/home/Home";
import Rent from "./screens/rent/Rent";
import Review from './screens/review/Review';
import Talk from './screens/talk/Talk';
import MyPage from './screens/mypage/MyPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/rent",
        element: <Rent />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/talk",
        element: <Talk />
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
