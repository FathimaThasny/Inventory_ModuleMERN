import React from 'react'
import { Header } from '../Navbar/Header'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

export const ManageSales = () => {

  const [ordersList, setOrdersList] = useState([]);
  const [items, setItems] = useState([{ item: "", quantity: ""},])

  const navigate = useNavigate()

  const orderApi = 'http://localhost:5000/api/displaysales'
  const packageApi = 'http://localhost:5000/api/newpackages'
  const challanApi = 'http://localhost:5000/api/createchallan'
  const invoiceApi = 'http://localhost:5000/api/newinvoice'

  useEffect( () => {

    axios.post(orderApi).then(
      (response)=>{
        // console.log(response.data)
        setOrdersList(response.data)
      }
    )

  })

  const goToPackages = () => {
    navigate('/viewpackages', { replace: true })
  }

  const showChallans = () => {
    navigate('/deliverychallan', { replace : true })
  }

  const goToInvoices = () => {
    navigate('/invoicelist', { replace : true })
  }

  const Pack = async (e, value) => {
    e.preventDefault()
    const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
    const package_number = "PK" + randomNum // adding string PK in the front
    // console.log("random", package_number)
    console.log("pack")
    console.log(value)
    handleAddItem(value)
    
    console.log("items:")
    console.log(items)
    let input = {
        package_number,
        date : new Date(),
        customer_id : await value.customer_id,
       items,
        order_id : await value._id,
        status : "Packed"
    }
    console.log(input)

    axios.post(packageApi,input).then(
        (response)=>{
            alert(response.data.status)
        }
    )
  }

  

  const handleAddItem = (value) => {
    const newItems = value.items.map((data)=>{
        return {
            item : data.item,
            quantity : data.quantity,
            item_name : data.item_name
        }
      })

      console.log("newItems", newItems)
      items.splice(0, items.length, ...newItems);
       
  }

  const Challan = async (e, value) => {
    e.preventDefault();

    const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
    const challan_number = "CH" + randomNum // adding string CH in the front

    let input = {
        challan_number,
        delivery_date : new Date(),
        customer_id : await value.customer_id,
        order_id : await value._id,
        // items[0].item : await value.item[0].item,
        status :"Shipped"
    }
    console.log(input)

    axios.post(challanApi,input).then(
        (response)=>{
            alert(response.data.status)
        }
    )
  }

  const Invoice = async (e, value) => {
    e.preventDefault()

    const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
    const invoice_number = "IN" + randomNum // adding string IV in the front

    let input = {
        invoice_number,
        invoice_date : new Date(),
        order_id : await value._id,
        customer_id : await value.customer_id,
        payment_status : "Invoiced"
    }

    axios.post(invoiceApi,input).then(
        (response) => {
            alert(response.data.status)
        }
    )
  }

  const newOrder = ()=> {
    navigate('/newsalesorder')
  }

  const showRetrns = () => {
    navigate('/salesreturns')
  }

  return (
    <div>
      <Header/>
      
            <button className="btn btn-dark  me-2 " style={{marginTop:"115px", marginLeft : '80px', backgroundColor:'#9332c7'}} onClick={goToPackages}>Packages List</button>
            <button className="btn btn-dark me-2 " style={{marginTop:"115px", backgroundColor:'#9332c7'}} onClick={showChallans}>Delivery Challans</button>
            <button className="btn btn-dark" style={{marginTop:"115px", backgroundColor:'#9332c7'}} onClick={goToInvoices}>Invoice</button>
            <button className='btn btn-dark' style={{marginTop:"115px", backgroundColor:'#9332c7', marginLeft: '56em'}} onClick={newOrder}> + New Order</button>
            <br /><br />
            <div className='table-responsive mt-3' style={{marginLeft:'80px', marginRight: '90px'}}>
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Order Number</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Date</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Customer Name</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Email</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Billing Address</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Items</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Quantity</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Price</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Total Price</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Status</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Manage Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.order_number}</td>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.customerName}</td>
                                    <td>{value.customerEmail}</td>
                                    <td>{value.customerAddress}</td>
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
                                    <td className='text-end'>{value.total_price}</td>
                                    <td className='text-center'>{value.order_status}</td>
                                    <td className='text-center'>
                                        {value.order_status === "Ordered" && (
                                            <>
                                                <button className="btn btn-warning" onClick={(e) => { Pack(e,value) }}>Pack</button>
                                            </>
                                        )}
                                        {value.order_status === "Packed" && (
                                            <>
                                                <button className="btn btn-primary" onClick={(e) => { Challan(e,value) }}>Generate Challan</button>
                                            </>
                                        )}
                                        {value.order_status === "Shipped" && (
                                            <>
                                                <button className="btn btn-success" onClick={(e) => { Invoice(e,value) }}>Generate Invoice</button>
                                            </>
                                        )}
                                        {value.order_status === "Invoiced" && (
                                            <>
                                                <p>Pending Payment/Completed</p>
                                            </>
                                        )}
                                        {value.order_status === " Return In Progress" &&
                                            <>
                                                <button className="btn btn-dark" onClick={showRetrns}>Show returns</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}
