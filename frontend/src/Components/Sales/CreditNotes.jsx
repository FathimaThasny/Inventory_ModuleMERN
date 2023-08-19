import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CreditNotes = () => {

    const [creditsNotesData, setcreditNotesData] = useState([])

    const navigate = useNavigate()

    const creditApi = 'http://localhost:5000/api/viewcreditnotes'

    useEffect(()=>{
        axios.post(creditApi).then(
            (response)=>{
                setcreditNotesData(response.data)
            }
        )
    })

    const addCredit = () => {
        navigate('/salesreturns')
    }

  return (
    <div>
        <Header/>
        <div className="container" style={{marginTop:"120px"}}>
        <p className='text-center text-dark' style={{ fontSize: '25px' }}>Credit Notes</p>

<button className="btn btn-dark" style={{backgroundColor:'#9332c7'}} onClick={addCredit}>Add Credit Notes</button>
<br /><br />
<div className='table-responsive'>
    <table className="table table-bordered border-dark">
        <thead>
            <tr className='text-center'>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Credited Date</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Credit Number</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Order Number</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Item </th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Returned Quantity</th>
                <th className='text-light' style={{backgroundColor:'#9332c7'}} scope="col">Amount Credited</th>
            </tr>
        </thead>
        <tbody>
            {creditsNotesData.map((value, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td>{moment(value.creditnote_date).format('DD-MM-YYYY')}</td>
                        <td>{value.creditnote_number}</td>
                        <td>{value.orderNumber}</td>
                        <td>{value.ItemId}</td>
                        <td>{value.Quantity}</td>
                        <td>{value.amount_to_return}</td>
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
