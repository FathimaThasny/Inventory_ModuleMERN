import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ManagePurchaseOrder = () => {

    const navigate = useNavigate()
    const [purchaseData, setpurchaseData] = useState([])

    const viewpurchaseApi = 'http://localhost:5000/api/orders'
    const purchasebillApi = 'http://localhost:5000/api/addbillpayment'

    useEffect(()=>{
        axios.post(viewpurchaseApi).then(
            (response)=>{
                // console.log('View purchase response', response.data);
                setpurchaseData(response.data)
            }
        )
    })

    const goToBill = async (e, value) => {
        const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
        const bill_number = "PB" + randomNum 
        const input = {
            bill_number,
            bill_date : new Date(),
            purchase_id : await value._id,
            vendor_id : await value.vendor_id,
            status : "Bills Received"
        }
        axios.post(purchasebillApi,input).then(
            (response) => {
                alert(response.data.status)
                navigate('/viewbills')
            }
        )
    }

    const goToPurchase = () => {
        navigate('/purchaseorder')
    }
  return (
    <div>
        <Header/>
        <div className="container">
            <p className='text-center text-dark' style={{ fontSize: '25px', marginTop:"80px" }}>Purchase Orders List</p>

            <button className="btn btn-dark mb-4" style={{backgroundColor:'#9332c7'}} onClick={goToPurchase}>New Purchase</button>

            <div className="table table-responsive">
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Purchase Number</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Date</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Name</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Email</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Quantity</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Price</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Total</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Status</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseData.map((value, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td>{value.order_number}</td>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.vendorName}</td>
                                    <td>{value.vendorMail}</td>
                                    <td>{value.items.map(data => {
                                        return ( <tr>
                                            <td>{data.item_name}</td>
                                        </tr> )
                                    })}</td>
                                    <td>{value.items.map(data => {
                                        return ( <tr> 
                                            <td>{data.quantity}</td>
                                        </tr> )
                                    })}</td>                                    
                                    <td>{value.items.map(data => {
                                        return ( <tr>
                                            <td>{data.price}</td>
                                        </tr> )
                                    })}</td>
                                    <td>{value.totalAmount}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Order Issued" && (
                                            <button className="btn btn-success" onClick={(e) => {goToBill(e, value)}}>Bill</button>
                                        )}
                                    </td>
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
