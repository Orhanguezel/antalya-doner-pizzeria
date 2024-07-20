export const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    return total.toFixed(2);
  };
  