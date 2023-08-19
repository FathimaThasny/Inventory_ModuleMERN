import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import axios from 'axios'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export const InventoryAdjustment = () => {

    const apiUrl = "http://localhost:5000/api/viewadjustments"
    const [data,setData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        axios.post(apiUrl).then(
            (response)=>{
                console.log(response.data)
                setData(response.data)
            }
        )
    },[])

    const viewButton = ()=>{
        navigate('/viewitems')
    }

  return (
    <div className='root'>
        <Header/>
        <p className="text-center text-dark" style={{ marginTop:"90px", fontSize : "25px" }}>Inventory Adjustments</p>
        <button className="btn btn-dark mb-0 " style={{backgroundColor:'#9332c7', marginLeft: "120px"}} onClick={viewButton}>View Items</button>
        <div className="container" style={{marginTop:'30px'}}>
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="table-responsive">
                    <table className="table table-bordered border-dark table-hover">
                        <thead>
                            <tr>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}}scope='col'>Item Name</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Mode of Adjustment</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Quantity</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Value</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Reference Number</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Date</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Reason</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item=>{
                                return <tr className='text-center' key={item._id}>
                                    <td>{item.itemName}</td>
                                    <td>{item.mode_of_adjustment}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.value}</td>
                                    <td>{item.reference_number}</td>
                                    <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.description}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
