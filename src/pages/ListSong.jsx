import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListSong = () => {
  const [data, setData] = useState([])

  const fetchSongs = async ()=>{
    try{
       const res = await axios.get(`${url}/api/song/list`)
       if(res.data.success){
        setData(res.data.songs)
       }
    } catch(error){
       toast.error("Error ouucred")
    }
  }

  const removeSong = async(id)=>{
     try{
       const res = await axios.post(`${url}/api/song/remove`,{id})

       if(res.data.success){
        toast.success(res.data.message);
        await fetchSongs()
       }
     } catch(error){
         toast.error("something went wrong")
     }
  }
  useEffect(()=>{
    fetchSongs()
  },[])
  return (
    <div>
      <p>All Songs List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-r-gray-300 text-sm mr-5 bg-green-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item,index)=>{
          return (
            <div key={index} className='grid grids-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} ait=""/>
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer text-xl' onClick={()=>removeSong(item._id)}>x</p>
              </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListSong
