import { useEffect } from 'react';
import {NavLink , Outlet , useNavigate } from 'react-router-dom';

const HeaderNav = () =>  {
  
      let navigate = useNavigate();
      useEffect(()=>
      {
        navigate('/maintainance')
      } , [])
      
      
     return (
      <>
         <nav className="navbar navbar-expand-sm bg-dark navbar-dark py-3">  
         <div className="container-fluid">
         <NavLink to="/maintainance" className="navbar-brand mx-0 text-white h3 brand">Stock Management</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse ms-auto" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/maintainance" className="mx-3" >Maintainance</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/transaction" className="mx-3">Transaction</NavLink>
              </li>
            </ul>
          </div>
          
        </div>
        </nav>
        <Outlet />
      </>
     );
} 
export default HeaderNav;