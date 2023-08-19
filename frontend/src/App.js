import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Itemgroup } from './Components/Inventory/Itemgroup';
import { Displayitem } from './Components/Inventory/Displayitem';
import { AddItem } from './Components/Inventory/AddItem';
import { InventoryAdjustment } from './Components/Inventory/InventoryAdjustment';
import { AdjustmentForm } from './Components/Inventory/AdjustmentForm';
import { Reports } from './Components/Inventory/Reports';
import { Customer } from './Components/Sales/Customer';
import { Vendordetails } from './Components/Purchase/Vendordetails';
import { NewSalesOrder } from './Components/Sales/NewSalesOrder';
import { Package } from './Components/Sales/Package';
import { NewPurchaseOrder } from './Components/Purchase/NewPurchaseOrder';
import { ManageSales } from './Components/Sales/ManageSales';
import { DeliveryChallans } from './Components/Sales/DeliveryChallans';
import { Invoice } from './Components/Sales/Invoice';
import { PaymentRecieved } from './Components/Sales/PaymentRecieved';
import { CreditNotes } from './Components/Sales/CreditNotes';
import { ManagePurchaseOrder } from './Components/Purchase/ManagePurchaseOrder';
import { ViewBillsandPayments } from './Components/Purchase/ViewBillsandPayments';
import { VendorCredits } from './Components/Purchase/VendorCredits';
import { SalesReturn } from './Components/Sales/SalesReturn';
import { Home } from './Components/Home/Home';
import { InventoryAging } from './Components/Home/InventoryAging';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/groupitem" element={<Itemgroup/>}/>
          <Route path="/viewitems" element={<Displayitem/>}/>
          <Route path="/additem" element={<AddItem/>}/>
          <Route path='/adjustmentsmade' element={<InventoryAdjustment/>}/>
          <Route path='/adjustform' element={<AdjustmentForm/>}/>
          <Route path='/adjustreport' element={<Reports/>}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/managevendor' element={<Vendordetails/>}/>
          <Route path='/newsalesorder' element={<NewSalesOrder/>}/>
          <Route path='/managesales' element={<ManageSales/>}/>
          <Route path = '/viewpackages' element = { <Package/> } />
          <Route path = '/purchaseorder' element = { <NewPurchaseOrder/> } /> 
          <Route path = '/deliverychallan' element = { <DeliveryChallans/> } />
          <Route path = '/invoicelist' element = { <Invoice/> } />
          <Route path = '/paymentsreceived' element = { <PaymentRecieved/> } />
          <Route path = '/salesreturns' element = { <SalesReturn/> } />
          <Route path = '/creditnotes' element = { <CreditNotes/> } />
          <Route path = '/managepurchase' element = { <ManagePurchaseOrder/> } />
          <Route path = '/viewbills' element = { <ViewBillsandPayments/> } />
          <Route path = '/vendorcredits' element = { <VendorCredits/> } />

          <Route path = '/' element = { <Home/> } />
          <Route path = '/inventoryaging' element = { <InventoryAging/> } />

        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
