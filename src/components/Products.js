import React, {Fragment, useEffect} from 'react';

//Redux 
import { useDispatch, useSelector } from 'react-redux';
import { downloadProductAction } from '../actions/productActions';
import Product from './Product';

const Products = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    //consult la api
    const loadProducts = () => dispatch(downloadProductAction());
    loadProducts();
  }, [dispatch])

  return (
    <Fragment>
      <h2 className="text-center my-5">Products List</h2>
      {error && <h3 className="text-center font-weight-bold alert alert-danger mt-5">There was an error</h3>}
      {loading && <p className="text-center">Loading...</p>}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {products.length === 0 && <h2>No products available yet, add one!</h2>}
          {products.map(product => (
            <Product 
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Products;
