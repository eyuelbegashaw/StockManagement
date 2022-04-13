import {useState , useEffect} from "react";

//Customer page Components
import Form from "../../Components/Customer/Form";
import Tuples from "../../Components/Customer/Tuples";

//Customer api
import * as customerAPI from "../../Api/customerAPI";

//Aler component
import Alert from "../../Components/Alert";

const Customer = () => {
    const [inputs , setInputs] = useState({
        code:"" , remark:"" , type:"customer" ,
        active: "true" , name:"" , tradeName:"" ,
        businessType:""
    }); //holds form inputs state
    const [datas , setDatas]= useState([]);         //holds fetched data from api
    const [showAdd , setShowAdd] = useState(false); //show and hide form
    const [edit , setEdit] = useState(false);       //holds edit state
    const [editCode , setEditCode] = useState("");  //holds the code of the item to be edited
    const [alert , setAlert] = useState({show:false , type:"" , text:""});

    //fetch data from api and store it in 'datas' state
    useEffect( ()=> {
        const fetchData = async () => {
            const response = await customerAPI.readData();
            setDatas(response);
     };
        fetchData();
    } , []);
    

    //handles the submit of the form( edit and add )
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        //validation
        if( (inputs.code == "") || (inputs.remark == "") || (inputs.name == "")  || 
            (inputs.tradeName == "") || (inputs.businessType == "")  )
        {
            handleAlert({type:"danger" , text:"Please make sure all fields are filled in correctly"});
        }
        else
        {
            const newData = {
                code:inputs.code   , remark:inputs.remark , 
                type :inputs.type  , active: (inputs.active  === "true" ? true : false),
                name:inputs.name   , tradeName:inputs.tradeName , 
                businessType:inputs.businessType
            };
    
            //edit the existing data
            if(edit)
            {
                await customerAPI.updateData(newData.code , newData).then(()=> console.log("edit success"));
                setDatas(datas.map ( (value) => value.code == editCode ? newData : value ));
                setEdit(false);
                handleAlert({type:"success" , text:`Code ${newData.code} edited successfully`});
    
                 //cleaning the form
                 setInputs ({ code:"" , remark:"" , type:"consigneeRef" ,
                 active: "true" , name:"" , tradeName:"" , businessType:"" }); 
            }
    
            //add the new data
            else
            {
                //Make sure the 'code' is not duplicate
                let obj = datas.find( (data)=> data.code === newData.code )
                if(obj === undefined) 
                {
                //create new data from 'inputs' state and send it to api 
                const res = await customerAPI.createData(newData).then(()=>{console.log("successfully added")});
    
                //merge the old and the new data in 'datas' state
                setDatas([...datas , newData ]);
                handleAlert({type:"success" , text:"New data added successfully"});
    
                //cleaning the form
                setInputs ({ code:"" , remark:"" , type:"consigneeRef" ,
                active: "true" , name:"" , tradeName:"" , businessType:"" }); 
                }
                else
                {
                  handleAlert({type:"danger" , text:`Code already exists , please choose another`});
                }  
            }
        }
    }

    //handles change of form inputs and keep in sync with state
    const handleChange = (e) => {
        const name = e.target.name;
        setInputs({...inputs , [name]:e.target.value})
    }

    //handles the delete button
    const handleDelete = async (code) => {
        await customerAPI.deleteData(code);
        setDatas(datas.filter( data => data.code!==code)) ;
        handleAlert({type:"success" , text:`Code ${code} deleted successfully`});
    }

    //handles the edit button
    const handleEdit = (code) => {
           setEdit(true);
           setShowAdd(true);
           setEditCode(code);
           let target = datas.find(  (value) => value.code === code  );
           setInputs(target);
    }

    //show and hide the form
    const handleAddClick = () =>
    {
        setShowAdd( (!showAdd)  ) ;
        if(showAdd)
        {
          setEdit(false);
          //cleaning the form if no editing
          setInputs ({ code:"" , remark:"" , type:"consigneeRef" ,
          active: "true" , name:"" , tradeName:"" , businessType:"" });
        }
    }

    //handle alert
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
          setAlert({ show: false });
        }, 6000);
      };

    return (
        <div className="container-fluid mt-1">
            <div>
                <div>
                     {alert.show && <Alert type={alert.type} text={alert.text} />}
                </div>
                <div>
                  <button onClick={ handleAddClick } className="btn btn-primary mb-2" >{ showAdd ? 'Hide' : 'Add' }</button>
                </div>
                {showAdd &&  
                <Form handleSubmit={handleSubmit}  handleChange={handleChange} inputs={inputs} edit={edit}/>}    
            </div>

            <div>
                <Tuples datas={datas} handleDelete = {handleDelete} handleEdit={handleEdit}/>
           </div>   
        </div>

       
    );
}

export default Customer;