import React from "react";
import "./css/index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import Faqs from "./pages/faqs";
import Home from "./pages/home";
import View from "./pages/view";
import Login from "./pages/login";
import About from "./pages/about";
import ComingSoon from "./pages/CS";
import Contact from "./pages/contact";
import Chat from "./pages/messages";
import Edit from "./pages/editprofile";
import Error from "./components/error";
import Register from "./pages/register";
import Shop from "./pages/shop";
import ShopProducts from "./pages/shopView";
import Cart from "./pages/cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Search from "./pages/search";
import Profile from "./pages/profile";
import Seller from "./pages/seller_profile";
import Category from "./pages/category";
import ChatHome from "./components/Chat/chatHome";
import Categories from "./pages/categories";
import Service from "./pages/Service";
import Services from "./pages/Services";
import Forgotpemail from "./components/fpEmail";
import Forgotpnumber from "./components/fpNumber";
import Resetpassword from "./pages/resetpassword";
import Forgotpassword from "./pages/forgotpassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import RequireAuth from "./pages/RequireAuth";
import Verification from "./pages/verificationPage";
import Franchise from "./pages/franchise";
import KNCCI from "./pages/kncci";
import SuccessPartners from "./pages/SuccessPartners";
import { useAuth } from "./context/AuthProvider";

import { AuthProvider } from "./context/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Freelancers from "./pages/Freelancers";
import Innovators from "./pages/Innovators";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        // path: "/shopping/home",
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/freelance",
        element: <Freelancers />,
      },
      {
        path: "/franchise",
        element: <Franchise />,
      },
      {
        path: "/success-partners",
        element: <SuccessPartners />,
      },
      {
        path: "/kncci",
        element: <KNCCI />,
      },
      {
        path: "/innovators",
        element: <Innovators />,
      },
      {
        path: "/blog",
        element: <Blog />, 
      },
      {
        path: "/blog/:postId",
        element: <BlogPost />, 
      },
      {
        path: "/blog-admin",
        element: (
          <RequireAuth>
            <BlogAdmin />
          </RequireAuth>
        ),
      },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "/view/:listingName/:listingId",
        element: <View />,
      },
      {
        path: "/faqs",
        element: <Faqs />,
      },
      {
        path: "/categories",
        element: <Categories />,
        children: [
          {
            path: "/categories/:categoryId",
            element: <Category />,
          },
        ],
      },
      {
        path: "/services",
        element: <Services />,
        children: [
          {
            path: "/services/:serviceId",
            element: <Service />,
          },
        ],
      },
      {
        path: "/vendors",
        element: <Shop />,
      },
      {
        path: "/vendors/:shopName/:shopId",
        element: <ShopProducts />,
      },
      {
        path: "/chat",
        element: <Chat />,
        children: [
          {
            path: "/chat/:title/:timestamp/:listingId/:recipientId/:recipientType",
            element: <ChatHome />,
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout-success",
            element: <CheckoutSuccess />,
          },
          {
            path: "/faqs",
            element: <Faqs />,
          },
          {
            path: "/seller",
            element: <Seller />,
          },
        ],
      },
      {
        path: "/editprofile",
        element: <Edit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/rules",
    element: <TermsAndConditions />,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
    children: [
      {
        path: "/forgotpassword/",
        element: <Forgotpemail />,
      },
      {
        path: "/forgotpassword/number/",
        element: <Forgotpnumber />,
      },
    ],
  },
  {
    path: "/resetpassword/:email",
    element: <Resetpassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);
