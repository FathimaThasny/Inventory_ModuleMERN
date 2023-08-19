import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ViewBillsandPayments = () => {

    const [billsData, setbillsData] = useState([])
    const navigate = useNavigate()

    const billApi = 'http://localhost:5000/api/viewpayments'
    const vendorCreditApi = 'http://localhost:5000/api/newcredit'

    useEffect(()=>{
        axios.post(billApi).then(
            (response)=>{
                // console.log(response.data)
                setbillsData(response.data)
            }
        )
    },[])

    const addCreditNotes = async (e, value) => {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
        const credit_number = "CR" + randomNum 
        const input = {
            purchase_id : await value.purchase_id,
            credit_date : new Date(),
            credit_number,
            vendor_id : await value.vendor_id,
            status : "Payment Issued"
        }
        // console.log(input)
        axios.post(vendorCreditApi,input).then(
            (response)=>{
                alert(response.data.status)
                navigate('/vendorcredits')
            }
        )
    }

  return (
    <div>
        <Header/>

        <div className="container">
        <p className='text-center text-dark' style={{ fontSize: '25px', marginTop : "85px" }}>Bills and Payments List</p>

<div className="table table-responsive">
    <table className="table table-bordered border-dark" >
        <thead>
            <tr>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Bill Number</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Date</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Name</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Email</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Address</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Order Number</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Items</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Quantity</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Total Amount</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Status</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Manage</th>
            </tr>
        </thead>
        <tbody>
            {billsData.map((value, index) => {
                return (
                    <tr key={index} className='text-center'>
                        <td>{value.bill_number}</td>
                        <td>{moment(value.bill_date).format('DD-MM-YYYY')}</td>
                        <td>{value.vendorName}</td>
                        <td>{value.vendorMail}</td>
                        <td>{value.vendorAddress}</td>
                        <td>{value.OrderNumber}</td>
                        <td>{value.OrderItems.map(data => {
                            return ( <tr key={index}>
                                <td>{data.map(item => {
                                    return <tr> <td>{item.item_name}</td> </tr>
                                })}</td>
                            </tr> )
                        })}</td>
                        <td>{value.OrderItems.map(data => {
                            return ( <tr key={index}>
                                <td>{data.map(item => {
                                    return <tr> <td>{item.quantity}</td> </tr>
                                })}</td>
                            </tr> )
                        })}</td>
                        <td>{value.totalAmount}</td>
                        <td>{value.status}</td>
                        <td>
                            {value.status === "Bills Received" && (
                                <button className="btn btn-warning" onClick={(e) => {addCreditNotes(e,value)}}>Credit</button>
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
