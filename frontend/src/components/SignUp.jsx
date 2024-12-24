import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    // alert(`Name: ${name} \nEmail: ${email} \nPassword: ${password}`);

    let result = await fetch(
      "https://ecommerce-dashboard-ptv3.onrender.com/register",
      {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    // console.log(result);

    localStorage.setItem("user", JSON.stringify(result));

    setName("");
    setEmail("");
    setPassword("");

    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="signUp">
      <form action="" id="signup-form">
        <h1>Register Page</h1>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="b_signUp" onClick={handleSignUp}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
