import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
    About,
    Cart,
    Contact,
    HomeLayout,
    Landing,
    Login,
    Shop,
    SingleProduct,
    Profile,
    Search,
    ThankYou,
    OrderHistory,
    Signup,
    YourBusiness,
    CreateBusiness,
    NotFound,
} from "./pages";
import { singleProductLoader } from "./pages/SingleProduct";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "shop",
                element: <Shop />,
            },
            {
                path: "shop/product/:id",
                element: <SingleProduct />,
                loader: singleProductLoader,
            },
            {
                path: "business/:id",
                element: <YourBusiness />,
            },
            {
                path: "business/create",
                element: <CreateBusiness />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "about-us",
                element: <About />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "user-profile",
                element: <Profile />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "thank-you",
                element: <ThankYou />,
            },
            {
                path: "order-history",
                element: <OrderHistory />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

function App() {
    // Set theme from local storage
    let theme = localStorage.getItem("theme");
    if (theme) {
        document.querySelector("html").setAttribute("data-theme", theme);
    }
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
