import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import $ from 'react-dom';

export const NewSalesOrder = () => {
    const navigate = useNavigate()

    const [customerData, setcustomerData] = useState([]);
    const [customer_id,setCustomerId] = useState('')

    const [itemData, setitemData] = useState([]);
    const [item, setItemId] = useState('')
    const [item_name, setItemname] = useState('')
    const [rate, setRate] = useState('')
    const [stock, setStock] = useState(0)
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [total_price, setTotal] = useState(0)

    const [date,setDate] = useState(new Date())
    const [LPO_number, setLPO] = useState('')
    const [sales_person, setSalesPerson] = useState('')

    const [visible, setVisible] = useState(false)

    const [items, setItems] = useState([
        {item :"", quantity : "", rate : "", price : "",item_name : "", stock: ""},
    ]);

    const customerApi = 'http://localhost:5000/api/viewcustomers'
    const itemApi = 'http://localhost:5000/api/viewitems'
    const newOredrApi = 'http://localhost:5000/api/createsales'


    useEffect(()=>{
        axios.post(customerApi).then(
            (response)=>{
                // console.log(response.data)
                setcustomerData(response.data)
                // console.log(customerData)
            })

            axios.get(itemApi).then(
                (res)=>{
                    // console.log('Item Data',res.data)
                    setitemData(res.data)
                }
            )       
    },[])

    const handleItemChange = (e) =>{
        const selectedItems = itemData.find(items => items._id === e.target.value)
        setItemId(selectedItems._id)
        // console.log(selectedItems.selling_price)
        setItemname(selectedItems.item_name)
        setRate(selectedItems.selling_price)
        setStock(selectedItems.opening_stock)
        console.log(selectedItems.opening_stock)
        // handleFormChange(e)
    }
    
    const handlePrice = (e,index) =>{
        console.log(e.target.value)
        setQuantity(e.target.value)

        // const amount = rate * quantity
        setPrice(rate*e.target.value)
        
        console.log("first")
        console.log(stock-e.target.value)
        setStock(stock-e.target.value)
        
    }


  const handleAddItem = (e) => {
    e.preventDefault()
    console.log("btnadd")
    console.log(item)
    console.log(quantity)
    console.log(rate)
    console.log(price)
    console.log(stock)

    if(total_price === 0){
        setTotal(price)
    }else{
        let amount = total_price + price
        console.log("amount", amount)
        setTotal(amount)
    }

    if(items[0].item === '' | items[0].quantity === '' | items[0].rate === '' | items[0].price === ''){
        console.log(" if")
        setItems([{item,quantity,rate,price,item_name,stock}])
        setVisible(true)
    }
    else{
        console.log("else")
        setItems([
              ...items,
              {  item, quantity, rate, price,item_name,stock},
            ]);
    }
    // console.log(items)
    setItemId('')
    setQuantity('')
    setRate('')
    setPrice('')
    setStock(0)
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
    const order_number = "SO" + randomNum 

    const input ={
      LPO_number,
      order_number,
      date,
      customer_id,
      items,
      total_price,
      order_status : "Ordered",
      sales_person
    }
    console.log(input)

    axios.post(newOredrApi,input).then(
        (response) =>{
            alert(response.data.status)
            navigate('/managesales')
        }
    )
  };

  return (
    <div className='root'>
        <Header/>
        <div className="container"  style={{marginTop:'13em', position: "sticky"}}>
            <form className="form position-fixed mt-5 pt-5  start-50 translate-middle" >
            <div className="row align-items-center mt-5 pt-5">

                {/* <div className="row mt-5"> */}

                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5 ">
                        <label htmlFor="" className="form-label"> <b> LPO Number </b> </label>
                        <input type="text" className='form-control' name='LPO_number' onChange={(e) => {setLPO(e.target.value)}}/>
                    </div>

                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-cl-6 col-xxl-6 mt-5">
                        <label htmlFor="" className="form-label"> <b> Date </b> </label>
                        <input type='date' className='form-control' onChange={(e) => setDate(e.target.value)} />
                        
                    </div>

                {/* </div> */}

                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-cl-6 col-xxl-6 mt-2">
                        <label htmlFor="" className="form-label"> <b> Customer Name </b> </label>
                        <select className="form-select"  onChange={(e)=>{setCustomerId(e.target.value)}}>
                            <option value=""  disabled={true}> Select Customer</option>
                            {customerData.map((item, index) => {
                                return (
                                    <option  key={index} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select>                    
                    </div>

                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-cl-6 col-xxl-6 mt-2">
                        <label htmlFor="" className="form-label"> <b> Sales Person </b> </label>
                        <input type="text" name='sales_person' className="form-control" onChange={(e) => setSalesPerson(e.target.value)}/>
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
                                    {/* <th>Test Quantity</th> */}
                                    <th scope='col' className="text-end">Amount</th>
                                    <th scope='col' className="NoPrint text-center">
                                    </th>
                                </tr>
                            </thead>
                            <tbody id='TBody'>
                                {/* <span> */}
                                {items.map((items,index) =>{
                                    return (<tr className='text-center' key={index}>
                                            <th scope='row'>{index+1}</th>
                                            <td><label>{items.item_name}</label></td>
                                            <td><label>{items.rate}</label></td>
                                            <td><label>{items.quantity}</label></td>
                                            <td><label>{items.price}</label></td>
                                            <td><button className="btn btn-sm btn-secondary" onClick={(e) => BtnDelete(e,index)}>x</button></td>
                                        </tr>
                                        )
                                })}

                                {/* </span> */}
                            {/* {items.map((item,index) => {
                                return  */}
                                <tr>
                                    <th scope='row'></th>
                                    <td>
                                        <select className="form-select" name="item" value={item} onChange={handleItemChange} >
                                            <option value="" defaultValue={"Delect"} disabled={true}> Select Item</option>
                                                {itemData.map((data, index) => {
                                                return (
                                                    <option key={index}  value={data._id}>{data.item_name}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                    <td><input type="text" name='rate' readOnly className="form-control text-end" value={rate} /></td>
                                    <td><input type="text" name='quantity' className="form-control text-end" value={quantity} onChange={(e)=>{handlePrice(e)}}/></td>
                                    {/* <td><input type="text" className="form-control" value={quantity} /></td> */}
                                    <td><input type="number" name='price' readOnly  className="form-control text-end"   value={price} /></td>
                                    <td>
                                        <button className="btn btn-dark" onClick={handleAddItem}>Add</button>

                                    </td>
                                </tr>
                           {/* })}                       */}
                            </tbody>
                        </table> 
                    </div>

                    <div className="row position-relative">
                        <div className="col-6 position-absolute top-0 start-50">
                            <div className="input-group">
                                <span className='input-group-text'>Total Amount:</span>
                                <input className='form-control' type="text" readOnly  name="total_price" value={total_price}/>
                            </div>
                        </div> 
                    </div>

                </div>

                <div className="row position-relative mt-5 pt-5">
                        <div className="col-6 position-absolute">
                        {visible &&
                            <div className="btn">
                                <button className='btn btn-primary' style={{backgroundColor:'#9332c7'}} onClick={handleSave}>Confirm Order </button>
                                <button className='btn btn-secondary ms-5' onClick={handleCancel}>Cancel </button>
                            </div>
                        }
                        </div> 
                    </div>
                
            </form>

            
        </div>
        
    </div>
  )
}
