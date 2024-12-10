import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/authContext";
//import "../css/AuthForms.css";

const RegisterPage = () => {
  const { signup, error, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (value) => {
    await signup(value);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="mt-5 flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        {error && (
          <div className="bg-red-100 text-red-500 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6">Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Escribe tu nombre"
              className="w-full px-3 py-2 border rounded"
              {...register("username")}
              autoFocus
            />
            {errors.username?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@domain.tld"
              className="w-full px-3 py-2 border rounded"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="w-full px-3 py-2 border rounded"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className="w-full px-3 py-2 border rounded"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-1.5 mb-2.5"
          >
            Registrar
          </button>
        </form>
        <p className="mt-1 text-center">
          Tienes una cuenta?
          <Link className="ml-1 text-sky-500" to="/login">
            Logeate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
