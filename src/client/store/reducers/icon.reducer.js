import actions from "../../constants/action.types";

const initialState = {
    list: {}
};

export default function iconReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ICONS_SUCCESS:
            return { 
                ...state, 
                list: action.payload 
            };
        default:
            break;
    }
    return state; 
}