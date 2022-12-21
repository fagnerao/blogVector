import Image from 'next/image';
import {useEffect, useState} from 'react'

import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import api from '../../pages/api/api';

const GalleryList = (data) => {

  const [idPage, setIdPage]   = useState(data.props);
  const [gallery, setGallery] = useState('');
  const [ flag, setFlag ]    = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function loadData () {
      setLoading(true);

      const data = await api.get("/gallery",
          {params: {idPage: idPage }}).then((response) => {
            setGallery(response.data.result)
          });
        setLoading(false);
    }
  loadData(); 
}, [flag,idPage]) 


//  Update list of gallery
const flagUpdate = ()=>(setFlag(!flag));

// remove img from gallery
function handleRemoveImg(id) {
        
  api.get("/delImg",{params: {
  id: id,
  }}).then((response) => {
    flagUpdate();
  })
}

// set IsMain Image
function handleIsMain(id,post) {
        
  api.get("/isMain",{params: {
  id: id,
  post: post,
  }}).then((response) => {
    flagUpdate();
  })
}
 
return (
    <>
    { (loading)? <h1>Carregando....</h1> :
    <div className="container px-5 py-2 mx-auto">
    <div className="flex flex-wrap -m-1 md:-m-2">
    {gallery && gallery.map((img)=>(
	    <div className={"flex flex-wrap w-1/3" + (img.is_main== 1 ? ' bg-yellow-400' : '')} key={img.id} id="imgId">
        <div className="w-full p-1 md:p-2">
          <ul className="absolute bg-white rounded">
            <li className="m-1 text-lg">
              <button type="button"  onClick={()=>handleRemoveImg(img.id)} alt="Remover" className="pointer text-gray-500 hover:text-yellow-500 "><BiXCircle /></button>
            </li>
            <li className="m-1 text-lg">
            <button type="button" onClick={()=>handleIsMain(img.id, idPage)} alt="Marcar como principal" className="pointer text-gray-500 hover:text-yellow-500 "><BiCheckCircle/></button>
            </li>
          </ul>
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

export default GalleryList