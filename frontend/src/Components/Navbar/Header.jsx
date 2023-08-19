import React from 'react'

export const Header = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: "#480c68"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img style={{height:'40px',width:'50px'}} src={require('./inventorylogo.png')}></img>                        
    </a>
    <a className="navbar-brand text-light" href="#">Inventory App</a>
    <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon btn-light"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav mr-auto ">
        <li className="nav-item">
          <a className="nav-link active text-light" aria-current="page" href="/"> 
           <i className="bi bi-house me-1"></i>
           Home
          </a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-boxes me-1"></i>
            Inventory
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item " href="/groupitem">Items Group</a></li>
            <li><a className="dropdown-item" href="/viewitems">View Items</a></li>
            <li><a className="dropdown-item" href="/additem">Add Items</a></li>
            <li><a className="dropdown-item" href="/adjustmentsmade">Inventory Adjustments</a></li>
            <li><a className="dropdown-item" href="/adjustreport">Adjustment Report</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-currency-dollar me-1"></i>
            Sales
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/customer">Customer Details</a></li>
            <li><a className="dropdown-item" href="/newsalesorder">New Sales Order</a></li>
            <li><a className="dropdown-item" href="/managesales">Manage Sales</a></li>
            <li><a className="dropdown-item" href="/viewpackages">View Packages</a></li>
            <li><a className="dropdown-item" href="/deliverychallan">View Challans</a></li>
            <li><a className="dropdown-item" href="/invoicelist">View Invoices</a></li>
            <li><a className="dropdown-item" href="/paymentsreceived">Payments</a></li>
            <li><a className="dropdown-item" href="/salesreturns">Sales Return</a></li>
            <li><a className="dropdown-item" href="/creditnotes">Credit Notes</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-bag me-1"></i>
            Purchase
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/managevendor">Vendor Details</a></li>
            <li><a className="dropdown-item" href="/purchaseorder">New Purchase Order</a></li>
            <li><a className="dropdown-item" href="/managepurchase">Manage Purchase</a></li>
            <li><a className="dropdown-item" href="/viewbills">Bills and Payments</a></li>
            <li><a className="dropdown-item" href="/vendorcredits">Vendor credits</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
