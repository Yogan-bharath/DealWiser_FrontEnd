import React, { useState, useContext } from "react";
import "./LoginPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../../services/auth.service";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const auth = useContext(AuthContext);
  const { setUser } = auth || {};

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required");
      return;
    }

    if (!isLogin && !formData.username) {
      toast.error("Username is required for registration");
      return;
    }

    try {

      if (isLogin) {

        const res = await loginUser({
          email: formData.email,
          password: formData.password
        });

        setUser(res.user);

        toast.success("Login successful 🚀");

        // ✅ Correct admin redirect
        if (res.user.role === "admin") {
          navigate("/admin/add-product");
        } else {
          navigate("/");
        }

      } else {

        const res = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });

        setUser(res.user);

        toast.success("Account created successfully 🎉");

        navigate("/");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );

    }
  };

  const handleOnChange = (e) => {

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  return (
    <div>

      <Navbar />

      <div className="Login-section">

        <div className="left-Login-section">

          <p>LARGEST DEAL DISCOVERY PLATFORM</p>

          <h1 className="title-head">
            POWERED BY <span className="smart">SMART</span> SHOPPERS AROUND THE WORLD
          </h1>

          <div className="hook-line">
            Compare prices across multiple stores instantly before purchasing any product online.
          </div>

        </div>

        <div className="right-login-section">

          <section className="login-section">

            {isLogin ? (
              <h1>Login to your account</h1>
            ) : (
              <h1>Create your account</h1>
            )}

            <form onSubmit={handleSubmit}>

              {!isLogin && (
                <>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g.Dealwiser67"
                    onChange={handleOnChange}
                    value={formData.username}
                  />
                </>
              )}

              <label htmlFor="email">Email</label>

              <input
                name="email"
                type="email"
                placeholder="e.g.alex@DealWiser.com"
                onChange={handleOnChange}
                value={formData.email}
              />

              <label htmlFor="password">Password</label>

              <input
                name="password"
                type="password"
                placeholder="••••••••••"
                onChange={handleOnChange}
                value={formData.password}
              />

              <button type="submit" className="login-btn">
                {isLogin ? "Login" : "Register"}
              </button>

            </form>

            <p className="click-me">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <span onClick={() => setIsLogin(!isLogin)}>

                {isLogin ? "Register" : "Login"}

              </span>

            </p>

          </section>

        </div>

      </div>

    </div>
  );
};