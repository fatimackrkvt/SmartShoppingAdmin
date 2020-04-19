import React from 'react';
import {Link} from 'react-router-dom';

function TreeMenu() {
    return (
        <div style={treeMenuStyle}>
            <ul  className="navbar-nav ml-auto">
                <li className="nav-item"> <Link  to="/Grocery" >Grocery</Link> </li>
                <li className="nav-item"> <Link  to="/ProductGroup" >Product Group</Link> </li>
                <li className="nav-item"> <Link  to="/Product" >Product</Link> </li>               
            </ul>
        </div>
    );
}

const treeMenuStyle = {
    backgroundColor: 'lightgrey',
    height:'100%',
    body:'100%'
}

export default TreeMenu;