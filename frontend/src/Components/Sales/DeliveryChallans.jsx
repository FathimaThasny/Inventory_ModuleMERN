import React from 'react'
import { Header } from '../Navbar/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

export const DeliveryChallans = () => {

    const [challanData, setchallanData] = useState([])

    const navigate = useNavigate()

    const challanApi = 'http://localhost:5000/api/viewallchallan'

    useEffect(()=>{
        axios.post(challanApi).then(
            (response)=>{
                // console.log(response.data)
                setchallanData(response.data)
            }
        )
    })

    const goToSales = ()=>{
        navigate('/managesales', { replace : true })
    }

  return (
    <div>
        <Header/> 
            <p className='text-center text-dark' style={{ fontSize: '25px', marginTop : '100px' }}>Delivery Challans</p>
            <button className="btn btn-dark mt-2 " style={{marginLeft: '108px', backgroundColor:'#9332c7'}} onClick={goToSales}>Generate Delivery Challans</button>
            <br /> <br /> 
            <div className="row ms-5 ps-5 me-5 pe-5">
            <div className='table-responsive '>
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Challan Number</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Date</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Customer Name</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Billing Address</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Order Number</th>
                            {/* <th scope="col">Order Items</th> */}
                            <th className='text-end text-light' style={{backgroundColor:'#9332c7'}} scope="col">Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challanData.map((value) => {
                            return (
                                <tr key={value._id}>
                                    <td className='text-center'>{value.challan_number}</td>
                                    <td className='text-center'>{moment(value.delivery_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-center'>{value.customerName}</td>
                                    <td className='text-center'>{value.customerAddress}</td>
                                    <td className='text-center'>{value.salesOrderNumber}</td>
                                    {/* <td>{value.salesOrderItems}</td> */}
                                    <td className='text-end'>{value.totalPrice}</td>
                                    {/* <td>
                                        <button className="btn btn-warning" onClick={(e) => { generateChallan(e, value) }}>Display Challans</button> 
                                   </td> */}
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
