import React from 'react'
import NavBar from './NavBar.jsx'
import { albumsData } from '../assets/assets.js'
import AlbumItem from './AlbumItem.jsx'

const DisplayHome = () => {
  return (
    <>
        <NavBar />
        <div className='my-5 font-bold text-2xl'>
          {/* {albumsData.map((item, index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))} */}

          {albumsData.map((item, index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id}/>))}

         
        </div>
    </>
  )
}

export default DisplayHome