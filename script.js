const button=document.getElementById("get-location-btn");

const cityName=document.getElementById("city-name");
const cityTemp=document.getElementById("city-temp");
const cityTime=document.getElementById("city-time");

async function getData(lat,long){
    const data= await fetch(`http://api.weatherapi.com/v1/current.json?key=key&q=${lat},${long}&aqi=no`);
    // console.log(data);
    return await data.json();
}


async function gotLocation(position){
    console.log(position);
   const result= await getData(position.coords.latitude,position.coords.longitude);
   console.log(result);
   var locationDetailsDiv = document.getElementById("location-details");
   if (locationDetailsDiv.style.display === "none") {
       locationDetailsDiv.style.display = "block";
   }
   cityName.innerText=`${result.location.name}, ${result.location.region}- ${result.location.country}`;
   cityTemp.innerText=result.current.feelslike_c;
   cityTime.innerText=result.location.localtime;

}

function failedToGetLocation(){
    console.log("There was some issue to get Location");
}


button.addEventListener('click',async()=>{
    navigator.geolocation.getCurrentPosition(gotLocation,failedToGetLocation);
})