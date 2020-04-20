import React, {useReducer} from 'react';
import axios from 'axios';
import GroceryContext from './groceryContext';
import groceryReducer from './groceryReducer';
import { 
    GET_GROCERIES, ADD_GROCERY, UPDATE_GROCERY, DELETE_GROCERY, SET_CURRENT, CLEAR_CURRENT
} from '../types';

const GroceryState = props => {
    const initalState={
        groceryList: [],
        currentGrocery:null
    };

    const [state, dispatch] = useReducer (groceryReducer, initalState);

    //Get Grocery List
    const getGroceries = () => {
        let currentUser = JSON.parse(localStorage.currentUser);
        axios({ method:'get',
                url: '/api/grocery',
                headers: {
                'x-auth-token': currentUser.token
                }})
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:GET_GROCERIES, payload:response.data});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Add Grocery
    const addGrocery = (grocery) => {

        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/grocery/Add',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: grocery})
        .then( response => {
            if(response.status == 200){  //successfull

                console.log('response.data',response.data);
                console.log('response.data.newGrocery',response.data.newGrocery);
                console.log('response.data._id',response.data_id);
                grocery._id = response.data.newGrocery._id;

                dispatch({type:ADD_GROCERY, payload:grocery});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Update Grocery
    const updateGrocery= (grocery) => {
        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/grocery/Update',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: grocery})
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:UPDATE_GROCERY, payload:grocery});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Delete Grocery
    const deleteGrocery = (id) => {
        let currentUser = JSON.parse(localStorage.currentUser);

        axios({ method:'post',
                url: '/api/grocery/Delete',
                headers: {
                'x-auth-token': currentUser.token
                }, 
            data: {"id":id} })
        .then( response => {
            if(response.status == 200){  //successfull
                dispatch({type:DELETE_GROCERY, payload:id});
            }
            else{
                //todo:
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    //Set Current
    const setCurrent = (grocery) => {
        dispatch({type:SET_CURRENT, payload:grocery});
    }

    //CLear Current
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
    }

    return ( 
        <GroceryContext.Provider value={{ 
            groceryList: state.groceryList,
            currentGrocery: state.currentGrocery,
            getGroceries,
            addGrocery,
            updateGrocery,
            deleteGrocery,
            setCurrent,
            clearCurrent
            }}>
            {props.children}
        </GroceryContext.Provider>
    )
}

export default GroceryState;