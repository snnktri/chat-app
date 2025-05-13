import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute: React.FC = () => {
    console.log("I am here");
  const userId = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if(userId.id) setLoading(false);
  }, [userId.id])
  console.log("Helo");
  
  //console.log(userId);

  if(loading) return <p>Loaidng</p>

  return userId ? <Outlet /> : <Navigate to="/register" replace />;
};

export default PrivateRoute;
