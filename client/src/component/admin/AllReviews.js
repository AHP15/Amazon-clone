import { Button } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../slices/adminSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from "../../MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from '@mui/x-data-grid';


function AllReviews(){
    const {reviews} = useSelector(selectAdmin);
    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
    
          cellClassName: (params) => {
            return params.getValue(params.id, "rating") >= 3
              ? "greenColor"
              : "redColor";
          },
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
                <Button
                  onClick={() =>{}}
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      reviews &&
        reviews.flat().forEach((item) => {
          rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
          });
        });
    return (
        <div>
            <MetaData title="all reviews" />
            <Sidebar />
            <div className='product_table'>
            <h1>ALL REVIEWS</h1>
            {reviews && reviews.length > 0 && (
               <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            )}
            </div>
        </div>
    );
}

export default AllReviews;