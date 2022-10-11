import axios from 'axios';
// const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

// const options = {
//   url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//   },
//   headers: {
//     'X-RapidAPI-Key': 'c358607844msh287e7cb5d01443ap1de972jsncc480d407ad6',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };

export const getPlaces = async(type,sw,ne)=>{
    try {
      const { data : {data}} =  await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
  params: {
    bl_latitude: sw.lat,
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
});
    //   console.log(data);
         console.log(sw,ne);
        return data;
    } catch (error) {
        console.log(error);
    }
}

