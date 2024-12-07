import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from  "../constants/validationSchemas";
import { Link } from "react-router-dom";

const Signin = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = async (data) => {
    await login(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-gray-600 to-gray-900">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <div className="text-black mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-serif font-bold text-black">
            META<span className="text-orange-500">C</span>LEAN
          </h1>

          <p className="text-md mt-8">
            The best way to manage your cleanings and <br />
            <span className="font-bold text-orange-400">
              keep your home clean
            </span>
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            {...register("username")}
            type="string"
            id="username"
            className={`mt-1 w-full border rounded p-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`mt-1 w-full border rounded p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
        >
          SignIn
        </button>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-orange-400 hover:text-orange-500 font-bold"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin