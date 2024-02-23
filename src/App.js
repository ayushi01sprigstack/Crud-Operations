import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import GetSingleProduct from "./components/GetSingleProduct";

function App() {
  // const params = useParams();
  return (
    <>
      {/* <Products /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Products />} />
          {/* <Route path="/addproduct" element={<AddProduct />} /> */}
          {/* <Route path="/getsingleproduct/:id" element={<GetSingleProduct />} /> */}
          <Route
            path="/addproduct/0"
            element={<GetSingleProduct mode="add" />}
          />
          <Route
            path="/editproduct/:id"
            element={<GetSingleProduct mode="edit" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
