export const readData = async () => {
    const data = await fetch('https://localhost:5001/api/Person/GetAll/');
    const res = await data.json()
    return res.lists;
}


export const createData = async (newData) => {
    const  data = await fetch ('https://localhost:5001/api/Person' , {
        method:'POST' , 
        headers:{
            'content-type':'application/json' ,
        } ,
        body:JSON.stringify(newData)
    })
   // const res = await data.json();
   // return res;
}


export const deleteData = async (code) => {
    
    const data = await fetch(`https://localhost:5001/api/Person?code=${code}`, {
        method:'DELETE'
    })
   
}

export const updateData = async (code , update) => {

    const data = await fetch(`https://localhost:5001/api/Person?code=${code}` , {
        method:'PUT' , 
        headers:{
            'content-type':'application/json'
        } ,
        body:JSON.stringify(update)
    })
    //const res = await data.json();
    //return res;
     
 }