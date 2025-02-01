import  authReducer  from "./Reducers/authReducer";
import categoryReducer  from "./Reducers/categoryReducer";
import chatReducer  from "./Reducers/chatReducer";
import OrderReducer  from "./Reducers/OrderReducer";
import productReducer  from "./Reducers/productReducer";
import sellerReducer  from "./Reducers/sellerReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import dashboardReducer from "./Reducers/dashboardReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer,
    order: OrderReducer,
    payment: PaymentReducer,
    dashboard: dashboardReducer
}

export default rootReducer;