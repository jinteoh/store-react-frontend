import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEAR_CART } from './action'

export default (state, action) => {
    switch (action.type) {
        case REMOVE:
            return state.filter(item => item.id !== action.payload)
        case INCREASE:
            return state.map(item => {
                return item.id === action.payload ? { ...item, amount: item.amount + 1 } :
                    { ...item }
            })
        case DECREASE:
            return state.map(item => {
                return item.id === action.payload ? { ...item, amount: item.amount - 1 } :
                    { ...item }
            })
            return
        case ADD_TO_CART:
            const { id, image, title, price } = action.payload
            const newItem = { id, image, title, price, amount: 1 }
            return [...state, newItem]
        case CLEAR_CART:
            return [];

        default:
            return state;
    }
}