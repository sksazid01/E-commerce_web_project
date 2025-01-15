import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../actions/productAction'
import Product from '../components/SingleProduct/Product'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUser } from '../utils/authUtils';

export default function Homescreen() {
  const [userChecked, setUserChecked] = useState(false);
  const dispatch = useDispatch();
  const productState = useSelector(state => state.getAllProductsReducer);
  const { products, error, loading } = productState;
  const logState = !(!localStorage.getItem('currentAdmin'));

  useEffect(() => {
    if (!logState) {
      const isAuthenticated = checkUser();
      if (isAuthenticated) {
        dispatch(getAllProducts());
      }
    }
    setUserChecked(true);
  }, [dispatch, logState]);

  if (!userChecked) {
    return (
      <div className="load_hold">
        <div className="dots-bars-3"></div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer limit={1} />
      <div className='row justify-content-center homescreenContainer'>
        {logState ? (
          <div>
            <div> 
              <h3 id='noItemsinCart'>Welcome, Administrator!</h3>
              {/* <h3 id='noItemsinCart2'>Check and forward <a href='/orders'>Orders</a> to suppliers in the Orders section.</h3> */}
            </div>
          </div>
        ) : loading ? (
          <div className="load_hold">
            <div className="dots-bars-3"></div>
          </div>
        ) : error ? (
          <h1>Error loading products</h1>
        ) : (
          products && products.map(product => (
            <div className='col-md-3 m-3' key={product._id}>
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
