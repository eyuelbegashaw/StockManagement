export const createData = async (newData) => {
    const  data = await fetch ('https://localhost:5001/api/Consignee' , {
        method:'POST' , 
        headers:{
            'content-type':'application/json' ,
        } ,
        body:JSON.stringify(newData)
    })
   // const res = await data.json();
   // return res;
}


export const updateData = async (code , update) => {

   const data = await fetch(`https://localhost:5001/api/Consignee?code=${code}` , {
       method:'PUT' , 
       headers:{
           'content-type':'application/json'
       } ,
       body:JSON.stringify(update)
   })
   //const res = await data.json();
   //return res;
    
}

export const readData = async () => {
   const data = await fetch('https://localhost:5001/api/Consignee/GetAll/');
       if(!data) console.log("nothing");
    console.log("show me sth are be allah");
   console.log(data);
   const res = await data.json()
   console.log(res);
   return res.lists;
    
}


export const deleteData = async (code) => {
    const data = await fetch(`https://localhost:5001/api/Consignee?code=${code}`, {
        method:'DELETE'
    })
}