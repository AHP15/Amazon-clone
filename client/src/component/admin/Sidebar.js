import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
import Logo from '../user/Logo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import "../../styles/admin/Sidebar.css";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useDispatch } from 'react-redux';
import { CLEAR_EDIT_PRODUCT } from "../../slices/adminSlice";

function Sidebar() {
    const dispatch = useDispatch();
    return (
        <div className='sidebar'>
            <Link to="/">
               <Logo />
            </Link>
            <Link to="/admin/dashboard">
              <p>
                <DashboardIcon /> Dashboard
              </p>
            </Link>
            <TreeView
               aria-label="file system navigator"
               defaultCollapseIcon={<ExpandMoreIcon />}
               defaultExpandIcon={<ChevronRightIcon />}
               sx={{ maxWidth: 400, overflowY: 'auto' }}
            >
               <TreeItem nodeId="1" label="Products">
                   <Link to="/admin/product/all">
                       <TreeItem nodeId="2" label="all" icon={<PostAddIcon />} />
                   </Link>
                   <Link onClick={() =>{dispatch(CLEAR_EDIT_PRODUCT())}} to="/admin/product/new">
                       <TreeItem nodeId="3" label="create" icon={<AddIcon />} />
                   </Link>
               </TreeItem>
            </TreeView>
            <Link to="/admin/orders">
                <p><ListAltIcon /> Orders</p>
            </Link>
            <Link to="/admin/users">
                <p><PeopleIcon /> Users</p>
            </Link>
            <Link to="/admin/reviews">
                 <p><RateReviewIcon /> Reviews</p>
            </Link>
        </div>
    )
}

export default Sidebar;
