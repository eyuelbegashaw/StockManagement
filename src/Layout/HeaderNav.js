import {Link , Outlet } from 'react-router-dom';

const headerNav = () =>  {   
     return (
      <>
         <nav className="navbar navbar-expand-sm bg-dark navbar-dark py-3">  
         <div className="container-fluid">
         <Link to="/" className="navbar-brand mx-0">Stock Management</Link>
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
                <Link to="/" className="nav-link">Maintainance</Link>
              </li>
              <li className="nav-item">
                <Link to="/transaction" className="nav-link">Transaction</Link>
              </li>
            </ul>
          </div>
          
        </div>
        </nav>
        <Outlet />
      </>
     );
} 
export default headerNav;