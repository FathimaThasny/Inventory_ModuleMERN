import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewPurchaseOrder = () => {
    const navigate = useNavigate()

    const [vendorData, setVendorData] = useState([]);
    const [vendor_id,setVendorId] = useState('')
    
    const [itemData, setItemData] = useState([])
    const [item, setItemId] = useState('')
    const [item_name, setItemname] = useState('')
    const [quantity, setQuantity] = useState('')
    const [rate, setRate] = useState('')
    const [price, setPrice] = useState('');
    const [totalAmount, setTotalamount] = useState(0)

    const [date,setDate] = useState(new Date())

    //adding rows
    const [items, setItems] = useState([
        {item :"", rate : "", quantity : "", price : "", item_name : ""},
    ]);

    const vendorApi = 'http://localhost:5000/api/viewvendors'
    const itemApi = 'http://localhost:5000/api/viewitems'
    const newOredrApi = 'http://localhost:5000/api/neworder'

    useEffect(()=>{
        axios.post(vendorApi).then(
            (response)=>{
                // console.log(response.data)
                setVendorData(response.data)
            })

        axios.get(itemApi).then(
            (response)=>{
                setItemData(response.data)
            }
        )
    },[])

   
    //adding rows
    const handleItemChange = (e) =>{
        const selectedItems = itemData.find(items => items._id === e.target.value)
        setItemId(selectedItems._id)
        // console.log(selectedItems.selling_price)
        setItemname(selectedItems.item_name)
        setRate(selectedItems.cost_price)
        // handleFormChange(e)
    }

    const handlePrice = (e,index) =>{
        console.log(e.target.value)
        setQuantity(e.target.value)

        // const amount = rate * quantity
        setPrice(rate*e.target.value)

        
    }

    const handleAddItem = (e) => {
        e.preventDefault()
        console.log("btnadd")
        console.log(item)
        console.log(quantity)
        console.log(rate)
        console.log(price)
    
        if(totalAmount === 0){
            setTotalamount(price)
        }else{
            let amount = totalAmount + price
            console.log("amount", amount)
            setTotalamount(amount)
        }
    
        if(items[0].item === '' | items[0].quantity === '' | items[0].rate === '' | items[0].price === ''){
            console.log(" if")
            console.log(item)
            console.log(rate)
            console.log(quantity)
            setItems([{item,rate,quantity,price,item_name}])
        }
        else{
            console.log("else")
            setItems([
                  ...items,
                  {  item, rate, quantity, price, item_name},
                ]);
        }
        // console.log(items)
        setItemId('')
        setQuantity('')
        setRate('')
        setPrice('')
        // setQuantity('')
    };

    const BtnDelete = (e, index) => {
        e.preventDefault()
        console.log(index)
        let data = [...items]
        data.splice(index, 1)
        setItems(data)
    };

    const handleCancel = () => {
        window.location.reload(true)
    }

    const handleSave = (e) => {
        e.preventDefault()
        console.log(items)
        const randomNum = Math.floor(Math.random() * 10000); // generate a random number between 0 and 9999
        const order_number = "PO" + randomNum 
    
        const input ={
          order_number,
          date,
          vendor_id,
          items,
          totalAmount,
          status : "Order Issued",
        }
        console.log(input)
    
        axios.post(newOredrApi,input).then(
            (response) =>{
                alert(response.data.status)
                navigate('/managepurchase')
            }
        )
      };

  return (
    <div className='root'>
        <Header/>
        <div className="container " style={{marginTop:'160px'}}>
            <form className="form position-fixed mt-5 pt-5  start-50 translate-middle">
            <div className="row align-items-center mt-5 pt-5">
                <div className="row mt-5 d-flex">
                    
                    <div className="col col-6 col-sm-9 col-md-9 col-lg-9 col-xl-6 col-xxl-6 mt-3">
                        <label htmlFor="" className="form-label  mt-4"> <b> Date </b> </label>
                        <input type="date" className='form-control' onChange={(e) => setDate(e.target.value)} />
                    </div>
                
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-cl-6 col-xxl-6 mt-3">
                        <label htmlFor="" className="form-label mt-4"> <b> Vendor Name </b> </label>
                        <select className="form-select"  onChange={(e)=>{setVendorId(e.target.value)}}>
                            <option value="" selected disabled={true}> Select Vendor</option>
                            {vendorData.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select>                    
                    </div>
                </div>
                    
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-cl-12 col-xxl-12 mt-3">
                        <h6>ITEM DETAILS :</h6>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-cl-12 col-xxl-12 mt-3">
                        <table className="table table-bordered">
                            <thead className="table-success">
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Item</th>
                                    <th scope='col' className="text-end">Rate</th>
                                    <th scope='col' className="text-end">Quantity</th>
                                    <th scope='col' className="text-end">Amount</th>
                                    <th scope='col' className="NoPrint text-center">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map((items,index) => {
                                return ( <tr className='text-center' key={index}>
                                        <th scope='row'>{index+1}</th>
                                        <td><label>{items.item_name}</label></td>
                                        <td><label>{items.rate}</label></td>
                                        <td><label>{items.quantity}</label></td>
                                        <td><label>{items.price}</label></td>
                                        <td>                                        
                                            <button className="btn btn-sm btn-secondary" onClick={(e) => BtnDelete(e,index)}>x</button>
                                        </td>
                                    </tr>
                                )
                           })} 

                                    <tr>
                                        <td></td>
                                    <td>
                                        <select className="form-select" value={item} name='item' onChange={handleItemChange}>
                                            <option value="" selected disabled={true}> Select Item</option>
                                                {itemData.map((items, index) => {
                                                return (
                                                    <option key={index} value={items._id}>{items.item_name}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                    <td><input type="number" name='rate' className="form-control text-end" value={rate}/></td>
                                    <td><input type="number" name='quantity' className="form-control text-end" value={quantity} onChange={(e)=> {handlePrice(e)}}/></td>
                                    <td><input type="number" name='price' className="form-control text-end" value={price}/></td>
                                    <td>
                                        <button className="btn btn-sm btn-dark" onClick={handleAddItem}>Add</button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>    
                         <div className="row position-relative">
                            <div className="col-6 position-absolute top-0 start-50">
                                <div className="input-group">
                                    <span className='input-group-text'>Total Amount:</span>
                                    <input className='form-control' type="text" value={totalAmount}/>
                                </div>
                            </div> 
                        </div> 

                    </div>
                </div>
                <div className="row position-relative mt-5 pt-5">
                        <div className="col-6 position-absolute">
                            <div className="btn">
                                <button className='btn btn-primary' onClick={handleSave}>Confirm Order </button>
                                <button className='btn btn-secondary ms-5'onClick={handleCancel}>Cancel </button>
                            </div>
                        </div> 
                    </div>
            </form>
        </div>
    </div>
  )
}
