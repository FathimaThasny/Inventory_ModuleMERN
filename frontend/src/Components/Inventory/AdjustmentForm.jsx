import axios from 'axios'
import React, { useState } from 'react'
import { Header } from '../Navbar/Header'
import { useNavigate } from 'react-router-dom'

export const AdjustmentForm = () => {

    const addApi = "http://localhost:5000/api/adjustitem"

    const AdjustId = sessionStorage.getItem('item_id')
    const opening_stock = sessionStorage.getItem('Openingstock')
    const selling_price = sessionStorage.getItem('Sellingprice')
    // const itemname = sessionStorage.getItem('Itemname')

    const [quantity, setQuantity] = useState('')
    const [value, setValue] = useState('')
    const [mode_of_adjustment, setModeofAdjustment] = useState('')
    const [reference_number, setReference] = useState('')
    const [reason, setReason] = useState('')
    const [description, setDescription] = useState('')

    // console.log(opening_stock)

    const navigate = useNavigate()

    const btnCancel = ()=>{
        navigate('/viewitems')
    }

    const makeAdjust = async (e) =>{
        try{
            const input = {
                item_id : AdjustId,
                mode_of_adjustment,
                reference_number,
                date : new Date(),
                reason,
                description,
                quantity,
                value
            }
            console.log(input)
            axios.post(addApi,input).then(
                (response)=>{
                    alert(response.data.status)
                    setQuantity('')
                    setValue('')
                }
            )
                navigate('/adjustmentsmade')
        }catch(error){
            console.error(error.message);
        }
    }

  return (
    <div className='root'>
        <Header/>
        <div className="container"  style={{marginTop:"8em"}}>
            <form className="row col-sm-12 col-md-6 mx-auto mt-5 g-1">
                <label className="form-label">Mode of Adjustment</label>
                <select className="form-select w-100" value={mode_of_adjustment} onChange={(e)=>{ setModeofAdjustment(e.target.value)}}>
                    <option value="" disabled>----- Select -----</option>
                    <option value={'Quantity'}>Quantity</option>
                    <option value={'Value'}>Value</option>
                </select>

                {mode_of_adjustment === "Quantity" &&(
                    <div>
                        <label className="form-label mt-2 mb-0"><h6>Opening Stock : {<span>{opening_stock}</span>}</h6></label> <br />
                        <label className="form-label">New Quantity</label>
                        <input type="text" className="form-control" onChange={(e)=>{ setQuantity(e.target.value)}} value={quantity} placeholder='Quantity'/>
                    </div>
                )}

                {mode_of_adjustment === "Value" && (
                    <div>
                        <label className="form-label mt-2 mb-0"><h6>Selling Price :  {<span>{selling_price}</span>}</h6></label> <br />
                        <label className="form-label">New Selling Price</label>
                        <input type="text" className="form-control" onChange={(e)=>{ setValue(e.target.value)}} value={value} placeholder='Price'/>
                    </div>
                )}

                <label className="form-label">Reference Number</label>
                <input type="text" className="form-control" onChange={(e)=>{ setReference(e.target.value)}}/>

                <label className='form-label'>Reason</label>
                <input type="text" className="form-control" onChange={(e)=>{ setReason(e.target.value)}}/>

                <label className="form-label">Description</label>
                <input type="text" className="form-control" onChange={(e)=>{ setDescription(e.target.value)}}/>

                <button className="btn btn-dark mt-3" onClick={(e)=>{makeAdjust(e)}} style={{backgroundColor:'#9332c7'}}>Apply</button>
                <button className='btn btn-secondary  mt-3' onClick={btnCancel}> Cancel</button>
            </form>
        </div>
    </div>
  )
}
