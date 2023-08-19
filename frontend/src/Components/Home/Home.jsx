import React, { useEffect, useState } from 'react'
import { Header } from '../Navbar/Header'
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';


export const Home = () => {

    const [totalStock, setTotalStock] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantitySales, setTotalQuantitySales] = useState('');
    const [totalPriceSales, setTotalPriceSales] = useState('');
    const [salesOrderData, setSalesOrderData] = useState([]);
    const [filter, setFilter] = useState('');//xx
    const [customerOrItemsData, setCustomerOrItemsData] = useState([]);
    const [filterId, setFilterId] = useState('');
    const [item, setItem] = useState(0)

    const itemApi = 'http://localhost:5000/api/viewitems'
    const salesApi = 'http://localhost:5000/api/displaysales'
    const customerApi = 'http://localhost:5000/api/viewcustomers'
    const customerfilterApi = 'http://localhost:5000/api/customerorder'
    const itemsfilterApi = 'http://localhost:5000/api/itemsfilter'

    useEffect(() => {
        getItems();
        getSalesOrders();
        getCustomer();
    },[])

    const getItems = () => {
        try {
            axios.get(itemApi).then(
                (response) => {
                    const totalStock = response.data.reduce((total, item) => total + item.opening_stock, 0);
                    setTotalStock(totalStock);
                    const totalPrice = response.data.reduce((total, price) => total + price.selling_price * price.opening_stock, 0);
                    setTotalPrice(totalPrice)

                    setCustomerOrItemsData(response.data)
                }
            )
        } catch (error) {
            console.error(error.message);  
        }
    }

    const getSalesOrders = () => {
        try {
            axios.post(salesApi).then(
                (response) => {
                    // console.log("item",response.data)
                    setSalesOrderData(response.data)
                    const Data = response.data.map(data => {
                        return data.items.map((value,total) => {
                            return( 
                                value.quantity
                                // setItem(value.quantity)
                                // setTotalQuantitySales(Number(total+=value.quantity))
                            )})
                        
                    })
                    console.log("det",Data)
                    setItem(Data)
                    // console.log(item)
                    let sum =0
                    Data.map((item, index) => { 
                       item.map(value => {
                        return sum = sum + value
                       })
                    });
                    // console.log(sum)
                    setTotalQuantitySales(sum);
                    const totalPriceSales = response.data.reduce((total, price) => total + price.total_price, 0);
                    setTotalPriceSales(totalPriceSales);
                }
            )
        } catch (error) {
            console.error(error.message);
        }
    }

    const getCustomer = () => {
        axios.post(customerApi).then(
            (response) => {
                setCustomerOrItemsData(response.data)
            }
        )
    }

    const filterSales = async (e) => {
        e.preventDefault();
        if (filter === "Customer") {
            await getSpecSalesByCustomers(filterId);
        }
        else if (filter === "Items") {
            await getSpecSalesByItems(filterId);
        }
    }

    const getSpecSalesByCustomers = async (id) => {
        console.log("id", id)
        const cust_id = {"customer_id" : id}
        console.log(cust_id)
        axios.post(customerfilterApi, cust_id).then(
            (response) => {
                console.log(response.data)
                // setSalesOrderData(response.data)
            }
        )
    }

    const getSpecSalesByItems = async (id) => {
        const item_id = {"item_id" : id}
        console.log(item_id)
        axios.post(itemsfilterApi,item_id).then(
            (response) => {
                setSalesOrderData(response.data)
            }
        )
    }

    const handleFilter = async (e) => {
        setFilter(e.target.value)
        if (e.target.value === "Customer") {
            await getCustomer();
        } else if (e.target.value === "Items") {
            await getItems();
        }
    }

    const resetSales = async (e) => {
        e.preventDefault();
        await getSalesOrders();
        setFilter('');
        setFilterId('');
        setCustomerOrItemsData([]);
    }

    const getItemsList = () => {
        axios.get(itemApi).then(
            (response) => {
                setCustomerOrItemsData(response.data)
            }
        )
    }

  return (
    <div>
        <Header/>
        <div className="container-fluid mt-2" >
            <div className="row" style={{marginTop: "90px"}}>
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="card text-light mb-3" style={{ maxWidth: '100%', backgroundColor:'#9332c7' }}>
                        <div className="card-header">Reports</div>
                        <div className="card-body">
                            <h5 className="card-title">Inventory Summary</h5>
                            <p className="card-text">Total Stock : {totalStock} </p>
                            <p className="card-text">Total Price : {totalPrice} </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="card text-light mb-3" style={{ maxWidth: '100%', backgroundColor:'#9332c7' }}>
                        <div className="card-header">Reports</div>
                        <div className="card-body">
                            <h5 className="card-title">Inventory Aging Summary </h5>
                            <br />
                            <p></p>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <Link to={'/inventoryaging'} replace={true} className="card-link text-white h6">View Report</Link>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="card text-light mb-3" style={{ maxWidth: '100%', backgroundColor:'#9332c7' }}>
                        <div className="card-header">Reports</div>
                        <div className="card-body">
                            <h5 className="card-title">Product Sales</h5>
                            <p className="card-text">Total Units Sold : {totalQuantitySales} </p>
                            <p className="card-text">Total Sales : {totalPriceSales} </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card text-light mb-3" style={{ maxWidth: '100%', backgroundColor:'#9332c7' }}>
                            <div className="card-header">
                                Reports
                                {/* xx */}
                                <div className="row">
                                    <div className="d-flex justify-content-end">
                                        <div className="form-group d-flex">
                                            <label htmlFor="range" className="me-4 mt-auto">Filter</label>
                                            <select id="range" className="form-control me-2 mt-4" value={filter} onChange={handleFilter}>
                                                <option value="">--Select--</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Items">Items</option>
                                            </select>

                                            <label htmlFor="range" className="mr-2 mt-auto me-4 text-nowrap">Customer / Items Name</label>
                                            <select id="range" className="form-control mt-4" value={filterId} onChange={(e) => { setFilterId(e.target.value) }}>
                                                <option value="">--Select--</option>
                                                {customerOrItemsData.map((value, index) => {
                                                    return filter === "Customer" ? (
                                                        <option key={index} value={value._id}>{value.name}</option>
                                                    ) : filter === "Items" && (
                                                        <option key={index} value={value._id}>{value.item_name}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <button className="btn btn-success mt-4 ms-3" onClick={(e) => { filterSales(e) }}>Submit</button>
                                        <button className="btn btn-danger mt-4 ms-3" onClick={(e) => { resetSales(e) }}>Reset</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Sales by Items / Customer</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link className="card-link text-white h6">View Report</Link> */}

                                <div className="table table-responsive">
                                    <table className="table table-bordered border-dark text-center" >
                                        <thead>
                                            <tr>
                                                <th scope="col" className='bg-warning'>Sales Date</th>
                                                <th scope="col" className='bg-warning'>Sales Order Number</th>
                                                <th scope="col" className='bg-warning'>Customer Name</th>
                                                <th scope="col" className='bg-warning'>Item</th>
                                                {/* <th scope="col" className='bg-warning'>Item Group</th> */}
                                                <th scope="col" className='bg-warning'>Quantity</th>
                                                <th scope="col" className='bg-warning'>Unit Price</th>
                                                <th scope="col" className='bg-warning'>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesOrderData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ backgroundColor:'#ccef42' }}>{moment(value.date).format('DD-MM-YYYY')}</td>
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.order_number}</td>
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.customerName}</td>
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.items.map(data => {
                                                            return <tr> <td>{data.item_name}</td> </tr> 
                                                        })}</td>
                                                        {/* <td style={{ backgroundColor:'#ccef42' }}>{value.item_group}</td> */}
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.items.map(data => {
                                                            return <tr> <td>{data.quantity}</td> </tr> 
                                                        })}</td>                                                        
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.items.map(data => {
                                                            return <tr> <td>{data.rate}</td> </tr> 
                                                        })}</td>
                                                        <td style={{ backgroundColor:'#ccef42' }}>{value.total_price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
