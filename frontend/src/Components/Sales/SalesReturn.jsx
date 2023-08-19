import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SalesReturn = () => {

    const [returnsData, setReturnsData] = useState([])
    const [return_date, setReturnDate] = useState(new Date()) 
    const [order_id, setOrderId] = useState('')
    const [customer_id, setCustomerId] = useState('')
    const [customerName, setCustomername] = useState('')
    const [order_number, setOrdernumber] = useState('')
    const [items, setItems] = useState([{ item: "", quantity: "", item_name: ""},])
    const [item_id, setItemId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [returned_quantity, setReturnQty] = useState('')
    const [return_reason, setReason] = useState('')

    const navigate = useNavigate()    

    const returnApi = 'http://localhost:5000/api/viewreturns'
    const searchorderApi = 'http://localhost:5000/api/getorder'
    const addNewReturnApi = 'http://localhost:5000/api/addsalesreturn'
    const addInventoryApi = 'http://localhost:5000/api/updatereturns'
    const creditnoteApi = 'http://localhost:5000/api/newcreditnote'

    const getOrderDetails = (e) => {
        e.preventDefault()
        const input = {
            "order_number" : order_number
        }
        console.log(input)
        axios.post(searchorderApi,input).then(
            (response)=>{
                console.log(response.data)
                setOrderId(response.data[0]._id)
                setCustomerId(response.data[0].customer_id)
                setCustomername(response.data[0].customerName)
                const newitems = response.data[0].items.map((data)=>{
                    return {
                        item : data.item,
                        quantity : data.quantity,
                        item_name : data.item_name
                    }
                })
                console.log("newItems", newitems)
                setItems(newitems)
            }
        )       
        // show()
    }

    const handleItem = (e) => {
        setItemId(e.target.value)
        let itemId = e.target.value
        items.map((data)=>{
            if(data.item === itemId){
            setQuantity(data.quantity)
            }
        })
    }

    const handleReturns = () => {
        const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
        const return_number = "SR" + randomNum 
        const input = {
            order_id,
            return_number,
            return_date,
            customer_id,
            returned_item : item_id,
            ordered_quantity : quantity,
            returned_quantity,
            return_reason,
            status : "Checking"
        }
        console.log(input)
        axios.post(addNewReturnApi, input).then(
            (response)=>{
                alert(response.data.status)
                window.location.reload()
            }
        )
    }

    useEffect(() => {
        axios.post(returnApi).then(
            (response) => {
                setReturnsData(response.data)
            }
        )
    })

    const addToInventory = async (e, value) => {
        e.preventDefault();
        const input = { 
            id : await value._id,
            item : await value.returned_item,
            quantity : await value.returned_quantity,
            status : "Added to Inventory"
        }
        axios.post(addInventoryApi,input).then(
            (response) => {
                alert(response.data.status)
            }
        )

    }

    const addCreditNote = async (e, value) => {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
        const creditnote_number = "CN" + randomNum 

        const amount = Number(value.itemRate * value.returned_quantity)
        const input = {
            creditnote_number,
            creditnote_date : new Date(),
            salesreturn_id : await value._id,
            amount_to_return : amount,
            status : "Credited"
        }
        axios.post(creditnoteApi,input).then(
            (response) => {
                alert(response.data.status)
                navigate('/creditnotes')
            }
        )
    }
    
  return (
    <div>
        <Header/>
        <div className="container" style={{marginTop:"120px"}}>
        <p className='text-center text-dark' style={{ fontSize: '25px'}}>Sales Returns</p>
        <div className="d-flex flex-row-reverse mb-4">
            <button className="btn text-light btn-dark" data-bs-toggle="modal" data-bs-target="#returnsModal" style={{backgroundColor:'#9332c7'}}>Add New</button>
        </div>

        {/* modal for adding new payment */}
        <div className="modal fade modal-dialog modal-lg" id='returnsModal' tabIndex="-1" aria-labelledby='returnsModalLabel' aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="btn-close" data-bs-dismiss="modal" aria-label='Close'></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-center text-primary' style={{ fontSize: '21px' }}>New Returns</p>
                        <form className='row col-sm-12 col-md-6 mx-auto'>

                            <div className="form-group mb-2">
                                <label style={{marginRight:"30px"}}>Returned Date  :</label>
                                <input type='date' className='from-control' maxDate={new Date()} onChange={(e) => setReturnDate(e.target.value)} />
                            </div>

                            <label>Order Number</label>
                            <div className="d-flex">
                            <input type="text" className='form-control' onChange={(e)=>setOrdernumber(e.target.value)}/>
                            <button className="btn btn-dark ms-1" onClick={getOrderDetails}>show</button> 
                            </div>
                            <p></p>

                            <label>Customer Name</label>
                            <input type="text" className="form-control" disabled={true} defaultValue={customerName} />
                            <p></p>
                            
                            <label>items</label>
                            <select className="form-select"  onChange={handleItem}>
                            <option value="" selected  disabled={true}> Select Item</option>
                            {items.map((itemdata, index) => {
                                return (
                                    <option  key={index} value={itemdata.item}>{itemdata.item_name}</option>
                                )
                            })}
                            </select>    
                            <p></p>
                                    
                            <label>Ordered Quantity</label>
                            <input type="text" readOnly value={quantity} className="form-control" />                            
                            <p></p>

                            <label>Returned Quantity</label>
                            <input type="text" className="form-control" onChange={(e)=>{setReturnQty(e.target.value)}}/>

                            <label>Reason</label>
                            <input type="text" className="form-control" onChange={(e)=> setReason(e.target.value)}/>

                        </form>
                    </div>
                    <div className="modal-footer border ">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>        
                        <button type="button" className="btn text-light" data-bs-dismiss="modal" style={{backgroundColor:'#480c68'}} onClick={handleReturns}>Save</button>
                    </div>
                </div>
            </div>
        </div>


            <div className='table-responsive'>
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr className='text-center'>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Returns Number</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Order Number</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Returned Date</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Customer Name</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item Name</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Ordered Quantity</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item Rate</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Returned Quantity</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Reason</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Status</th>
                            <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnsData.map((value, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td>{value.return_number}</td>
                                    <td>{value.orderNumber}</td>
                                    <td>{moment(value.return_date).format('DD-MM-YYYY')}</td>
                                    <td>{value.customerName}</td>
                                    <td>{value.itemName}</td>
                                    <td>{value.ordered_quantity}</td>
                                    <td>{value.itemRate}</td>
                                    <td>{value.returned_quantity}</td>
                                    <td>{value.return_reason}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Checking" && (
                                            <button className="btn btn-success" onClick={(e) => {addToInventory(e, value)}}>Add Inventory</button>
                                        )}
                                        {value.status === "Added to Inventory" && (
                                            <button className="btn btn-warning" onClick={(e) => {addCreditNote(e, value)}}>Credit Notes</button>
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
