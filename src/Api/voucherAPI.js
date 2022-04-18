export const createData = async (newData) => {
    const  data = await fetch ('https://localhost:5001/api/Voucher' , {
        method:'POST' , 
        headers:{
            'content-type':'application/json' ,
        } ,
        body:JSON.stringify(newData)
    })
   // const res = await data.json();
   // return res;
}


