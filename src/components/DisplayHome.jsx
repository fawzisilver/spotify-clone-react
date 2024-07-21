import React from 'react'
import NavBar from './NavBar.jsx'
import { albumsData } from '../assets/assets.js'
import AlbumItem from './AlbumItem.jsx'
import { songsData } from '../assets/assets.js'
import SongsItem from './SongsItem.jsx'

const DisplayHome = () => {
  return (
    <>
        <NavBar />
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id}/>))} 
          </div>     
        </div>
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
          <div className="flex overflow-auto">
            {songsData.map((item, index)=>(<SongsItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />))}
          </div>
        </div>
    </>
  )
}

export default DisplayHome