import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile, setUser, setUserId } from "./features/auth";
import { api } from "./utils/axiosInstance";
import { ResponseData } from "./type/auth.typs";
import { AppDispatch } from "./app/store";
import LoggIn from "./pages/LoggIn";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";


//type token = string;
function App() {

  const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
    const token: string | null = localStorage.getItem("chatToken");

    const protectedUser = async () => {
      if (!token) {
        console.warn("No token found, cannot validate user.");
        return;
      }

      try {
        const response = await api.get<ResponseData>("/user/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       // console.log(response.data);

        
        dispatch(setProfile(response.data?.data?.profile));
        dispatch(setUser(response.data?.data?.fullName));
        dispatch(setUserId(response.data?.data?._id));
       //console.log(response.data?.data?._id)
      } catch (error) {
        console.error("Error fetching protected user data:", error);
        // Optionally handle errors here, like logging out or redirecting
      }
    };

    protectedUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
         <Route element={<PrivateRoute />}>
           <Route index path="/" element={<Home />} />
           <Route path="/profile" element={<Profile />} />
         </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoggIn />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;