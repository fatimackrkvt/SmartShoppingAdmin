import React, { Fragment, useContext, useEffect } from 'react';
import ProductGroupItem from './ProductGroupItem';
import ProductGroupForm from './ProductGroupForm';
import ProductGroupContext from '../context/ProductGroup/productGroupContext';

const ProductGroup = () => {

    const productGroupContext = useContext(ProductGroupContext);

    const { productGroupList, getProductGroups } = productGroupContext;

    useEffect( () => {
        getProductGroups();
    }, []);

    return (
        <div className='grid-2'>
             <div style={{ border:2}}> <ProductGroupForm></ProductGroupForm> </div>
             <div>
                {productGroupList.map(productGroup => 
                    <ProductGroupItem key={productGroup.id} productGroup={productGroup}></ProductGroupItem>
                ) }
             </div>
        </div>
    ); 
}

export default ProductGroup;