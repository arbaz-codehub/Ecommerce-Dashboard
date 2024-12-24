import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const handleaddProduct = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(name, price, category, userId, company);
    let result = await fetch(
      "https://ecommerce-dashboard-ptv3.onrender.com/add-product",
      {
        method: "post",
        body: JSON.stringify({ name, price, category, userId, company }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) alert("Product Added Successfully");
    console.log(result);
  };

  return (
    <div className="addProduct">
      <form action="" id="addProduct-form">
        <h1>Add Product</h1>
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

        <button className="b_addProduct" onClick={handleaddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
