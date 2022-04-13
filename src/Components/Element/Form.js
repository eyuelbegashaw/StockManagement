const Form = ({handleSubmit , handleChange , inputs , edit}) => {

    return (
      <form onSubmit = { (e)=> handleSubmit(e) }>

        <div className="row mb-3">
            <div className="col">
              <input className="form-control" placeholder="Code" type="text"  name="code" value={inputs.code} readOnly= {edit ? true : false} onChange={ (e)=>handleChange(e) }/>
            </div>

            <div className="col">
                <input className="form-control" placeholder="Remark" type="text" name="remark" value={inputs.remark}  onChange={ (e)=>handleChange(e) }/> 
            </div> 

            <div className="col">
                <select className="form-select disabled" name="type" value={inputs.type} onChange={ (e)=>handleChange(e) } >
                    <option value="consigneeRef">elementRef</option>
                </select>
            </div>
        </div>

        <div className="row mb-3">
            <div className="col">
                <select className="form-select" name="active" value={inputs.active}  onChange={ (e)=>handleChange(e) } >
                    <option value="true" >True</option>
                    <option value="false">False</option>
                </select>
            </div>
            
            <div className="col">
              <input className="form-control" placeholder="uom" type="text"  name="uom" value={inputs.uom} onChange={ (e)=>handleChange(e) }/>
            </div>

            <div className="col">
              <input className="form-control" placeholder="Description" type="text" name="description" value={inputs.description}  onChange={ (e)=>handleChange(e) }/>
            </div> 
        </div>

          <div className="row">
            <div className="col-4 mb-3" >
            <input className="form-control" placeholder="Group"  type="text"  name="group"  value={inputs.group}  onChange={ (e)=>handleChange(e) } />
            </div>
          </div>
      
       
        <input type="submit" value={ edit === true ? "Edit" : "Add" } className="btn btn-primary"/>
      </form>
   )

}

export default Form;