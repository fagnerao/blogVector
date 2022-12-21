import React, {useEffect,useState} from 'react'
import api from '../../pages/api/api';
import {slugUrl} from '../../helper/index'
import FileUpload from './fileuploader';
import { useRouter } from "next/router";
import Link from 'next/link';
import GalleryList from './galleryList';

import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })


export default function NewPost(){

  
  const router = useRouter();
  const [ postId, setPostId] = useState('');
  const [ category, setCategory] = useState(0)
  const [ title, setTitle ]      = useState('');
  const [ content, setContent ]  = useState('');
  const [ active, setActive ]    = useState(1);
  
  const [ message, setMessage ]                 = useState('');
  const [ typeMessage, setTypeMessage ]         = useState('');
  const [ loading, setLoading ]                 = useState('');
  
  const [categories, setCategories] = useState();

  useEffect(() =>{
  // get Category list 
    api.get("/categories").then((response) => {
    setCategories (response.data.result);
      
    });
    

     if (router.query.id){
        setPostId(router.query.id);

      api.get("/postById/",{params: {
        postId: router.query.id
      }}).then((response) => {

        const data  = response.data.result.map((data)=>(
          setTitle (data.title),
          setContent (data.content),
          setActive (data.active),
          setCategory (data.id_category)
        ))
      
      })
      
    }
    
  },[router.query.id])

  // Insert new post

  const handleNewPost = async (e) => {
    e.preventDefault();
 
    setMessage('');
    setLoading(true);

    if (title==''  || content ===''  ){
      setLoading(false);
      setMessage('Preencha todos os campos');
      setTypeMessage('error');
      return;
    }  
    if (category == 0 ){
      setLoading(false);
      setMessage('Selecione uma categoria ');
      setTypeMessage('error');
      return;
    }  

      await api.post("/post", {
        postId: postId,
        title: title.toLowerCase(),
        content: content,
        active: active,
        slug: slugUrl(title),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        id_category: category,

      }).then((response) => {
        setPostId(response.data.insertedId)
        setMessage(response.data.msg);
        setTypeMessage(response.data.type);
        
      });

   setLoading(false);
     
  };

  return (
    <>
    <form className="space-y-8 divide-y divide-gray-200 max-w-3xl mx-auto py-24 p-2">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-xl font-medium text-blue-700 text-center">Novo Post</h3>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Título
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input  type="text" name="title"  id="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="bg-white relative w-full border capitalize border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"   />
              <input  type="hidden"   name="postId"  id="postId"   value={postId} />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Categoria
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select id="category" name="category" 
              onChange={(e) => setCategory(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                  <option value="0"> -- Selecione uma categoria --</option>
                  {categories && categories.map((cat) => (
                  <option value={cat.id} key={cat.id} selected={(cat.id == category)? 'selected' :''}>{cat.category} </option>
                  ))}
              
              </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Ativo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">

              <select id="active" name="active" 
               onChange={(e) => setActive(e.target.value)}
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               
                <option value="1" selected={(active == 1)?'selected':''}>Ativo</option>
                <option value="2" selected={(active == 2)?'selected':''}>Desativado</option>
              </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Conteúdo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
  
              <ReactQuill theme="snow" value={content} onChange={setContent} 
                className="p-2 h-44 max-w-lg shadow-sm block w-full sm:text-sm focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            
            </div>

            
          { postId!= '' && 
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Upload de Imagens
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                      <FileUpload props={{postId}}/>
                  </div>
                </div>
              </div>
            </div> 
            }
            
          {postId!= '' &&
            <GalleryList props={postId}/>
          }
          </div>
        </div>

      </div>

      <div className="pt-5">
          {message  && typeMessage== 'error' && <p className={`bg-red-200 text-red-700 text-center p-4 rounded-md`}> {message}</p>}
          {message  && typeMessage== 'success' && <p className={`bg-green-200 text-green-700 text-center p-4 rounded-md`}> {message}</p>}
        <div className="flex justify-around">
  
                <Link
                    href={"/admin/Posts"}
                 
                  className="w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  
                  Retornar
                </Link>
                
                {!loading && <button
                  type="submit"
                  onClick={handleNewPost}
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
      
    </>
  )
}


