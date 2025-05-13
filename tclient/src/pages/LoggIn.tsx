import { useState } from "react";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { setProfile, setUser, setUserId } from "../features/auth";
import { api } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


interface User {
  email: string;
  password: string;
}

interface ResponseData {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    loggedUser: {
      _id: string;
      fullName: string;
      email: string;
      profile: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const LoggIn:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState<User>({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const hanldeChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const {name, value} = e.target

    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));

   
  }
   const handleSubmit = async(e:React.FormEvent)=> {
      e.preventDefault();
      try {
        setLoading(true);
        setMessage('');
        const response = await api.post<ResponseData>("/user/login", userData);

       // console.log(response);
       // console.log(response.data?.data?.loggedUser.profile);
        setMessage("Loggin successfull.")
        dispatch(setProfile(response.data?.data?.loggedUser.profile));
        dispatch(setUser(response.data?.data?.loggedUser.fullName));
        dispatch(setUserId(response.data?.data?.loggedUser._id));

        localStorage.setItem("chatToken", response.data.data.accessToken);
        navigate("/");
        
      } catch (error:any) {
        console.log(error)
        setMessage(error.message || "login failed");
      }
      finally {
        setLoading(false);
      }
    }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="email" value={userData.email} name="email" onChange={hanldeChange}/>
        <input type="password" name="password" value={userData.password} onChange={hanldeChange}/>
        <button type="submit">{
          loading ? "Loaidng...." : "login"}
        </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default LoggIn
