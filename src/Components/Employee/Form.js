import Nationality from "../../Data/Nationality";

const Form = ({handleSubmit, handleChange , inputs , edit})=> {
     return(
          <form className="row mx-auto mt-3">
             <div className="col-sm">
  
             <p>Code <input type="text" name="code" value= {inputs.code} onChange={ (e) => handleChange(e) } readOnly= {edit ? true : false} className="form-control" /> </p>

               <p> Title
               <select className="form-select" name="title" value={inputs.title}  onChange={ (e) => handleChange(e) } >
                    <option value="Ato" >Ato</option>
                    <option value="Weyzero">Weyzero</option>
                </select>  
                </p>

               <p>First Name <input type="text" name="firstName" value= {inputs.firstName} onChange={ (e) => handleChange(e) } className="form-control" /> </p>
               <p>Middle Name <input type="text" name="middleName" value={inputs.middleName} onChange={ (e) => handleChange(e) } className="form-control" /> </p>
               <p>Last Name <input type="text" name="lastName" value={inputs.lastName} onChange={ (e) => handleChange(e) }  className="form-control" /> </p>
               <p>Date of birth  <input type="text" name="birthDate" value={inputs.birthDate} onChange={ (e) => handleChange(e) }  className="form-control" /> </p>
             </div>
             <div className="col-sm">
               <p>Remark <input type="text" name="remark" value={inputs.remark} onChange={ (e) => handleChange(e) }className="form-control" /> </p>
               <p>Type <input type="text" name="type" value={inputs.type} onChange={ (e) => handleChange(e) } className="form-control" /> </p>
 
               <p> Nationality
               <select className="form-select" name="nationality" value={inputs.nationality} onChange={ (e) => handleChange(e) } >
                         {
                             Nationality && 
                             Nationality.map ( (data , next)=> 
                                <option key={next} value={data}>{data}</option>
                             )
                         }
                </select> 
               </p>

               <p> Status
               <select className="form-select" name="active" value={ inputs.active} onChange ={ (e)=> handleChange(e)} >
                    <option value="true" >Active</option>
                    <option value="false">Not Active</option>
               </select>
               </p>
               <p> Gender
               <select className="form-select" name="gender" value={inputs.gender} onChange ={ (e)=> handleChange(e)} >
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
               </select>
               </p>
              </div>
          </form>

     );
}

export default Form;