import {GET_GROCERIES, ADD_GROCERY, UPDATE_GROCERY, DELETE_GROCERY, SET_CURRENT, CLEAR_CURRENT} from '../types';

export default (state,action) =>{
    switch(action.type){
        case GET_GROCERIES:
            return {
                ...state,
                groceryList: action.payload
            };
        case ADD_GROCERY:
            return {
                ...state,
                groceryList: [...state.groceryList, action.payload]
            };
        case UPDATE_GROCERY:
            return {
                ...state,
                groceryList: state.groceryList.map(grocery => 
                    grocery._id === action.payload._id? action.payload:grocery)
            };
        case DELETE_GROCERY:
            return {
                ...state,
                groceryList: state.groceryList.filter(grocery=>grocery._id != action.payload)
            };
        case SET_CURRENT:
            return {
                ...state,
                currentGrocery: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                currentGrocery:null
            };
        default:
            return state;
    }
}