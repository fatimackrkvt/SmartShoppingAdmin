import React, {useState, useContext, useEffect} from 'react';
import ProductGroupContext from '../context/ProductGroup/productGroupContext';

const ProductGroupForm = () => {

    const productGroupContext = useContext(ProductGroupContext);

    const {addProductGroup, updateProductGroup, clearCurrent, currentProductGroup,
           productGroupList } = productGroupContext;

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
            _id:null,
            name:'',
            baseProductGroupId:0
        });
    }

    const handleBaseGroupChange = (event) => {
        let selectedValue = event.target.value;
        console.log("handleBaseGroupChange:selectedValue:",selectedValue);
        setProductGroup({...productGroup, baseProductGroupId:selectedValue });
    }

    return (
        <form onSubmit={onSubmit}>
            <h4 className='text-header'>{currentProductGroup?'Edit':'Add'} Product Group</h4>
            <input type="text" placeholder="Enter Name..." name="name" value={name} onChange={onChange}></input>
            <select name="baseProductGroupId" className="custom-search-select" onChange={handleBaseGroupChange}
                    value={baseProductGroupId}>
                <option>Select Base Product Group</option>
                {productGroupList.map((data) =>
                <option 
                    key={data._id}
                    value={data._id}
                >
                    {data.name}
                </option>
            )}
           </select>
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