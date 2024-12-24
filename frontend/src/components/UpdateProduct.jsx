import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(
      `https://ecommerce-dashboard-ptv3.onrender.com/product/${params.id}`
    );
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:5300/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="UpdateProduct">
      <form action="" id="UpdateProduct-form">
        <h1>Update Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Product Price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Product Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Product Company..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button className="b_UpdateProduct" onClick={handleUpdateProduct}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
