import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

export const Invoice = () => {

    const [invoiceData, setinvoiceData] = useState([])

    const navigate = useNavigate()

    const invoiceApi = "http://localhost:5000/api/viewinvoices"

    useEffect(()=>{
        axios.post(invoiceApi).then(
            (response)=>{
                // console.log(response.data)
                setinvoiceData(response.data)
                // console.log(response.data[2].orderItems)
            }
        )
    })

    const goToSales = () => {
        navigate('/managesales')
    }

    const displayInvoice = (e, value) => {
        e.preventDefault()
        const id = value._id
        sessionStorage.setItem("_id",id)
        navigate('/singleinvoice')
    }
  return (
    <div>
        <Header/>
        <p className='text-center text-dark' style={{ fontSize: '25px', marginTop : "100px" }}>Invoice</p>

            <button className="btn btn-dark" style={{backgroundColor:'#9332c7', marginLeft : '250px'}} onClick={goToSales}>Generate Invoice</button>
            <br /><br />

            <div className='table-responsive mt-2' style={{marginLeft:'250px', marginRight:'250px'}}>
                <table className="table table-bordered border-dark" >
                    <thead>
                        <tr className='text-center'>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Invoice Number</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Date</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Order Number</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Customer</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Items</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">quantity</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Price</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Total</th>
                            <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Payment status </th>
                            {/* <th className='text-light' style={{backgroundColor: "#9332c7" }} scope="col">Invoice</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.map((value, index) => {
                            return (
                                <tr className='text-center' key={index}>
                                    <td>{value.invoice_number}</td>
                                    <td>{moment(value.invoice_date).format('DD-MM-YYYY')}</td>
                                    <td>{value.orderNumber}</td>
                                    <td>{value.customerName}</td>
                                    <td>{value.orderItems.map(data => {
                                        return ( <tr key={index}>
                                            <td>{data.map(item => {
                                                return <tr> <td>{item.item_name}</td> </tr>
                                            })}</td>
                                        </tr> )
                                    })}</td>
                                    <td>{value.orderItems.map(data => {
                                        return ( <tr key={index}>
                                            <td>{data.map(item => {
                                                return <tr> <td>{item.quantity}</td> </tr>
                                            })}</td>
                                        </tr> )
                                    })}</td>
                                    <td>{value.orderItems.map(data => {
                                        return ( <tr key={index}>
                                            <td>{data.map(item => {
                                                return <tr> <td>{item.price}</td> </tr>
                                            })}</td>
                                        </tr> )
                                    })}</td>
                                    <td>{value.totalPrice}</td>
                                    <td>{value.payment_status}</td>
                                    
                                </tr>
                             )
                        })} 
                    </tbody>
                </table>
                
            </div>
    </div>
    // </div>
  )
}
