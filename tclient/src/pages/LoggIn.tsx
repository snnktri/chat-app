import { useState } from "react";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { setProfile, setUser, setUserId } from "../features/auth";
import { api } from "../utils/axiosInstance";
import { useNavigate, NavLink } from "react-router-dom";



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
    <div className="w-full min-h-screen bg-gray-300 p-4 flex justify-center items-center">
      <div className="w-[80%] p-4 md:w-[60%]">
        <h2 className="text-center uppercase font-bold p-4">Login</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data"
        className="space-y-4 flex flex-col p-6 bg-white w-[100%] rounded-xl shadow-xl">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Email" className="whitespace-nowrap">Email:</label>
          <input
          className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
           type="email"
           value={userData.email}
           placeholder="snk@gmail.com" 
           name="email" 
           onChange={hanldeChange}
        />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="whitespace-nowrap">Password:</label>
          <input 
          className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
        type="password" 
        name="password" 
        value={userData.password} 
        onChange={hanldeChange}
        />
        </div>
        <button type="submit"
        disabled={loading}
        className="bg-blue-500 rounded-xl p-3 text-white hover:bg-blue-600 hover:scale-105 transform ease-in duration-75 delay-75 cursor-pointer">{
          loading ? "Loaidng...." : "login"}
        </button>
        <p className="text-center">Don't have any account? <NavLink to="/register" className="text-blue-700">Sign Up</NavLink></p>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  )
}

export default LoggIn
