import React, {useReducer} from 'react';
import axios from 'axios';
import setAuthToken from  '../../utils/setAuthToken';
import uuid from 'uuid';
import ProductGroupContext from './productGroupContext';
import productGroupReducer from './productGroupReducer';
import { 
    GET_PRODUCTGROUPS, ADD_PRODUCTGROUP, UPDATE_PRODUCTGROUP, DELETE_PRODUCTGROUP, SET_FILTER, CLEAR_FILTER,
    SET_CURRENT, CLEAR_CURRENT
} from '../types';

const ProductGroupState = props => {
    const initalState={
        productGroupList: [],
        currentProductGroup:null,
        filtered:null
    };

    const [state, dispatch] = useReducer (productGroupReducer, initalState);

    //Get Product Group List
    const getProductGroups = () => {
        let currentUser = JSON.parse(localStorage.currentUser);
        axios({ method:'get',
                url: '/api/productGroup',
                headers: {
                'x-auth-token': currentUser.token
                }})
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:GET_PRODUCTGROUPS, payload:response.data});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Add Product Group
    const addProductGroup = (productGroup) => {

        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/productGroup/Add',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: productGroup})
        .then( response => {
            if(response.status == 200){  //successfull

                productGroup._id = response.data.newProductGroup._id;

                dispatch({type:ADD_PRODUCTGROUP, payload:productGroup});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Update Product Group
    const updateProductGroup = (productGroup) => {
        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/productGroup/Update',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: productGroup})
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:UPDATE_PRODUCTGROUP, payload:productGroup});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Delete PG
    const deleteProductGroup = (id) => {
        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/productGroup/Delete',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: {"id":id} })
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:DELETE_PRODUCTGROUP, payload:id});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Set Current PG
    const setCurrent = (productGroup) => {
        dispatch({type:SET_CURRENT, payload:productGroup});
    }

    //CLear Current PG
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
    }

    //Filter PG
    const setFilter= (text) => {
        dispatch({type:SET_FILTER, payload:text});
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER});
    }

    return ( 
        <ProductGroupContext.Provider value={{ 
            productGroupList: state.productGroupList,
            currentProductGroup: state.currentProductGroup,
            filtered:state.filtered,
            getProductGroups,
            addProductGroup,
            updateProductGroup,
            deleteProductGroup,
            setCurrent,
            clearCurrent,
            setFilter,
            clearFilter
            }}>
            {props.children}
        </ProductGroupContext.Provider>
    )
}

export default ProductGroupState;