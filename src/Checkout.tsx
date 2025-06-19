import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "./redux-store/store";

function Checkout() {
  const products = useSelector((state: RootState) => state.cart.items);
  return (
    <Cart
      products={products}
      text="Click Confirm Order to place your order"
      mode="confirm"
    ></Cart>
  );
}

export default Checkout;
