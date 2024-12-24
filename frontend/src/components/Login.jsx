import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    // alert(`Name: ${name} \nEmail: ${email} \nPassword: ${password}`);

    let result = await fetch(
      "https://ecommerce-dashboard-ptv3.onrender.com/login",
      {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    // console.log(result);

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else alert("Please enter correct email or password!");

    // setName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="login">
      <form action="" id="login-form">
        <h1>Login Page</h1>
        <input
          type="email"
          placeholder="Enter you email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="b_login" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
