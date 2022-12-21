
        import React, {useState, useEffect, useContext} from 'react'
        import api from '../../pages/api/api';
        import FileUpload from './fileuploader';
        import { BiCheckDouble, BiXCircle, BiCommentEdit, BiTrash ,BiLink} from "react-icons/bi";

        import { userLoginContext } from '../../pages/contexts/userDataContext'
        import Router from 'next/router';
import Image from 'next/image';

        export default function BannerList(){

          const {verifyUser} = useContext(userLoginContext);
          console.log(verifyUser)
  
          useEffect(() => {
            if(verifyUser != true){
              Router.push('/')
              
            };
          },[verifyUser])
  
          const [ bannerId, setBannerId]         = useState('');
          const [ title, setTitle ]              = useState('');
          const [ url, setUrl ]                  = useState('');
          const [ localization, setLocalization] = useState('');
          const [ active, setActive ]            = useState(1);
          const [ file, setFile ]                = useState('');
          
          const [ message, setMessage ]                 = useState('');
          const [ typeMessage, setTypeMessage ]         = useState('');
          const [ loading, setLoading ]                 = useState('');
          const [ flag, setFlag ]    = useState(false);
        
          // Get list of Banners
          const [banners, setBanners] = useState();
          useEffect(() =>{
        
            api.get("/bannersList").then((response) => {
              setBanners (response.data.result);
              
            });
        
         },[flag])
        
        //  Update list at useEffetc
         const flagUpdate = ()=>(setFlag(!flag));
        
          //  Insert new bannerCategory
            const handleNewBanner = async (e) => {
                e.preventDefault();
             
                setMessage('');
                setLoading(true);
            
                if (title=='' ){
                  setLoading(false);
                  setMessage('Insira um titulo');
                  setTypeMessage('error');
                  return;
                } 
                if (localization == 0 ){
                  setLoading(false);
                  setMessage('Selecione o local de exibição ');
                  setTypeMessage('error');
                  return;
                } 
                const dataImg = document.querySelector('#gallery').value
         
                  await api.post("/newBanner", {
                    bannerId: bannerId,
                    title: title,
                    url: url,
                    localization: localization,
                    active: active,
                    file : dataImg,
                 
                  }).then((response) => {
                    setBannerId('');
                    setTitle('');
                    setLocalization('');
                    setUrl('');
                    setFile('');
                    setMessage();
                    setTypeMessage();
                    
                    var elem = document.getElementById("UploadImages");
                    elem.parentNode.removeChild(elem);
                    
                  });
        
                  // upadate banner list
                  flagUpdate();
                  setLoading(false);
               
              };
        
              function handleEditBanner (bannerId) {
                
                api.get("/bannerById",{params: {
                id: bannerId
              }}).then((response) => {
        
                const data  = response.data.result.map((data)=>(
                  
                  setBannerId(data.id),
                  setTitle (data.title),
                  setUrl (data.url),
                  setActive (data.active),
                  setLocalization (data.localization),
                  setFile (data.file)
                ));
                
                })
                 // upadate banner list
                 flagUpdate();
              }
              
             
              // remove bannerCategory
              function handleDeleteBanner (bannerId) {
                
                api.get("/delBanner",{params: {
                id: bannerId,
                }}).then((response) => {
        
                setBannerId(response.data.id),
                setMessage(response.data.msg);
                setTypeMessage(response.data.type);
                
                })
                // upadate banner list
                flagUpdate();
              }
        
              const flagGallery = ()=>(setFlag(!flag));
        
          return (
            <div className="flex flex-col max-w-7xl mx-auto py-10">
              <h1 className="text-center font-bold text-2xl py-2 text-indigo-500 ">Banners</h1>
        
              <form className="max-w-3xl mx-auto p-2">
              
                <div>
                  <div className="mt-1 ">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Título
                      </label>
                      <div className=" sm:col-span-2">
                      <input  type="text" name="title"  id="title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"   />
                      <input  type="hidden"   name="bannerId"  id="bannerId"   value={bannerId} />
                      
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
                      <label htmlFor="localization" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Local
                      </label>
                      <div className=" sm:col-span-2">
                      <select id="localization" defaultValue={localization}
                      onChange={(e) => setLocalization(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                        <option value="0" > -- Selecione o local -- </option>
                         
                        <option value="Slideshow Pc" selected={(localization == 'Slideshow Pc')?'selected':''}> Slideshow Pc</option>
                        <option value="Slideshow Mobile" selected={(localization == 'Slideshow Mobile')?'selected':''}> Slideshow Mobile</option>
                        <option value="Banner" selected={(localization == 'Banner')?'selected':''}> Banner</option>
                        <option value="PopUp" selected={(localization == 'PopUp')?'selected':''}> PopUp</option>
                      </select>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
                      <label htmlFor="url" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Url para link
                      </label>
                      <div className=" sm:col-span-2">
                      <input  type="text" name="url"  id="url"
                        value={url}
                        onChange={(e)=>setUrl(e.target.value)}
                        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"   />
                      
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
                      <label htmlFor="bannerCategory" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Ativo
                      </label>
                      <div className=" sm:col-span-2">
        
                      <select id="active" name="active"  value={active}
                       onChange={(e) => setActive(e.target.value)}
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                       
                        <option value="1">Habilitado</option>
                        <option value="2">Desabilitado</option>
                      </select>
                      </div>
                    </div>
                    
                    {!bannerId && 
                     <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                     <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                       Upload da imagem 
                     </label>
                     <div className="mt-1 sm:mt-0 sm:col-span-2">
                       <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                         <div className="space-y-1 text-center">
                             <FileUpload props={ {postId:0, flagGallery}}/>
                         </div>
                       </div>
                     </div>
                   </div> 
                    }
                    {bannerId && 
                    <input type="text" className="" name="gallery" id="gallery" value={file}/>
                    }
        
                    
                  </div>
                </div>
              <div className="pt-5">
                  {message  && typeMessage== 'error' && <p className={`bg-red-200 text-red-700 text-center p-4 rounded-md`}> {message}</p>}
                  {message  && typeMessage== 'success' && <p className={`bg-green-200 text-green-700 text-center p-4 rounded-md`}> {message}</p>}
                <div className="flex justify-end">
          
                        {!loading && <button
                          type="submit"
                          onClick={handleNewBanner}
                          className="w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          
                          Salvar
                        </button>
                        }
                        {loading && <button
                          type="submit"
                          disabled
                          className="w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Aguarde...
                        </button>
                        }
                </div>
              </div>
            </form>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</span>
                          </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Titulo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Local
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Url
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Ativo
                          </th>
                         
                        </tr>
                      </thead>
                      <tbody>
                   
                        {banners && banners.map((banner) => (
                          <tr key={banner.id} className={banner.id % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            
                              <button type="button" onClick={()=>handleEditBanner(banner.id)}
                                className="text-indigo-600 hover:text-indigo-900 text-center text-2xl"
                                >
                                <BiCommentEdit className="mx-auto"/>
                              </button>
                              
                              <button type="button" 
                               onClick={ () => { if (window.confirm('Atenção ! você irá remover este item')) handleDeleteBanner(banner.id) } }
                                className="text-red-600 hover:text-red-900 text-center ml-4 text-2xl"
                                >
                                <BiTrash className="mx-auto"/>
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 capitalize">
                            <Image
                              width={150}
                              height={90} 
                              src={banner.file} className="h-24 rounded-md"/>
                              </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 capitalize">{banner.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{banner.localization}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-2xl"><a href={banner.url} alt="veja link" target="_blank" rel="noreferrer"><BiLink/></a></td>
                            <td className={'py-4 whitespace-nowrap text-2xl text-white text-center' + (banner.active==1 ? ' bg-green-500' : ' bg-red-600')}>{banner.active==1 ? <BiCheckDouble className="mx-auto"/>: <BiXCircle className="mx-auto"/>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        
        