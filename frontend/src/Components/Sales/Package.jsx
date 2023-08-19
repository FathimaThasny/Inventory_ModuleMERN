import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Package = () => {

    const [packageData, setPackageData] = useState([]);
    const [Items, setItems] = useState([])
    const [customerData, setcustomerData] = useState([]);
    const [customer_id,setCustomerId] = useState('')

    const packageApi = 'http://localhost:5000/api/allPackages'
    const customerApi = 'http://localhost:5000/api/viewcustomers'
    const filterApi = 'http://localhost:5000/api/viewapackage'

    const navigate = useNavigate()

    const goPack = () => {
        navigate('/managesales', { replace: true })
        console.log("navigate to manage order")
    }

    const getPackages = async () => {
        axios.post(packageApi).then(
        (response) => {
            console.log(response.data)
            setPackageData(response.data);
            // console.log(response.data.items)
        })
    }

    const handleItems = (index) => {
        console.log(packageData)
        setItems(packageData[index].items)
    }

    const filterPackage = () =>{
        console.log(customer_id)
        axios.post(filterApi,{'customer_id':customer_id}).then(
            (response)=>{
                console.log("filter")
                console.log(response.data)
                if((response.data === null) || (response.data === [ ]))
                {
                    alert('No Data Found')
                }else{
                setPackageData(response.data)
                }
            }
        )
    }

    useEffect(() => {

        // console.log("first")
        getPackages();

        axios.post(customerApi).then(
            (response)=>{
                // console.log(response.data)
                setcustomerData(response.data)
            })
    }, [])

  return (
    <div>
        <Header/>

        <div className="container">
        <p className='text-center text-dark' style={{ fontSize: '25px', marginTop: '100px' }}>Packages List</p>

            <button className="btn btn-dark" style={{backgroundColor:'#9332c7'}} onClick={goPack}>Go for Pack</button>

            <button className="btn btn-dark text-light ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Filter</button>

            <div className="modal fade modal-dialog modal-md" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content border-2 border-dark">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-primary' style={{ fontSize: '21px' }}>Select Customer</p>
                        <select className="form-select"  onChange={(e)=>{setCustomerId(e.target.value)}}>
                            <option value="" selected disabled={true}> Select Customer</option>
                            {customerData.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select>     
                    </div>
                    <div className="modal-footer border ">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn text-light" onClick={filterPackage} data-bs-dismiss="modal" style={{backgroundColor:'#9332c7'}}>Filter</button>
                    </div>
                </div>
            </div>
            </div>

            <div className='table-responsive mt-5'>  
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Package Number</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Package Date</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Customer Name</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Quantity</th>
                            <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((value, index) => {
                        return (
                            <tr className='text-center' key={index} >
                                <td>{value.package_number}</td>
                                <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                <td>{value.customerName}</td>
                                <td>{value.items.map(data => {
                                    return( <tr>
                                        <td>{data.item_name}</td> 
                                    </tr>
                                    )
                                })}</td>
                                 <td>{value.items.map(data => {
                                    return( <tr>
                                        <td>{data.quantity}</td> 
                                    </tr>
                                    )
                                })}</td>
                               
                                <td>{value.status}</td>
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
