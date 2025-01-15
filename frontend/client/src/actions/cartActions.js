import Product from '../components/SingleProduct/Product';

export const addToCart = (product, quantity, varient) => (dispatch, getState) => {
    var cartItem = {
        name: product.name,
        _id: product._id,
        image: product.image,
        varient: varient,
        quantity: Number(quantity),
        prices: product.prices,
        price: product.prices[0][varient] * quantity
    }

    if (cartItem.quantity > 20) {
        alert('You cannot add more than 20 quantities')
    }
    else {
        if (cartItem.quantity < 1) {
            dispatch({ type: 'DELETE_FROM_CART', payload: product })
        }
        else {
            dispatch({ type: 'ADD_TO_CART', payload: cartItem })
        }
    }
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const deleteFromCart = (product) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product })
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const clearEntireCart = () => (dispatch) => {
    dispatch({ type: 'CLEAR_CART' })
    localStorage.removeItem('cartItems')
}