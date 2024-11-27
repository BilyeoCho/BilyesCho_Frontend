import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/home/Home";
import ItemRent from "./screens/rent/ItemRent";
import ItemRegister from "./screens/register/ItemRegister";
import Review from './screens/review/Review';
import MyPage from './screens/mypage/MyPage';
import ItemRentDetail from './screens/rent/ItemRentDetail';
import ReviewRegister from "./screens/review/ReviewRegister";
import EditRegister from "./screens/mypage/EditRegister";
import EditReview from './screens/mypage/EditReview';

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
        path: "/itemrent",
        element: <ItemRent />,
      },
      {
        path: "/itemrent/:itemId",
        element: <ItemRentDetail />,
      },
      {
        path: "/itemregister",
        element: <ItemRegister />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/review/register/:itemId",
        element: <ReviewRegister />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/mypage/edit/:id",
        element: <EditRegister />,
      },
      {
        path: "/edit-review/:reviewId",
        element: <EditReview />,
      },
    ],
  },
]);

export default router;
