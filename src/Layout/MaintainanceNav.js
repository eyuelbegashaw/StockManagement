import {Link , Outlet} from 'react-router-dom';
const MaintainanceNav = ()=>
{
    return (
        <>
      <div className="d-sm-flex justify-content-between">
      <section className="bg-dark text-light">
            <div className="d-sm-flex flex-column border border-light p-1 navbars">
            <Link to="/element" className='text-decoration-none mb-2 text-warning fs-6'> Element</Link> <hr />
            <Link to="/employee" className='text-decoration-none mb-2 text-light fs-6'><i className='fas fa-users'></i> Employee</Link> <hr />
            <Link to="/consignee" className='text-decoration-none mb-2 text-light fs-6 consignee'>Consignee</Link> 
            <Link to="/customer" className='text-decoration-none mb-2 text-light pt-2 consignee' ><i className='fas fa-user-tie text-primary' ></i><span id="consigneeLinks" > Customer</span></Link>
            <Link to="/supplier" className='text-decoration-none mb-2 text-light pt-2 consignee' ><span  id="consigneeLinks">Supplier</span> </Link> <hr />
            <div className="dropdown consigneeDropDown">
	           <button className="btn btn-secondary dropdown-toggle bg-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
		        Consignee</button>
                <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                    <li> <Link to="/customer" className='text-decoration-none text-light'>Customer</Link></li>
                    <li> <Link to="/supplier" className='text-decoration-none text-light' >Supplier </Link></li>
                </ul>
	            </div>
            </div>
            
         </section>
         <Outlet/>
      </div>
         
         
         </>
    );
}
export default MaintainanceNav;