import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions de redux

import { createNewProductAction } from "../actions/productActions";

const NewProduct = () => {
  //State of the component
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');

  //Use useDispatch to create a new function
  const dispatch = useDispatch();

  // Getting the state 
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error)

  // Call the action for productAction
  const addProduct = (product) => {
    dispatch(createNewProductAction(product));
  };

  //When user click submit button
  const handleSubmitNewProduct = (e) => {
    e.preventDefault();

    //Validate form
    if (name.trim() === "" || price <= 0) {
      return;
    }
    //Check for errors

    //Create new product
    addProduct({ 
      name, 
      price
    });

    setName('')
    setPrice('')
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
            <form onSubmit={handleSubmitNewProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add
              </button>
            </form>
            {loading && (
              <h3 className="bg-success mt-4 p-2 text-center">Loading...</h3>
            )}
            {error && (
              <h3 className="alert alert-danger mt-4 p-2 text-white text-center">
                There was an error while loading
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
