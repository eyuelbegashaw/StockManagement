import {NavLink , Outlet} from 'react-router-dom';
const TransactionNav = ()=>
{
    return (
        <>
      <div className="d-sm-flex justify-content-between">
      <section className="bg-dark text-light">
      <div className="d-sm-flex flex-column border border-light p-1 navbars" id="transactionNav">
            <NavLink to="/transaction/cashgood" className='text-decoration-none mb-2 fs-6'> Cash good Received</NavLink> <hr />
            <NavLink to="/transaction/storeissue" className='text-decoration-none mb-2 fs-6'>Store Issue</NavLink> <hr />
            </div>
         </section>
         <Outlet/>
      </div> 
         </>
    );
}
export default TransactionNav;