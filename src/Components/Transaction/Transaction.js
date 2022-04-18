import {useEffect , useState} from "react";

//Api
import * as consigneeAPI from "../../Api/consigneeAPI";
import * as elementAPI from "../../Api/elementAPI";
import * as voucherAPI from "../../Api/voucherAPI";


//Alert component
import Alert from "../../Components/Alert";

const CashGood = ({transactionType}) => {
    
    //holds consignee and element datas fetched from api
    const [consigneeDatas , setConsigneeDatas] = useState([]);
    const [elementDatas , setElementDatas] = useState([]);

    //holds array of line item objects
    const [lineItems , setLineItems] = useState([]);

    //holds the selected option from consignee and element drop down
    const [consigneeCode , setConsigneeCode] = useState("choose");
    const [elementCode , setElementCode] = useState("choose");

    //holds Quantity and Unit Price values
    const [quantity , setQuantity] = useState(0);
    const [unitPrice , setUnitPrice] = useState(0);

    //holds Alert state
    const [alert , setAlert] = useState({show:false , type:"" , text:""});

    useEffect( ()=> {
        const fetchData = async () =>
        {
            const res1 =  await consigneeAPI.readData();
            const res2 = await elementAPI.readData();
            setConsigneeDatas(res1);
            setElementDatas(res2);
        }
        fetchData();  
    } , []);


    //Returns name of a given element code
    const getName = (code) =>
    {
        let obj = elementDatas.find((data) => data.code === code) ;
        return obj.name;
    } 
    
    //Returns uom of a given element code
    const getUom = (code) =>
    {
        let obj = elementDatas.find((data) => data.code === code) ;
        return obj.uom;
    } 
    
    //handle selection for consignee and element drop downs
    const handleSelection = (e)=>
    {
        if(e.target.value !== "choose")
        {
            if (e.target.name == "consigneeCode")
                setConsigneeCode(e.target.value);
            else
                setElementCode(e.target.value);
        }

        else
        {
            if(e.target.name == "consigneeCode")
                setConsigneeCode("choose");
            else
                setElementCode("choose");
        }
    }


    const handleNew = () =>
    {
         setLineItems([]);
         setQuantity(0);
         setUnitPrice(0);
         setConsigneeCode("choose");
         setElementCode("choose");
         
    }

     const handleSubmit = async ()=>
     {
         if( lineItems.length === 0 || consigneeCode === "choose"  )
         {

            if(lineItems.length === 0 && consigneeCode === "choose" ) 
            handleAlert({type:"danger" , text:`Make sure to add line item and to choose consignee code`});
            else if (lineItems.length === 0)
            handleAlert({type:"danger" , text:`Make sure to add line item`});
            else
            handleAlert({type:"danger" , text:`Make sure to choose consignee code`});

         }
         else
         {
            const newData = {
                remark:"" , 
                type: transactionType , 
                subTotal: getSubTotal() ,
                grandTotal: getGrandTotal() ,
                void:false ,
                consigneeCode : consigneeCode , 
                lineItems: lineItems
           }
   
           try
               {
                  await voucherAPI.createData(newData);
                  handleAlert({type:"success" , text:`Voucher added successfully`});
               }
           catch(err)
                {
                   console.log(err)
                }
            }
       }


    //handle line item add functionality
    const handleAdd = () =>
    {
        const newData = {
            "remark":"" , 
            "unitAmount" : unitPrice,
            "quantity":  quantity , 
            "taxableAmount": (quantity * unitPrice ) ,
            "taxAmount":  (quantity * unitPrice* 0.15),
            "elementCode": elementCode ,
        }

        setLineItems([...lineItems , newData]);
    }



    const getSubTotal = () => {
        let subTotal = lineItems.reduce( (total , current) =>   total + current.taxableAmount , 0 );
        return subTotal;
    }

    const getTax = ()=> {
        let tax = lineItems.reduce( (total , current) =>   total + current.taxAmount , 0 );
        return tax; 
    }

    const getGrandTotal = ()=>
    {
    
        let tax = lineItems.reduce( (total , current) =>  
        total + ((current.quantity * current.unitAmount) + (current.quantity * current.unitAmount * 0.15))  , 0 );
        return tax; 
    }


    //handle alert
    const handleAlert = ({type , text}) => {
        setAlert({show:true , type , text});
        setTimeout( ()=> {
            setAlert({show:false , type, text})
        } , 7000);
    }


     return (
       <div className="container-fluid">
             { alert.show && <Alert type={alert.type} text={alert.text} />  }
             <div className="border border-secondary mt-1 mb-2">

               <button 
               className="border-0 border-end border-secondary p-3" onClick={handleNew}> 
               <i className="material-icons fs-6">autorenew</i> <br/> New </button>
               
               <button className="border-0 border-end border-secondary p-3" onClick={handleSubmit} >
               <i className="fa fa-save fs-5 text-primary"></i> <br /> Save </button>

              </div>

            <div className="d-flex align-content-center justify-content-between border w-100">
                    <div>
                            <span className="mx-2 ">Consignee </span>
                            <select name="consigneeCode" className="form-select d-inline"  style={{height:50 ,width:200}}
                                        value={consigneeCode} onChange ={ (e)=> handleSelection(e)} >
                                                <option value="choose">Choose</option>
                                                {
                                                    consigneeDatas && 
                                                    consigneeDatas.map ( (data , next)=> 
                                                        <option key={next} value={data.code} > {data.code} </option>
                                                    )
                                                }
                                                
                            </select>
                    </div>
        
            </div>

            <div className="d-md-flex align-content-center justify-content-between border mt-3">
                    <div>
                            <span className="mx-2">Element Code </span>
                            <select name="elementCode" className="form-select d-inline"  style={{height:40 , width:200}}
                                        value={elementCode} onChange ={ (e)=> handleSelection(e)} >
                                                <option value="choose">Choose</option>
                                                {
                                                    elementDatas && 
                                                    elementDatas.map ( (data , next) => 
                                                        <option key={next} value={data.code}>{data.code}</option>
                                                    )
                                                }
                            </select>
                    </div>
            

                    <div>
                            <span className="mx-2">UOM</span>
                            <input type="text" name="uom"  value= { elementCode !== "choose" ? getUom(elementCode) : "" } readOnly placeholder="UOM" style={{height:40}}  />
                    </div>

                    <div>
                            <span className="mx-2"> Quantity </span>
                            <input type="number" name="quantity"  onChange ={ (e)=> setQuantity(Number(e.target.value) ) }
                                   placeholder="quantity" value={quantity} style={{height:40}}  />
                    </div>

                    <div>
                            <span className="mx-2"> Unit Amount </span>
                            <input type="number" name="unitamount" onChange ={(e)=> setUnitPrice(Number(e.target.value )) } 
                                   placeholder="unit amount" style={{height:40}}  />
                    </div>
            </div>

            <div>
                <button className="btn btn-primary m-2" onClick={handleAdd}>Add</button>
            </div>

            <table className="table">

                <thead>
                    <tr>
                     <th>Item</th>
                     <th>Name</th>
                     <th>UOM</th>
                     <th>Quantity</th>
                     <th>Unit Price</th>
                     <th>Taxable Amount</th>
                     <th>Tax amount</th>
                     <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                {
                   lineItems &&
                   lineItems.map( (value , index)=>
                    <tr key={index}> 

                        <td>{value.elementCode}</td>
                        <td>{getName(value.elementCode)}</td>
                        <td>{getUom(value.elementCode)}</td>
                        <td>{value.quantity}</td>
                        <td>{value.unitAmount}</td>
                        <td>{value.taxableAmount}</td>
                        <td>{value.taxAmount}</td>
                        <td>{(value.quantity * value.unitAmount) + (value.quantity * value.unitAmount * 0.15)}</td>
                    </tr>
                 )
                }
 

                </tbody>

            </table>

            <div>
                <div className="ms-auto" style={{width: 300}} >
                    <p>
                        Sub Total
                        <input type="text" className="ms-3" value={getSubTotal()} readOnly  />
                        </p>

                        <p>
                        <span className="pe-2">Tax</span>
                        <input type="text" className="ms-5"  value={getTax()} readOnly />
                        </p>
                    

                        <p>
                        GrandTotal
                        <input type="text" className="ms-2"  value={getGrandTotal()} readOnly  />
                        </p>
                </div>
                   
            </div>
            

    </div>
           
     )
}

export default CashGood;