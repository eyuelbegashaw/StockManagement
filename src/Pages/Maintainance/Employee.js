import { useState , useEffect } from "react";

//Alert component
import Alert from "../../Components/Alert";

//Employee page Components
import Form from "../../Components/Employee/Form";

//Employee API
import * as employeeAPI from "../../Api/employeeAPI";


const Employee = () =>
{
    const [alert , setAlert] = useState({show:false , type:"" , text:""});
    const [datas, setDatas] = useState([]);
    const [editCode , setEditCode] = useState("choose");
    const [edit , setEdit] = useState(false);
    const [inputs , setInputs] = useState({
         code:""  , remark:"" , active:"false" , type:"" ,
         title:"Ato" , firstName:"" , middleName:"" ,
         lastName:"" , nationality:"Afghanistan" , birthDate:"", 
         gender:"male" });

    useEffect( () => {
        const fetchData = async () => {
              const response = await employeeAPI.readData();
              setDatas(response);
        }
        fetchData();
    } ,[])

    //handles form input changes and Select button Change   
    const handleChange = (e)=>
    {
        const name= e.target.name;
        setInputs({...inputs , [name]:e.target.value})
       
    }

    const handleSelection = (e)=>
    {
        if(e.target.value !== "choose")
        {
            setEditCode(e.target.value);
            setEdit(true);
            setInputs(datas.find( (value) => value.code === e.target.value));
        }
        else
        {
            setEditCode("choose");
            setEdit(false);

        }
     
    }

    //Handle Add and Edit Functionality
    const handleSubmit = async ()=>
    {
        //validation
        if( (inputs.code == "") || (inputs.remark == "") || (inputs.type == "")  || 
             (inputs.firstName == "") || (inputs.middleName == "") || (inputs.lastName == "")  || 
             (inputs.birthDate == "")  )
        {
            handleAlert({type:"danger" , text:"Please make sure all fields are filled in correctly"});
        }
        else
        {
            const newData = {
                code:inputs.code   , remark:inputs.remark , 
                active: (inputs.active  === "true" ? true : false),
                type :inputs.type  , title:inputs.title , 
                firstName:inputs.firstName ,middleName:inputs.middleName , 
                lastName:inputs.lastName ,  nationality:inputs.nationality , 
                birthDate:inputs.birthDate , gender:inputs.gender
            };
            //edit the existing data
            if(edit)
            {
                setDatas( datas.map( (value) => value.code === editCode ? newData : value ) );
                await employeeAPI.updateData(editCode , newData).then(()=>
                {
                    handleAlert({type:"success" , text:`code ${editCode} updated successfully `});
                    handleNew();
                });
                
                
            }
            //add the new data
            else
            {
                let obj = datas.find( (data)=> data.code === newData.code );
                if(obj === undefined) 
                {
                    await employeeAPI.createData(newData).then( ()=> {
                        setDatas([...datas , newData]);
                        handleAlert({type:"success" , text:"New data added successfully"});
                        handleNew();
                     }     
                    );  
                }
                else
                {
                     handleAlert({type:"danger" , text:`Code already exists , please choose another`});
                }  
                 
            }
        }
    }

    //handle alert
    const handleAlert = ({type , text}) => {
        setAlert({show:true , type , text});
        setTimeout( ()=> {
            setAlert({show:false , type, text})
        } , 7000);
    }

    //handle New button to clean form
    const handleNew = () => {
        //Clean the form
        setInputs({
            code:""  , remark:"" , active:false , type:"" ,
            title:"Ato" , firstName:"" , middleName:"" ,
            lastName:"" , nationality:"Afghanistan" , birthDate:"", 
            gender:"male" });
        setEdit(false);
        setEditCode("choose");
    }

    //handle Delete button
    const handleDelete = async ()=>
    {
        if(editCode !== "choose")
        {
            const res = await employeeAPI.deleteData(editCode)
            .then((res)=> handleAlert({type:"success" , text:`Code ${editCode} deleted successfully`}));
            setDatas( datas.filter ( (data) => data.code !== editCode ) )
            handleNew();
        }
        else
        {
            handleAlert({type:"danger" , text:` Please choose code to be deleted `});
        }
       
    }

    return (
        <div className="mx-auto">
            { alert.show && <Alert type={alert.type} text={alert.text} />  }
           <div className="border border-secondary mt-1">
               <button 
               className="border-0 border-end border-secondary p-3" onClick={handleNew}> 
               <i className="material-icons fs-6">autorenew</i> <br/> New </button>
               
               <button className="border-0 border-end border-secondary p-3" onClick={handleSubmit} >
               <i className="fa fa-save fs-5 text-primary"></i> <br /> Save </button>
               
               <button 
                className="border-0 border-end border-secondary p-3" onClick={handleDelete}>
                <i className="material-icons text-danger fs-5" >delete</i> <br/> Delete</button>

                <div className="d-inline-flex mx-5" >
                    <span className="p-2">Code</span> 

                    <select className="form-select" name="codeSelection" value={ editCode } onChange ={ (e)=> handleSelection(e)} >
                        <option value="choose">Choose</option>
                         {
                             datas && 
                             datas.map ( (data , next)=> 
                                <option key={next} value={data.code}>{data.code}</option>
                             )
                         }
                    </select>
                </div>
              
              

           </div>

          <Form handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs} edit={edit} />

        </div>
       
    );
}
export default Employee;