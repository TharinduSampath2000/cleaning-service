import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      password: formData.password,
    };

    const success = await register(data);
    if (success) {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="string"
          value={formData.username}
          onChange={(e) => handleChange(e)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Signup