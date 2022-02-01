import React, { useEffect } from 'react'
import MetaData from '../../MetaData';
import Circle from './Circle';
import Sidebar from './Sidebar';
import "../../styles/admin/Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminProducts, getAdminUsers, getAllReviews } from "../../service/adminService";
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../service/orderService';
import { selectAdmin } from '../../slices/adminSlice';
import { selectOrders } from '../../slices/orderSlice';
Chart.register(...registerables);

function DashBoard() {
  
  const dispatch = useDispatch();
  const { totalAmount, products, users } = useSelector(selectAdmin);
  const { allArders } = useSelector(selectOrders);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };

    useEffect(() => {
        getAdminProducts(dispatch);
        getAllOrders(dispatch);
        getAdminUsers(dispatch);
        getAllReviews(dispatch);
    }, [dispatch]);

    return (
        <div className='dasboard'>
            <MetaData title="Amazon-clone--admin" />
            <Sidebar />
            <div className='dashboard_summary'>
                <p className='total_amount'>Total Amount <br /> ${totalAmount}</p>
                <div className=''>
                   <Circle
                      title="Products"
                      number={`${products.length}`}
                      background="blue"
                      link="/admin/product/all" 
                    />
                   <Circle
                      title="Orders"
                      number={`${allArders.length}`}
                      background="green"
                      link="/admin/orders" 
                    />
                   <Circle
                      title="Users"
                      number={`${users.length}`}
                      background="gray"
                      link="/admin/users" 
                    />
                </div>

                <div className='line_chart'>
                    <Line data={lineState} />
                </div>

                <div className='doughnut_chart'>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
}

export default DashBoard;
