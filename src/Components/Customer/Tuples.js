import Tuple from "./Tuple";

const Tuples = ({datas , handleDelete , handleEdit}) => {
    return (
         <>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Remark</th>
                    <th>Type</th>
                    <th>Active</th>
                    <th>Name</th>
                    <th>Trade Name</th>
                    <th>Business Type</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   { datas.map( (data , index) => <Tuple  key={index}  data = {data} handleDelete = {handleDelete} handleEdit={handleEdit} /> ) }   
                </tbody>
            </table>
         </>
    )
}

export default Tuples;