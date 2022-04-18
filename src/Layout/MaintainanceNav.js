import {NavLink , Outlet} from 'react-router-dom';
const MaintainanceNav = ()=>
{
    return (
        <>
      <div className="d-sm-flex">
      <section className="bg-dark text-light">
            <div className="d-sm-flex flex-column border border-light p-1 navbars">
            <NavLink to="/maintainance/element" className='text-decoration-none mb-2 fs-6'> Element</NavLink> <hr />
            <NavLink to="/maintainance/employee" className='text-decoration-none mb-2 fs-6'><i className='fas fa-users'></i> Employee</NavLink> <hr />
            <NavLink to="/maintainance/consignee" className='text-decoration-none mb-2 fs-6 consignee'>Consignee</NavLink> 
            <NavLink to="/maintainance/consignee/customer" className='text-decoration-none mb-2 pt-2 consignee' ><i className='fas fa-user-tie text-primary' ></i><span id="consigneeLinks" > Customer</span></NavLink>
            <NavLink to="/maintainance/consignee/supplier" className='text-decoration-none mb-2 pt-2 consignee' ><i className='fas fa-user-tie text-primary' ></i><span  id="consigneeLinks"> Supplier</span> </NavLink> <hr />
            <div className="dropdown consigneeDropDown">
	           <button className="btn btn-secondary dropdown-toggle bg-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
		        Consignee</button>
                <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                    <li> <NavLink to="/customer" className='text-decoration-none text-light'>Customer</NavLink></li>
                    <li> <NavLink to="/supplier" className='text-decoration-none text-light' >Supplier </NavLink></li>
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