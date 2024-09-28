
export async function fetchAvailableMeals(){
    const response= await fetch('http://localhost:3000/meals');
    const resData=await response.json();
    if(!response.ok){
        throw new Error('Failed to fetch data');
    }
    else{
        return resData;
    }
}
export async function updateOrder(order , items){
const response= await fetch('http://localhost:3000/orders',{
    method:'POST',
    body:JSON.stringify({
        order:{
            items:items,
            customer:order
        }
    }),
    headers:{
        'Content-Type':'application/json'
    }
})
const resData=await response.json();

return resData.message
}