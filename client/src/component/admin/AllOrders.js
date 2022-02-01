import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../../MetaData';
import { selectOrders } from '../../slices/orderSlice';
import Sidebar from './Sidebar';
import { Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllOrders } from '../../service/orderService';

function AllOrders(){

    const { allArders } = useSelector(selectOrders);
    const dispatch = useDispatch();

    useEffect(() =>{
      if(allArders.length === 0){
        getAllOrders(dispatch);
      }
    }, [dispatch, allArders]);

    function deleteOrderHandler(){}
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount ($)",
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
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      allArders &&
      allArders.forEach((item) => {
          rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
          });
        });

    return (
        <div className='orders'>
            <MetaData title="Admin orders" />
            <Sidebar />
            <div className='product_table'>
                <h1>ALL ORDERS</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
            </div>
        </div>
    );
}

export default AllOrders;