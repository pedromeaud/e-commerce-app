import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCardItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty } from 'antd';

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCardItem(productId));
  };

  return (
    <div style={{ width: '90%', margin: '2rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock removeItem={removeFromCart} products={props.user.cartDetail} />

        <div style={{ marginTop: '3rem' }}>
          <h2>Total amount: ${Total} </h2>
        </div>

        <Result status='success' title='Successfully Purshased Items' />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <br />
          <Empty description={false} />
          <p>No Items in the Cart</p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;