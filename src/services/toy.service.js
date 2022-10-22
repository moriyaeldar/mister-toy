import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true
});



export const toyService = {
  query,
  getById,
  remove,
  add,
  update,
 
}


function query(filterBy) {
  return axios.get('http://localhost:3030/api/toy',{params: {filterBy:filterBy}})
.then(res => res.data)
}
function getById(toyId) {
  return axios.get(`http://localhost:3030/api/toy/${toyId}`).then(res => res.data)
}

function remove(toyId) {
  return axios.delete(`http://localhost:3030/api/toy/${toyId}`)
}
function add(toy) {
  console.log('add',toy);
  return axios.post('http://localhost:3030/api/toy',toy).then(res => res.data)
}

function update(toy,toyId) {
  return axios.put(`http://localhost:3030/api/toy/${toyId}`, toy).then(res => 
  {
    console.log('toyservice',toy,toyId);
   return  res.data
  }
 )
}

