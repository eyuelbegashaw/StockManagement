import {Link , Outlet} from 'react-router-dom';
const TransactionNav = ()=>
{
    return (
        <>
      <div className="d-sm-flex justify-content-between">
      <section className="bg-dark text-light">
      <div className="d-sm-flex flex-column border border-light p-1 navbars" id="transactionNav">
            <Link to="/transaction/cashgood" className='text-decoration-none mb-2 text-warning fs-6'> Cash good </Link> <hr />
            <Link to="/transaction/storeissue" className='text-decoration-none mb-2 text-light fs-6'><i className='fas fa-users'></i> Store Issue</Link> <hr />
            </div>
         </section>
         <Outlet/>
      </div> 
         </>
    );
}
export default TransactionNav;