import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '../Navbar/Header'
import { useNavigate } from 'react-router-dom'

export const Displayitem = () => {

    const viewApi = "http://localhost:5000/api/viewitems"

    const [data,setData] = useState([])

    const navigate = useNavigate()

    const adjust = async (e, item) => {
        e.preventDefault();
        // console.log(item.opening_stock)
        // console.log(item.selling_price)
        sessionStorage.setItem('item_id', item._id);
        sessionStorage.setItem('Openingstock', item.opening_stock)
        sessionStorage.setItem('Sellingprice', item.selling_price);
        sessionStorage.setItem('Itemname', item.item_name);
        navigate('/adjustform', { replace: true });
    }

    const BtnAddNew = ()=>{
        navigate("/additem",{replace :true})
    }

    useEffect(()=>{
        axios.get(viewApi).then(
            (response)=>{
                console.log(response.data)
                setData(response.data)
            }
        )
    },[])

  return (
    <div className='root'> 
        <Header/>
        <div className="container" style={{marginTop :"70px"}}>
            <div className="row ">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 m-5 ms-0">
                <h4 className='text-center pb-0'>Items in Stock</h4>
                    {/* <div className="col-12 d-flex flex-row ms-5 ps-5"> */}
                        <div className="d-flex col-12 mb-1 ms-5 flex-row-reverse ">
                            <button className='btn btn-dark justify-content-end me-5' onClick={BtnAddNew}><i className="bi bi-plus me-2"></i>Add New</button>
                        </div>
                    {/* </div> */}
                    <table className="table table-bordered border-dark">
                        <thead >
                            <tr>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item Name</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Image</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Description</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Unit</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Weight</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Dimensions</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Brand</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Manufacturer</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Preferred Vendor</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Cost Price</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Selling Price</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Opening Stock</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Reorder Point</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col"></th>                             
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item=>{
                                return <tr key={item._id}>
                                    <td>{item.item_name}</td>
                                    <td><img src={'http://localhost:5000/' + item.image} alt={item.image} style={{width:"70px",height:"70px"}}></img></td>
                                    <td>{item.description}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.dimentions}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{item.preferred_vendor}</td>
                                    <td>{item.cost_price}</td>
                                    <td>{item.selling_price}</td>
                                    <td>{item.opening_stock}</td>
                                    <td>{item.reorder_point}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={(e) => { adjust(e, item) }}>Adjust/Edit</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
