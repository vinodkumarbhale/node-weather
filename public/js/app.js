

console.log("client code");

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


const weatherform=document.querySelector('form');
const search= document.querySelector('input');
const msg1=document.getElementById('message1');
const msg2=document.getElementById('message2');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing');
    const address= search.value;
    const url=`http://localhost:3000/weather?address=${address}`;
    msg1.textContent="Loading..."
fetch(url).then((response)=>{
    response.json().then((data)=>{
if(data.error){
    console.log(data.error);
    msg1.textContent=data.error;

    
}else{
    console.log(data.location);
    console.log(data.forecast);
    msg1.textContent=data.location;
    msg2.textContent=data.forecast;

}
    })
})
})
