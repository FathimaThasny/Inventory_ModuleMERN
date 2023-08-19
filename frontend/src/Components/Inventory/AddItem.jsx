import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '../Navbar/Header'
import { useNavigate } from 'react-router-dom'

export const AddItem = () => {

    const addApi = "http://localhost:5000/api/additem"
    const Viewgroup = "http://localhost:5000/api/getgroup"
    const vendorApi = 'http://localhost:5000/api/viewvendors'


    const [input,setInput] = useState({})
    const [group,setGroup] = useState([])
    const [image,setImage] = useState([])
    const [group_id,setGroupid] = useState('')
    const [vendor_id, setVendorId] = useState('')
    const [preferred_vendor, setVendorName] = useState('')
    const [vendorData, setVendorData] = useState([])

    const navigate = useNavigate()

    const handleVendor = (e) => {
        
        setVendorId(e.target.value)
        const selectedVendor = vendorData.find(vendor => vendor._id === e.target.value)
        setVendorName(selectedVendor.name)
        
    }

    const addItem = async(e)=>{
        try{
            e.preventDefault();
            const formData = new FormData()
            formData.append('image', image)
            formData.append('group_id', group_id)
            formData.append('item_name',input.item_name)
            formData.append('unit',input.unit)
            formData.append('dimentions',input.dimentions)
            formData.append('weight',input.weight)
            formData.append('manufacturer',input.manufacturer)
            formData.append('brand',input.brand)
            formData.append('selling_price',input.selling_price)
            formData.append('cost_price',input.cost_price)
            formData.append('description',input.description)
            formData.append('opening_stock',input.opening_stock)
            formData.append('reorder_point',input.reorder_point)
            formData.append('preferred_vendor',preferred_vendor)
            formData.append('vendor_id', vendor_id)
            formData.append('created_At', new Date())

            console.log(formData)
            
            const respons = await axios.post(addApi,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            if(respons && respons.data.success){
                alert("Item Added Successfull")
            }

        }catch(error){
            console.error(error.message);
        }
        // axios.post(addApi,{...input, group_id : group_id, image: image})
        // .then((res)=>{
        //         console.log("response", res);
        //         alert(res.data.status)
        //     })
        navigate('/viewitems')
    }

    useEffect(()=>{
        axios.post(Viewgroup).then(
            (response)=>{
                setGroup(response.data)
        })
        axios.post(vendorApi).then(
            (response)=>{
                // console.log(response.data)
                setVendorData(response.data)
        })
    },[])

    const changeData = (e)=>{
        setInput({
            ...input,[e.target.name]:e.target.value
        })
        // console.log(input.unit)
    }



  return (
    <div className='root'>
        <Header/>
        <div className="container" style={{marginTop: "90px"}}>
            <form className="form justify-content-center m-5" encType='multipart/form-data'>
                <div className="row m-5 g-3">
                    <div className="dropdown col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xl-9 ">
                        <label htmlFor="" className="form-label ps-2">Item Group</label>
                        <select className='form-select w-100' name="group_id" value={group_id} onChange={(e)=>{ setGroupid(e.target.value)}}>
                            <option disabled>----- Select -----</option>
                            {group.map((item, index)=>{
                                return <option key={index}  value={item._id} >{item.group_label}</option>
                            })}
                        </select>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 ">
                        <label htmlFor="" className="form-label ps-2">Item Name</label>
                        <input type="text" name="item_name" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Description</label>
                        <input type="text" name="description" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Unit</label>
                        <input type="text" name='unit' className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Dimentions</label>
                        <input type="text" name="dimentions" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col-col-9 col-sm-9 colmd-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Weight</label>
                        <input type="text" name="weight" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Manufacturer</label>
                        <input type="text" name="manufacturer" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Brand</label>
                        <input type="text" name="brand" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Preferred Vendor</label>
                        <select className="form-select"  onChange={(e)=>{handleVendor(e)}}>
                            <option value="" selected disabled={true}> Select Vendor</option>
                            {vendorData.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select> 
                        {/* <input type="text" name="preferred_vendor" className="form-control" onChange={changeData}/> */}
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Cost Price</label>
                        <input type="text" name="cost_price" className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Selling Price</label>
                        <input type="text" name='selling_price' className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Opening Stock</label>
                        <input type="text" name='opening_stock' className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <label htmlFor="" className="form-label ps-2">Reorder Point</label>
                        <input type="text" name='reorder_point' className="form-control" onChange={changeData}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 d-flex flex-column">
                        <label htmlFor="" className="forl-label ps-2">Image of Item</label>
                        <input type="file" name="image"  onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </div>
                    <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <button className='btn btn-primary' onClick={(e)=>{addItem(e)}}>Add Item</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
