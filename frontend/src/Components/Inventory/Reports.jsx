import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import moment from 'moment';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export const Reports = () => {

    const [startdate,setStartdate] = useState(new Date())
    const [enddate, setEnddate]=useState(new Date())
    const [data,setData] =useState([])

    const reportApi = "http://localhost:5000/api/adjustmentreport"

    const handleSpecificDate = async () =>{
        try {
            const start = startdate
            const end = enddate
            const input = {
                start,
                end
            }
            console.log("input",input);
            axios.post(reportApi,input).then(
                (response)=>{
                    // console.log(response.data)
                    setData(response.data)
                }
            )
        } catch (error) {
            console.error(error.message);
        }
    }

    // useEffect(() => {
    //     axios.post(reportApi).then(
    //         (response) => {
    //             // console.log(response.data)
    //             setData(response.data)
    //         }
    //     )
    // })

    const reset = async () =>{
        setStartdate(new Date())
        setEnddate(new Date())
        window.location.reload()
    }

  return (
    <div>
        <Header/>
        <div className="container mt-5" >
            <div className="col col-6 col-sm-6 col-md-6 col-lg-6 d-flex flex-column" style={{marginTop : "8em"}}>
                <div className="form-group mr-3 ms-3">
                    <label htmlFor="start" className="mr-2 me-3"><h5>Start Date </h5></label>
                    <input type='date' maxDate={new Date()} onChange={(e) => setStartdate(e.target.value)} />
                </div>
            </div>

            <div className="col col-6 col-sm-6 col-md-6 col-lg-6 d-flex flex-column mt-3">
                <div className="form-group mr-3 ms-3">
                    <label htmlFor="end" className="mr-2 me-4"><h5>End Date </h5></label>
                    <input type='date' maxDate={new Date()} onChange={(e)=>{setEnddate(e.target.value)}} />
                </div>
            </div>

            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl 12">
                <button className="btn btn-dark mt-4 ms-3" onClick={handleSpecificDate} style={{backgroundColor:'#9332c7'}}>Filter</button>
                <button className="btn btn-primary border-dark mt-4 ms-3 " onClick={reset}>Reset</button>

            </div>

            {/* <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl 12"> */}
            {/* </div> */}

            <div className="table-responsive mt-4 ms-3">
                    <table className="table table-bordered border-dark table-hover">
                        <thead>
                            <tr>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Item Name</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Mode of Adjustment</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Quantity</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Value</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Reference Number</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Date</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Reason</th>
                                <th className='text-center text-light' style={{backgroundColor:'#9332c7'}} scope='col'>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item=>{
                                return <tr className='text-center'>
                                    <td>{item.itemName}</td>
                                    <td>{item.mode_of_adjustment}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.value}</td>
                                    <td>{item.reference_number}</td>
                                    <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.description}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

        </div>
    </div>
  )
}
