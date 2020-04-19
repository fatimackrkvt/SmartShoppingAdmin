import { GET_PRODUCTGROUPS, ADD_PRODUCTGROUP, UPDATE_PRODUCTGROUP, DELETE_PRODUCTGROUP, SET_FILTER, CLEAR_FILTER,
    SET_CURRENT, CLEAR_CURRENT} from '../types';

export default (state,action) =>{
    switch(action.type){
        case GET_PRODUCTGROUPS:
            return {
                ...state,
                productGroupList: action.payload
            };
        case ADD_PRODUCTGROUP:
            return {
                ...state,
                productGroupList: [...state.productGroupList, action.payload]
            };
        case UPDATE_PRODUCTGROUP:
            return {
                ...state,
                productGroupList: state.productGroupList.map(productGroup => 
                    productGroup._id === action.payload._id? action.payload:productGroup)
            };
        case DELETE_PRODUCTGROUP:
            return {
                ...state,
                productGroupList: state.productGroupList.filter(productGroup=>productGroup._id != action.payload)
            };
        case SET_CURRENT:
            return {
                ...state,
                currentProductGroup: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                currentProductGroup:null
            };
        case SET_FILTER:
            return {
                ...state,
                filtered: state.productGroupList.filter(productGroup => {
                    const regex = new RegExp(`${action.payload}`,'gi');
                    return productGroup.name.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            };
        default:
            return state;
    }
}