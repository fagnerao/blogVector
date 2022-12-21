import Image from 'next/image';
import {useEffect, useState} from 'react'

import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import api from '../../pages/api/api';

const GalleryPage = (data) => {

  const [idPage, setIdPage]   = useState(data.props);
  const [gallery, setGallery] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function loadData () {

      if (cancelled) return;
      setLoading(true);

      const data = await api.get("/gallery",
          {params: {idPage: idPage }}).then((response) => {

          setGallery(response.data.result)
         
        });
        setLoading(false);
    }
  loadData(); 
}, [cancelled,idPage]) 

useEffect(()=>{
  return ()=> setCancelled(true)
},[])


// remove img from gallery
function handleRemoveImg(id) {
        
  api.get("/delImg",{params: {
  id: id,
  }}).then((response) => {
    setCancelled(!setCancelled);
  })
}

// set IsMain Image
function handleIsMain(id,post) {
        
  api.get("/isMain",{params: {
  id: id,
  post: post,
  }}).then((response) => {
    setCancelled(!setCancelled)
      
  })
}
 
return (
    <>
    { (loading)? <h1>Carregando....</h1> :
    <div className="px-2 py-2 mx-auto max-w-7xl mx-auto">
    <div className="flex flex-wrap -m-1 md:-m-2">
    {gallery && gallery.map((img)=>(
	    <div className="flex flex-wrap w-1/4" key={img.id} >
        <div className="w-full p-1 md:p-2">
        <Image
          width={300}
          height={350}
          alt="gallery" className="block object-cover object-center w-full h-full shadow-md rounded-lg" src={img.file} />
        </div>
      </div>
      ))}
    </div>
  </div>
    }

    </>
  )
}

export default GalleryPage