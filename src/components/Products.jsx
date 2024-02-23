import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export default function Products() {
  const [productsDetails, setProductDetails] = useState();
  const navigate = useNavigate();
  const [showalert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok ");
        }
        const result = await response.json();
        // console.log(response);
        setProductDetails(result);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // const productIds = productsDetails?.products.map((product) => product?.id);
  // console.log(productIds);
  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product deleted successfully");
          setShowAlert(false);
        } else {
          console.error("Error deleting product:", response.statusText);
          setShowAlert(false);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        setShowAlert(false);
      });
  };
  return (
    <>
      <div className="container m-5">
        <h4 className="text-center">Products</h4>
        <div className="row">
          <div className="col-9 mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Brand</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsDetails?.products.map((product, i) => (
                  <tr key={i}>
                    <td>{product?.id}</td>
                    <td>{product?.brand}</td>
                    <td className="cursor-pointer">{product?.title}</td>
                    <td>{product?.category}</td>
                    <td>{product?.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => navigate(`/editproduct/${product?.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => setShowAlert(true)}
                      >
                        Delete
                      </button>
                      <SweetAlert
                        danger
                        show={showalert}
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={() => handleDelete(product?.id)}
                        onCancel={() => setShowAlert(false)}
                        focusCancelBtn
                      >
                        You will not be able to recover this product!
                      </SweetAlert>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/addproduct/0")}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
