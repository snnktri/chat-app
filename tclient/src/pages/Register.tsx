import { useState } from "react";
import { register } from "../apihandler/user";
import { RegisterData } from "../type/auth.typs";
import { NavLink } from "react-router-dom";

const Register:React.FC = () => {
  const [user, setUser] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    profile: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission
    try {
      setLoading(true);
      setMessage("");

      console.log(user);

    

      await register(user);
      setMessage("Registered successfully");
      // Optionally reset the form:
      setUser({
        fullName: "",
        email: "",
        password: "",
        profile: null as unknown as File,
      });
    } catch (error: any) {
      setMessage(error.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 p-4 flex justify-center">
      <div className="flex p-4 flex-col items-center justify-center w-[80%] md:w-[60%]">
        <h2 className="text-bold uppercase p-4 text-gray-700 font-bold">Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data"
        className="space-y-4 flex flex-col p-6 bg-white w-[100%] rounded-xl shadow-xl">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="fullName" className="whitespace-nowrap">Full Name:</label>
          <input
          className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
          type="text"
          name="fullName"
          placeholder="Shankar Khatri"
          value={user.fullName}
          onChange={handleChange}
          required
        />
          </div>
         
        <div className="flex flex-col gap-y-2">
           <label htmlFor="Email" className="whitespace-nowrap">Email:</label>
          <input
          className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        </div>
        <div  className="flex flex-col gap-y-2">
           <label htmlFor="Password" className="whitespace-nowrap">Password:</label>
        <input
        className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        </div>
        <div  className="flex flex-col gap-y-2">
          <label htmlFor="Profile" className="whitespace-nowrap">Profile:</label>
          <input
          className="block w-[100%] p-2 rounded-xl border-1 outline-none focus:outline-none"
          type="file"
          name="profile"
          accept="image/*"
          onChange={handleChange}
          required
        />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-500 rounded-xl p-3 text-white hover:bg-blue-600 hover:scale-105 transform ease-in duration-75 delay-75 cursor-pointer">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center">Already have account? <NavLink to="/login" className="text-blue-700">Login</NavLink></p>
      </form>
      {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
