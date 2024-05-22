import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemsList = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <>
            <div className="rounded-lg md:w-2/3 ">
                {cartItems.map((item) => {
                    return <CartItem key={item.id} cartItem={item} />;
                })}
            </div>
        </>
    );
};

export default CartItemsList;
