import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
//Redux 
import { useDispatch } from 'react-redux';
import {
  deleteProductAction,
  getProductEditAction,
} from "../actions/productActions";


const Product = ({product}) => {
  const { name, price, id } = product
  const dispatch = useDispatch();
  const history = useHistory();

  // Confirm to the user if they want to delete the product
  const confirmedDelete = (id) => {
    //Ask the user if they want to delete the product
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //Dispatch the confirmation
        dispatch(deleteProductAction(id));
      }
    });
  };

  const redirectToEdit = product => {
    dispatch(getProductEditAction(product));
    history.push(`/product/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="acciones">
        <button
          to={`/product/edit/${id}`} 
          className="btn btn-primary mr-2"
          onClick={() => redirectToEdit(product)}
          type="button"
          >
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => confirmedDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Product;
