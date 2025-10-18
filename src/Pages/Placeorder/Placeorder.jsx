import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/storeContext'

const Placeorder = () => {

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>

        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street'/>

        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='PIN Code' />
          <input type="text" placeholder='Country' />
        </div>

        <input type="number" placeholder='Phone'/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p> ₹{(getTotalCartAmount()*3)/100}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()+ (getTotalCartAmount()*3)/100}</p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
      </div>
      </div>
    </form>
  )
}

export default Placeorder