import authReducer  from "./reducers/authReducer";
import homeReducer  from "./reducers/homeReducer";

const rootReducers = {
    home: homeReducer,
    auth: authReducer
}

export default rootReducers;