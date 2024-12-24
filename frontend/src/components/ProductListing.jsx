import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(
      "https://ecommerce-dashboard-ptv3.onrender.com/products"
    );
    result = await result.json();
    setProducts(result);
    if (result) setData(true);
    console.log(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(
      `https://ecommerce-dashboard-ptv3.onrender.com/product/${id}`,
      {
        method: "Delete",
      }
    );
    result = await result.json();
    if (result) alert("Record is deleted");
    getProducts();
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `https://ecommerce-dashboard-ptv3.onrender.com/search/${key}`
      );
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  // const alternateProductList = () => {
  //   return (
  //     <div className="productList">
  //       <h1>Product List</h1>
  //       <input
  //         type="text"
  //         name="searchBar"
  //         id="searchBar"
  //         placeholder="Search Product..."
  //         onChange={searchProduct}
  //       />
  //       {!data ? (
  //         <h1>Loading...</h1>
  //       ) : (
  //         <div className="productList-content">
  //           <div className="product-grid">
  //             {products.length > 0 ? (
  //               products.map((item, index) => (
  //                 <div key={item._id} className="product-card">
  //                   <h3>{item.name}</h3>
  //                   <div className="product-details">
  //                     <p>
  //                       <strong>Price:</strong> ${item.price}
  //                     </p>
  //                     <p>
  //                       <strong>Company:</strong> {item.company}
  //                     </p>
  //                     <p>
  //                       <strong>Category:</strong> {item.category}
  //                     </p>
  //                   </div>
  //                   <div className="product-actions">
  //                     <button onClick={() => deleteProduct(item._id)}>
  //                       Delete
  //                     </button>
  //                     <Link to={"/update/" + item._id}>Update</Link>
  //                   </div>
  //                 </div>
  //               ))
  //             ) : (
  //               <h1 className="noFound">No Result Found</h1>
  //             )}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  return (
    <div className="productList">
      <h1 className="text-center mb-4">Product List</h1>
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        className="form-control w-50 mx-auto mb-4"
        placeholder="Search Product..."
        onChange={searchProduct}
      />
      {!data ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="productList-content px-4">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr className="text-center">
                <th className="py-3">Sr. No</th>
                <th className="py-3">Name</th>
                <th className="py-3">Price</th>
                <th className="py-3">Company</th>
                <th className="py-3">Category</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={item._id} className="text-center align-middle">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">${item.price}</td>
                    <td className="py-3">{item.company}</td>
                    <td className="py-3">{item.category}</td>
                    <td className="py-3">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-primary"
                        to={"/update/" + item._id}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h1 className="noFound text-center py-3">
                      No Result Found
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>

    // <div className="productList">
    //   <h1>Product List</h1>
    //   <input
    //     type="text"
    //     name="searchBar"
    //     id="searchBar"
    //     placeholder="Search Product..."
    //     onChange={searchProduct}
    //   />
    //   {!data ? (
    //     <h1>Loading...</h1>
    //   ) : (
    //     <div className="productList-content">
    //       <ul>
    //         <li>Sr. No</li>
    //         <li>Name</li>
    //         <li>Price</li>
    //         <li>Company</li>
    //         <li>Category</li>
    //         <li>Operation</li>
    //       </ul>
    //       {products.length > 0 ? (
    //         products.map((item, index) => (
    //           <ul key={item._id}>
    //             <li>{index + 1}</li>
    //             <li>{item.name}</li>
    //             <li>{item.price}</li>
    //             <li>{item.company}</li>
    //             <li>{item.category}</li>
    //             <li>
    //               <button onClick={() => deleteProduct(item._id)}>
    //                 Delete
    //               </button>
    //               <Link to={"/update/" + item._id}>Update</Link>
    //             </li>
    //           </ul>
    //         ))
    //       ) : (
    //         <h1 className="noFound">No Result Found</h1>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
};

export default ProductListing;
