import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '../Navbar/Header'

export const Itemgroup = () => {

    const viewApi = "http://localhost:5000/api/getgroup"
    const addApi = "http://localhost:5000/api/itemgroup"

    const [data,setData] = useState([])
    const [input,setInput] = useState({})

    useEffect(()=>{
        axios.post(viewApi).then(
            (response)=>{
                console.log(response)
                setData(response.data)
            }
        )
    },[])

    const changeData = (e) =>{

        setInput({
            ...input,[e.target.name]: e.target.value 
        });
        console.log(input)
    }

    const clickAddnew = () =>{
        axios.post(addApi,input)
        .then(response =>{
            console.log(response)
            alert(response.data.status)
        })
    }

  return (
    <div className='root'>
        <Header/>
        <div className="container" style={{marginTop:"120px"}}>
            <p className="text-center text-dark" style={{fontSize: "25px"}}>Item Groups</p>
            <div className="row">
                <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 m-5 mt-0 mb-0">
                    <div class="m-3 me-0 ">
                        <label className="form-label mt-3 ms-2 mb-0">New Item Group</label>
                        <div className="d-flex mt-1 input-group">
                            <input type="text" className="form-control rounded" name='group_label' placeholder="Enter Group Name" onChange={changeData}/>
                            <button className="btn btn-dark rounded ms-2" style={{backgroundColor:'#9332c7'}} onClick={clickAddnew}>Add New</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-3">
                <div className="col col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 mt-0 m-5 mb-0">
                    <div className="m-3 text-center col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 bg-primary">
                        <label type='button' className='text-light ' >Available Groups</label>
                    </div>
                </div>
                <div className="col col-9 col-sm-9 col-md-9 col-lg-9 colxl-9 col-xxl-9 ps-4 pe-0 m-5 mt-0">
                    <table class="table table-striped table-hover">
                        <tbody>
                            {data.map(group =>{
                                    return <tr>
                                    <td>{group.group_label}</td>
                                </tr>
                                }
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
