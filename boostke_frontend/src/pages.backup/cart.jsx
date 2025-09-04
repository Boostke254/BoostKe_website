import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; // custom hook for authenticated requests
import { Card, CardContent, Typography, Button } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Cart = () => {
  const axiosPrivate = useAxiosPrivate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCartItems = async () => {
      try {
        const response = await axiosPrivate.get("/cart/items", {
          signal: controller.signal,
        });
        if (isMounted) {
          setCartItems(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  if (loading) return <div className="p-6 text-center">Loading cart...</div>;

  if (cartItems.length === 0)
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-500 text-center">
        <ShoppingCartOutlinedIcon
          fontSize="large"
          className="mb-4 text-gray-400"
        />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-gray-500">
          Looks like you haven’t added anything yet.
        </p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="grid gap-4">
        {cartItems.map((item, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: KES {item.price}
                </Typography>
              </div>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-right">
        <Button
          variant="contained"
          color="warning"
          endIcon={<ShoppingCartCheckout />}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
