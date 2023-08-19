import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import axios from 'axios'

export const VendorCredits = () => {

    const [vendorsCreditData, setvendorCreditData] = useState([])

    const viewCreditsApi = 'http://localhost:5000/api/viewallcredits'

    useEffect(() => {
        axios.post(viewCreditsApi).then(
            (response) => {
                // console.log(response.data)
                setvendorCreditData(response.data)
            }
        )
    })


  return (
    <div>
        <Header/>

        <div className="container">
        <p className='text-center text-dark' style={{ fontSize: '25px', marginTop: "80px" }}>Vendor Credit Notes</p>

<div className="table table-responsive">
    <table className="table table-bordered border-dark">
        <thead>
            <tr>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Credit Date</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Credit Number</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Purchase Number</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Quantity</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Name</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Email</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Vendor's Address</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Amount</th>
                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            {vendorsCreditData.map((value, index) => {
                return (
                    <tr key={index} className='text-center'>
                        <td>{moment(value.credit_date).format('DD-MM-YYYY')}</td>
                        <td>{value.credit_number}</td>
                        <td>{value.purchaseNumber}</td>
                        <td>{value.purchaseItems.map(data =>{
                            return ( <tr>
                                <td>{data.map(item => {
                                    return ( <tr>
                                        <td>{item.item_name}</td>
                                    </tr> )
                                })}</td>
                            </tr> )
                        })}</td>
                        <td>{value.purchaseItems.map(data =>{
                            return ( <tr>
                                <td>{data.map(item => {
                                    return ( <tr>
                                        <td>{item.quantity}</td>
                                    </tr> )
                                })}</td>
                            </tr> )
                        })}</td>
                        <td>{value.vendorName}</td>
                        <td>{value.vendorMail}</td>
                        <td>{value.vendorAddress}</td>
                        <td>{value.totalAmount}</td>
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
