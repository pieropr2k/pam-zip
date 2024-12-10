import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
//import "../css/AuthForms.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="forms flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        {error && (
          <div className="bg-red-100 text-red-500 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <h1 className="text-2xl font-bold mb-6">Entrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email", { required: true })}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
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
              placeholder="Escribe tu contraseña"
              className="w-full px-3 py-2 border rounded"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-3"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-1 text-sm">
          No tienes una cuenta?{" "}
          <Link to="/register" className="text-sky-500">
            Crear nueva
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
