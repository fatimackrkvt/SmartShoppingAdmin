import React, {useContext, useEffect, useState} from 'react';
import GroceryContext from '../context/Grocery/groceryContext';

function Grocery(props) {
    const groceryContext = useContext(GroceryContext);

    const { groceryList, getGroceries, addGrocery, updateGrocery, deleteGrocery,
            clearCurrent, setCurrent, currentGrocery } = groceryContext;         

    useEffect( () => {
        getGroceries();
    }, []);

    useEffect( () => {
        if(currentGrocery != null){
            setGrocery(currentGrocery);
        }
        else{
            setGrocery({
               _id:null,
               name:''
           });
        }
   }, [groceryContext, currentGrocery]);

   const [grocery, setGrocery] = useState({
        _id:null,
        name:''
    });

    const {name} = grocery;

    const onChange = (e) => {
        setGrocery({...grocery, [e.target.name]:e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(currentGrocery == null){
            addGrocery(grocery);
        }
        else{
            updateGrocery(grocery);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();

        setGrocery({
            _id:null,
            name:''
        });
    }

    const onDelete = (_id) => {
        deleteGrocery(_id);
        clearCurrent();
    }

    const onEdit = (selectedGrocery) => {
        setCurrent(selectedGrocery);
    }


    return (
        <div className='grid-2'>
            <div style={{ border:2}}> 
            <form onSubmit={onSubmit}>
                <h4 className='text-header'>{currentGrocery?'Edit':'Add'} Grocery</h4>
                <input type="text" placeholder="Enter Name..." name="name" value={name} onChange={onChange}></input>
                <div>
                <button type="submit" className='btn btn-secondary btn-block'>
                            {currentGrocery?'Update Grocery':'Add Grocery'}
                </button>
                </div>
                {currentGrocery && (
                    <div><button  className='btn btn-light btn-block' onClick={clearAll} >Clear</button></div>
                )
                }
            </form>
            </div>
             <div>
                {groceryList.map(grocery => 
                    <div className='cad bg-light'>
                    <h3 className='text-primary text-left'> 
                        {grocery.name}
                    </h3>
                    <p>
                        <button className='btn btn-dark btn-sm' onClick={() => onEdit(grocery)}> Edit </button>
                        <button className='btn btn-danger btn-sm' onClick={() => onDelete(grocery._id)}> Delete </button>
                    </p>
                    </div>
                ) }
             </div>
        </div>
    ); 
}

export default Grocery;