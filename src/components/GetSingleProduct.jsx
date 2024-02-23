import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GetSingleProduct({ mode }) {
  const [singleProductDetail, setSingleProductDetail] = useState({
    id: "",
    brand: "",
    title: "",
    category: "",
    price: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "id" || name === "price" ? parseInt(value) : value;
    setSingleProductDetail((prevProduct) => ({
      ...prevProduct,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        var response = await fetch(`https://dummyjson.com/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(singleProductDetail),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        const result = await response.json();
        console.log("Product updated successfully:", result);
      } else if (mode === "add") {
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(singleProductDetail),
        });

        if (!response.ok) {
          // throw new Error("Failed to add product");
          const errorResponse = await response.json();
          throw new Error(
            `Failed to add product: ${JSON.stringify(errorResponse)}`
          );
        }
        const result = await response.json();
        console.log("Product added successfully:", result);
        setSingleProductDetail(result);
      }
    } catch {}
  };

  useEffect(() => {
    if (mode === "edit" && id) {
      const getProductById = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const result = await response.json();
          // console.log(result);
          setSingleProductDetail(result);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      getProductById();
    }
    // else if (mode === "add") {
    //   setSingleProductDetail({
    //     id: "",
    //     brand: "",
    //     title: "",
    //     category: "",
    //     price: "",
    //   });
    // }
  }, [id, mode]);
  return (
    <>
      <h4 className="text-center mt-5">
        {mode === "edit" ? "Edit Product" : "Add Product"}
      </h4>
      <div>
        <div className="container">
          {mode === "edit" && (
            <p className="text-center">
              {" "}
              Product id is {singleProductDetail?.id}
            </p>
          )}
          <p className="text-center">
            {" "}
            Brand:
            <input
              type="text"
              name="brand"
              value={singleProductDetail.brand}
              onChange={handleInputChange}
              className="form-control"
            />
          </p>
          <p className="text-center">
            {" "}
            Title:
            <input
              type="text"
              name="title"
              value={singleProductDetail.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </p>
          <p className="text-center">
            {" "}
            Category:
            <input
              type="text"
              name="category"
              value={singleProductDetail.category}
              onChange={handleInputChange}
              className="form-control"
            />
          </p>
          <p className="text-center">
            {" "}
            Price:
            <input
              type="text"
              name="price"
              value={singleProductDetail.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </p>
        </div>
        <div className="text-center">
          <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>
            {mode === "edit" ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={() => navigate("/products")}
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
}
