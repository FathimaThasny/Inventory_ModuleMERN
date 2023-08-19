import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment';
import axios from 'axios';

export const InventoryAging = () => {

    const [itemsData, setItemsData] = useState([]);
    const itemApi = 'http://localhost:5000/api/viewitems'

    useEffect(()=>{
        axios.get(itemApi).then(
            (response) => {
                setItemsData(response.data)
            }
        )
    })

  return (
    <div>
        <Header/>
        <div className="container" style={{marginTop:"120px"}}>
        <p className='text-center text-dark' style={{ fontSize: '25px' }}>Inventory Aging Summary Report</p>

<div className='table-responsive mt-5'>
    <table className="table table-bordered border-dark">
        <thead>
            <tr className='text-center'>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item Name</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}}scope="col">0 to 30 Days</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}}scope="col">31 to 60 Days</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}}scope="col">61 - 90 Days</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}}scope="col">Above 90 Days</th>
            </tr>
        </thead>
        <tbody>
            {itemsData.map((value, index) => {
                const currentDate = moment(); // Current date and time
                const createdAtDate = moment(value.created_At); // Specific date
                const differenceInDays = currentDate.diff(createdAtDate, 'days');

                return (
                    <tr className='text-center' key={index}>
                        <td>{value.item_name}</td>
                        <td>{differenceInDays >= 0 && differenceInDays < 31 ? (value.opening_stock) : ('-')}</td>
                        <td>{differenceInDays > 30 && differenceInDays < 61 ? (value.opening_stock) : ('-')}</td>
                        <td>{differenceInDays > 60 && differenceInDays < 91 ? (value.opening_stock) : ('-')}</td>
                        <td>{differenceInDays > 90 ? (value.opening_stock) : ('-')}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
</div>
        </div>
    </div>
  )
}
