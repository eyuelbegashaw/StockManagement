const Tuple = ( {data , handleDelete , handleEdit} ) => {
       return (
              <>
                <tr>
                       <td>{data.code} </td>
                       <td>{data.remark} </td>
                       <td>{data.type} </td>
                       <td>{data.active == true ? "true" : "false"} </td>
                       <td>{data.name} </td>
                       <td>{data.tradeName} </td>
                       <td>{data.businessType} </td>
                       <td> <button className="border-0"  onClick= { () => handleEdit(data.code)} ><i className="material-icons text-primary fs-5">edit</i> </button> </td>
                       <td> <button className="border-0"  onClick= { () => handleDelete(data.code)} ><i className="material-icons text-danger fs-5" >delete</i> </button> </td>
                </tr>
              </>
       )
}

export default Tuple;