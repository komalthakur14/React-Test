import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "./redux-store/slice/cartSlice";
import { Product } from "./Products";

type CartProps = {
  products?: Product[];
  text?: string;
  mode?: "browse" | "confirm";
};

function Cart({
  products = [],
  text = "Browse the items in your cart and then click Checkout",
  mode = "browse",
}: CartProps) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleCheckout = () => {
    setShowAlert(true);
    dispatch(emptyCart());
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      {!showAlert ? (
        <div>
          <p>{text}</p>
          <List>
            {products.map((product, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={product.title}
                  secondary={"Quantity: " + product.quantity}
                />
              </ListItem>
            ))}
          </List>
          {products.length > 0 && (
            <>
              <Box>
                <Box sx={{ color: "gray" }}>
                  Total Price:{" "}
                  {products.reduce(
                    (total, { price, quantity }) => total + price * quantity,
                    0
                  )}
                </Box>
                <Box>
                  Discounted Price:{" "}
                  {products
                    .reduce(
                      (total, { price, quantity, discountPercentage }) =>
                        total +
                        price * quantity * (1 - discountPercentage / 100),
                      0
                    )
                    .toFixed(2)}
                </Box>
              </Box>
            </>
          )}
          {mode === "browse" ? (
            <Button
              style={{ marginBottom: 10 }}
              variant="contained"
              href={"/checkout"}
              disabled={products.length === 0}
            >
              Checkout
            </Button>
          ) : (
            <Button
              style={{ marginBottom: 10 }}
              variant="contained"
              onClick={handleCheckout}
              disabled={products.length === 0}
            >
              Confirm Order
            </Button>
          )}
        </div>
      ) : (
        <Alert severity="success">
          Your order has been placed successfully!{" "}
          <Link
            to="/products"
            style={{ textDecoration: "underline", color: "#1976d2" }}
          >
            Browse more products
          </Link>
        </Alert>
      )}
    </div>
  );
}

export default Cart;
