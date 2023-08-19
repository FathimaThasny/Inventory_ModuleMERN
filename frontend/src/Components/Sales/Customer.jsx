import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import axios from 'axios';

export const Customer = () => {

    const [customerData, setCustomerData] = useState([]);
    const [input,setInput] = useState({})

    const addApi = 'http://localhost:5000/api/addcustomer'
    const editApi = 'http://localhost:5000/api/editcustomer'

    // const navigate = useNavigate();
    const setUser =(id,name,email,contact_number,billing_address) => {
        // e.preventDefault();
        console.log("inside SetUser")
        console.log(name)
        
        setName(name)
        setEmail(email)
        setPhoneNumber(contact_number)
        setBillingAddress(billing_address)
        setId(id)
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    const [_id,setId] = useState('')

    useEffect(() => {
        const getCustomer = async () => {
            const response = await axios.post('http://localhost:5000/api/viewcustomers');
            if (response && response.data) {
                setCustomerData(response.data);
            }
        }
        getCustomer();
    }, [])

    const changeData = (e)=>{
        setInput({
            ...input,[e.target.name]:e.target.value
        })
    }

    const addCustomer = async()=>{
        console.log(input)
        axios.post(addApi,input).then(
            (response)=>{
                alert(response.data.status)
            }
        )
        window.location.reload()
    }

    const updateCustomer = async()=>{
        const data = {
            "_id" : _id,
            "name" : name,
            "email" : email,
            "contact_number" : contact_number,
            "billing_address" : billing_address
        }
        console.log(data)
        axios.post(editApi,data).then(
            (response)=>{
                alert(response.data.status)
            }
        )
        window.location.reload()
    }

  return (
    <div className='root'>
        <Header/>
        <div className="container " style={{marginTop: "150px"}}>
            <div className="col-12 d-flex flex-row ms-5 ps-5">
                <h5>Customers List:</h5>
                <div className="d-flex col-8 flex-row-reverse ">
                    <button className='btn btn-dark justify-content-end me-5' style={{backgroundColor:'#9332c7'}} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-plus me-2"/>Add New</button>
                </div>
            </div>
            
            <div className="col col-9 ms-5 ps-5">
            {/* modal for adding customer */}
            <div className="modal fade modal-dialog modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content border-2 border-dark">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-center text-dark' style={{ fontSize: '21px' }}>New Customer</p>
                        <form className='row col-sm-12 col-md-6 mx-auto'>
                            <label>Name</label>
                            <input type="text" name='name' onChange={changeData} />
                            <p></p>

                            <label>Email</label>
                            <input type="email" name='email' onChange={changeData}  />
                            <p></p>

                            <label>Phone Number</label>
                            <input type="number" name='contact_number' onChange={changeData} />
                            <p></p>

                            <label>Billing Address</label>
                            <input type="text" name='billing_address' onChange={changeData} />
                            <p></p>

                        </form>
                    </div>
                    <div className="modal-footer border ">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark text-light" onClick={addCustomer} data-bs-dismiss="modal" style={{backgroundColor:'#9332c7'}}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        {/* end of modal */}
        </div>

            <div className="col col-9 ms-5 ps-5">
                {/* modal for updation */}
                  <div className="modal modal-dialog modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content border-2 border-dark">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-center text-dark' style={{ fontSize: '21px' }}>Update Customer</p>
                        <form className='row col-sm-12 col-md-6 mx-auto'>
                            <label>Name</label>
                            <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                            <p></p>

                            <label>Email</label>
                            <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            <p></p>

                            <label>Phone Number</label>
                            <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={contact_number} />
                            <p></p>

                            <label>Billing Address</label>
                            <input type="text" onChange={(e) => { setBillingAddress(e.target.value) }} value={billing_address} />
                            <p></p>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark" style={{backgroundColor:'#9332c7'}} data-bs-dismiss="modal" onClick={updateCustomer}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
            {/* end of modal */}
    
            {/* display customer details */}
            <table className="table table-bordered border-dark mt-3">
                <thead>
                    <tr className='text-center'>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Sl No.</th>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Name</th>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Email</th>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Contact Number</th>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Billing Address</th>
                        <th scope="col" className='text-light' style={{backgroundColor:'#9332c7'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData.map(
                        (value,index) => {
                        return <tr className='text-center' key={value._id}>
                                <td>{index+1}</td>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.contact_number}</td>
                                <td>{value.billing_address}</td>
                                <td>
                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {setUser(value._id,value.name,value.email,value.contact_number,value.billing_address) }}>
                                    <i className="bi bi-pencil"></i>                                        
                                    </button>
                                </td>
                               </tr>
                        
                    })}
                </tbody>
            </table>
            </div>
            </div>
        
        
        
    </div>
  )
}
