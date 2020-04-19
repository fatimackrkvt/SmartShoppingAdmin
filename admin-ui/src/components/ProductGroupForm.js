import React, {useState, useContext, useEffect} from 'react';
import ProductGroupContext from '../context/ProductGroup/productGroupContext';

const ProductGroupForm = () => {

    const productGroupContext = useContext(ProductGroupContext);

    const {addProductGroup, updateProductGroup, clearCurrent, currentProductGroup } = productGroupContext;

    useEffect( () => {
         if(currentProductGroup != null){
             setProductGroup(currentProductGroup);
         }
         else{
             setProductGroup({
                _id:null,
                name:'',
                baseProductGroupId:0
            });
         }
    }, [productGroupContext, currentProductGroup]);

    const [productGroup, setProductGroup] = useState({
        _id:null,
        name:'',
        baseProductGroupId:0
    });

    const {name, baseProductGroupId} = productGroup;

    const onChange = (e) => {
        setProductGroup({...productGroup, [e.target.name]:e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(currentProductGroup == null){
            addProductGroup(productGroup);
        }
        else{
            updateProductGroup(productGroup);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();

        setProductGroup({
            name:'',
            baseProductGroupId:0
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h4 className='text-header'>{currentProductGroup?'Edit':'Add'} Product Group</h4>
            <input type="text" placeholder="Enter Name..." name="name" value={name} onChange={onChange}></input>
            <div>
            <button type="submit" className='btn btn-secondary btn-block'>
                        {currentProductGroup?'Update Product Group':'Add Product Group'}
            </button>
            </div>
            {currentProductGroup && (
                <div><button  className='btn btn-light btn-block' onClick={clearAll} >Clear</button></div>
            )
            }
        </form>
    );
}

export default ProductGroupForm;