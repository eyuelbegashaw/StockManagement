import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';

//Navigation bars
import HeaderNav  from './Layout/HeaderNav';
import MaintainanceNav from './Layout/MaintainanceNav';
import TransactionNav from './Layout/TransactionNav';

//Maintance Pages
import Element from './Pages/Maintainance/Element';
import Employee from './Pages/Maintainance/Employee';
import Consignee from './Pages/Maintainance/Consignee';
import Supplier from './Pages/Maintainance/Supplier';
import Customer from './Pages/Maintainance/Customer';


//Transaction Pages
import CashGood from './Pages/Transaction/CashGood';
import StoreIssue from './Pages/Transaction/StoreIssue';


function App() {
  return (
   <Router>
    <Routes>
        <Route path="/" element= { <HeaderNav/> } >

          <Route path="" element= { <MaintainanceNav /> } >
            <Route index element={ <h1  className="mx-auto my-5 ">Select Maintainance</h1>} />
            <Route path="element" element={ <Element />} />
            <Route path="employee" element={ <Employee />} />
            <Route path="consignee" element={ <Consignee />} />
            <Route path="customer" element={ <Customer />} />
            <Route path="supplier" element={ <Supplier />} />
          </Route>

          <Route path="transaction" element={ <TransactionNav/>} >
              <Route index element={ <h1  className="mx-auto my-5 ">Select Transaction</h1>} />
              <Route path="cashgood" element={ <CashGood />} />
              <Route path="storeissue" element={ <StoreIssue />} />
          </Route>

        </Route>
      </Routes>
   </Router>

  );
}

export default App;
