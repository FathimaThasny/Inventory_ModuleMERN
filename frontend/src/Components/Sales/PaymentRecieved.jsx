import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import axios from 'axios'
import DatePicker from "react-datepicker";

export const PaymentRecieved = () => {

    const [paymentsData, setpaymentsData] = useState([])
    const [customerData, setcustomerData] = useState([])
    const [customer_id, setcustomer_id] = useState('')
    const [payment_mode, setPaymentMode] = useState('')
    const [customer_email, setCustomer_mail] = useState('')
    const [customer_address, setCustomer_address] = useState('')
    // const [custom, setInvoiceData] = useState([])
    const [totamount, setAmount] = useState('')
    const [customer_name, setCustomer_name] = useState('')
    const [invoice_id, setInvoiceId] = useState('')
    const [payment_date, setPaymentDate] = useState(new Date())
    const [invoiceNumber, setInvoiceNumber] = useState('')

    const viewpaymentApi = 'http://localhost:5000/api/viewallpayments'
    const customerApi = 'http://localhost:5000/api/viewcustomers'
    const fetchinvoiceApi = 'http://localhost:5000/api/getinvoice'
    const paymentApi = 'http://localhost:5000/api/newpayment'


    useEffect(()=>{
        axios.post(viewpaymentApi).then(
            (response)=>{
                setpaymentsData(response.data)
            }
        )

        axios.post(customerApi).then(
            (response)=>{
                setcustomerData(response.data)
            }
        )
    },[customerData])

    const handleCustomerChange = (e) => {
        const cust_id = e.target.value
        // console.log(cust_id)
        // console.log("value",cust_id)
        // console.log(customerData)
        setcustomer_id(e.target.value)
        const selectedCustomer = customerData.find(customer => customer._id === e.target.value)
        setCustomer_address(selectedCustomer.billing_address)
        setCustomer_mail(selectedCustomer.email);
        // setCustomer_name(selectedCustomer.name)
        console.log(selectedCustomer)
    }

    const getInvoiceId = (e) =>{
        e.preventDefault()
        const invoice_number = invoiceNumber
        console.log(invoice_number)
        const input = {
        "invoice_number" : invoice_number
        }
        axios.post(fetchinvoiceApi,input).then(
        (response)=>{
        setcustomer_id(response.data[0].customer_id)
        setCustomer_name(response.data[0].customerName)
        setCustomer_address(response.data[0].customerAddress)
        setCustomer_mail(response.data[0].customerMail)
        setAmount(response.data[0].totalPrice)
        setInvoiceId(response.data[0]._id)
        // handleCustomerChange(response)
        }
        )
        }

    const clickClose = () =>{
        window.location.reload()
    }

    const makepayment = (e) =>{
        e.preventDefault()
        const input = {
            customer_id,
            payment_date,
            invoice_id,
            amount : Number(totamount),
            payment_mode,
            status : "Payment Done"
        }
        console.log(input)
        axios.post(paymentApi,input).then(
            (response) => {
                alert(response.data.status)
            }
        )
    }

  return (
    <div>
        <Header/>
        <div style={{marginTop : "8em"}}>
        <p className='text-center text-dark mt-3' style={{ fontSize: '25px'}}>Payments List</p>
            <div className="row"  style={{marginRight:'160px'}}>
                <div className="d-flex flex-row-reverse mb-4">
                    <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#paymentModal" style={{backgroundColor:'#9332c7'}}>+ New Payment</button>
                </div>

                {/* modal for adding new payment */}
                <div className="modal fade modal-dialog modal-lg" id='paymentModal' tabIndex="-1" aria-labelledby='paymentModalLabel' aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn-close" data-bs-dismiss="modal" aria-label='Close'></button>
                            </div>
                            <div className="modal-body">
                                <p className='text-center text-primary' style={{ fontSize: '21px' }}>New Payment</p>
                                <form className='row col-sm-12 col-md-6 mx-auto'>

                                    <div className="form-group mb-2">
                                    <label className='me-5 '>Payment Date</label>
                                    <DatePicker selected={payment_date} maxDate={new Date()} onChange={(payment_date) => setPaymentDate(payment_date)} ></DatePicker>
                                    </div>

                                    <label>Invoice Number</label>
                                    <div className="d-flex">
                                    <input type="text" name='invoice_number' className='form-control' onChange={(e)=>setInvoiceNumber(e.target.value)}/>
                                    <button className="btn btn-dark ms-1" onClick={getInvoiceId}>show</button> 
                                    </div>
                                    <p></p>

                                    <label>Customer Name</label>
                                    <input type="text" disabled={true} defaultValue={customer_name} />
                                    <p></p>

                                    <label>Email</label>
                                    <input type="email" disabled={true} defaultValue={customer_email} />
                                    <p></p>
                                    
                                    <label>Billing Address</label>
                                    <input type="text" defaultValue={customer_address} disabled={true} />
                                    <p></p>

                                    <label>Mode of Payment</label>
                                    <select className="form-select" value={payment_mode} onChange={(e) => { setPaymentMode(e.target.value) }}>
                                        <option value="" disabled={true}>Select Payment</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="Online">Online</option>
                                    </select>
                                    <p></p>                                 

                                    <label>Amount</label>
                                    <input type="text" disabled={true}  defaultValue={totamount}/>
                                    <p></p>

                                </form>
                            </div>
                            <div className="modal-footer border ">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clickClose}>Close</button>
                                <button type="button" className="btn text-light" data-bs-dismiss="modal" style={{backgroundColor:'#480c68'}} onClick={makepayment}>Add Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row' style={{marginRight: '10em',marginLeft:'10em'}}>
            <div className='table-responsive ' >
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Date</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Customer Name</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Address</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Invoice Number</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Payment Mode</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsData.map((value, index) => {
                            return (
                                <tr className='text-center' key={index}>
                                    <td >{moment(value.payment_date).format('DD-MM-YYYY')}</td>
                                    <td>{value.customerName}</td>
                                    <td>{value.customerAddress}</td>
                                    <td>{value.invoiceNumber}</td>
                                    <td>{value.payment_mode}</td>
                                    <td className='text-end'>{value.amount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
  )
}
