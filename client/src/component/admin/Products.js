import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../MetaData';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import "../../styles/admin/Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin , SET_EDIT_PRODUCT} from '../../slices/adminSlice';
import { getAdminProducts } from '../../service/adminService';

function Products() {
    
    const { loading, productsError, products } = useSelector(selectAdmin);
    const dispatch = useDispatch();
    useEffect(() =>{
      if(products.length === 0){
        getAdminProducts(dispatch);
      }
    }, [dispatch, products]);
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 250,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 100,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price($)",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link onClick={() =>{
                  dispatch(SET_EDIT_PRODUCT(params.getValue(params.id, "id")));
                }} to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    console.log("ok")
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
    ];

    const rows =[];
    products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

    return (
        <div className='product'>
            <MetaData title="admin-product" />
            <Sidebar />
            {loading? (
              <Skeleton />
            ):(
                        <div className='product_table'>
                          <h1>ALL PRODUCTS</h1>
                          <DataGrid
                           rows={rows}
                           columns={columns}
                           pageSize={10}
                           disableSelectionOnClick
                           className="productListTable"
                           autoHeight
                           />
                       </div>
            )}
        </div>
    )
}

export default Products;
