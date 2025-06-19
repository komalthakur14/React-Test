import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import Cart from "./Cart";
import { connect } from "react-redux";
import { addToCart } from "./redux-store/slice/cartSlice";
import { RootState } from "./redux-store/store";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  discountPercentage: number;
};

type ProductListState = {
  products: Product[];
  productsInCart: Product[];
};

interface ReduxStateProps {
  items: Product[];
  total: number;
}

interface ReduxDispatchProps {
  addToCart: (product: Product) => void;
}

type Props = ReduxStateProps & ReduxDispatchProps;

class ProductList extends React.Component<Props, ProductListState> {
  state: ProductListState = {
    products: [],
    productsInCart: this.props.items,
  };

  componentDidMount() {
    axios.get("https://dummyjson.com/products?limit=20&skip=20").then((res) => {
      const products: Product[] = res.data.products;
      this.setState({ products });
    });
  }
  addToCart = (product: Product) => {
    const newProduct = { ...product, quantity: 1 };
    this.props.addToCart(newProduct);
  };

  render() {
    return (
      <div>
        <Cart products={this.props.items} />
        <Divider />
        <h1>Products</h1>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {this.state.products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    objectFit: "contain",
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => this.addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    items: state.cart.items,
    total: state.cart.total,
  }),
  { addToCart }
)(ProductList);
