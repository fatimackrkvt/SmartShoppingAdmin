import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ProductGroupContext from '../context/ProductGroup/productGroupContext';

const ProductGroupItem = ( {productGroup} ) => {

    const productGroupContext = useContext(ProductGroupContext);

    const { _id, name, baseProductGroupId} = productGroup;

    const onDelete = () => {
        productGroupContext.deleteProductGroup(_id);
        productGroupContext.clearCurrent();
    }

    const onEdit = () => {
        productGroupContext.setCurrent(productGroup);
    }

    return (
        <div className='cad bg-light'>
            <h3 className='text-primary text-left'> 
                {name}
            </h3>
            <p>
                <button className='btn btn-dark btn-sm' onClick={onEdit}> Edit </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}> Delete </button>
            </p>
        </div>
    );
}


ProductGroupItem.propTypes = {
    productGroup : PropTypes.object.isRequired
}
export default ProductGroupItem;