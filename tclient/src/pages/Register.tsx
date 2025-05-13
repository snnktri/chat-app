import { useState } from "react";
import { register } from "../apihandler/user";
import { RegisterData } from "../type/auth.typs";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={user.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profile"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
