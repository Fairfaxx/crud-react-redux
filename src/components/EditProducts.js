import React, {useState, useEffect} from "react";
import { editProductAction } from "../actions/productActions";
import {useHistory} from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

const EditProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //Create new state 
  const [product, setProduct] = useState({
    name: '',
    price: ''
  })
  //Product to edit
  const editproduct = useSelector((state) => state.products.editproduct);
  console.log(editproduct);
  
  //Fullfil the product
  useEffect(() => {
    setProduct(editproduct);
  }, [editproduct]);

  //Read data from form
  const onChangeForm = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  
  const { name, price } = product;

  const handleEditProduct = (e) => {
    e.preventDefault();
    dispatch(editProductAction(product));

    //redirect to the homepage
    history.push('/');
  };

  

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>
            <form
              onSubmit={handleEditProduct}
            >
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
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
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
