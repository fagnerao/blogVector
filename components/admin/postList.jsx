import React, {useState, useEffect, useContext} from 'react'
import api from '../../pages/api/api';
import { userLoginContext } from '../../pages/contexts/userDataContext'
import { BiCheckDouble, BiXCircle, BiCommentEdit, BiTrash } from "react-icons/bi";
import Link from 'next/link';
import Router from 'next/router';

export default function PostList(){
  
  const {verifyUser} = useContext(userLoginContext);
  
  useEffect(() => {
    if(verifyUser != true){
      Router.push('/')
      
    };
  },[verifyUser])
  
  const [ flag, setFlag ]    = useState(false);
  const [categories, setCategories] = useState();
 
  //  Update list at useEffetc
  const flagUpdate = ()=>(setFlag(!flag));
  const [posts, setPosts] = useState();

      useEffect (()=>{
        // get Category list 
        api.get("/categories").then((response) => {
          setCategories (response.data.result);
            
          });

        // Get Post List
        api.get("/posts").then((response) => {
          setPosts (response.data.result);
        });
      },[])
   
  // remove category
  function handleDeletePost (postId) {
        
    api.get("/delPost/",{params: {
    postId: postId,
    }}).then((response) => {
  
      document.getElementById(postId).classList.add("sr-only");    
    })
    // upadate cat list
    flagUpdate();
  }

  
  return (
    <div className="flex flex-col max-w-7xl mx-auto py-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <span className="flex justify-around">
      <h1 className="text-center font-medium text-2xl py-2 text-indigo-500 ">Lista de Postagens</h1>
      <Link href="/admin/newPost" alt="Inserir novo post" className="bg-indigo-600 text-white rounded-lg pt-3 px-4 hover:bg-blue-600"> Novo Post</Link>
      </span>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
            <th scope="col" className="relative px-6 py-3">
                    <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</span>
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
                    Categoria
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
           
                {posts && posts.map((post) => (
                  <tr key={post.id} id={post.id} className={post.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-4 py-2  text-sm font-medium flex gap-5 justify-center ">
                    
                      <Link href={{
                          pathname: "/admin/newPost",
                            query: {id:post.id}, 
                        }}
                        className="text-indigo-600 hover:text-indigo-900 text-center text-2xl"
                        >
                        <BiCommentEdit className="mx-auto"/>

                      </Link>
                      <button type="button" 
                       onClick={ () => { if (window.confirm('Atenção ! você irá remover este item')) handleDeletePost( post.id ) } }
                        className="text-red-600 hover:text-red-900 text-center ml-4 text-2xl"
                        >
                        <BiTrash className="mx-auto"/>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize font-medium text-gray-600">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                    {categories && categories.map((cat) => (
                      <span  key={cat.id}> {(cat.id == post.id_category) ? cat.category :''}</span>
                      ))}
                    </td>
                    <td className={'py-4 whitespace-nowrap text-2xl text-white text-center' + (post.active==1 ? ' bg-green-500' : ' bg-red-600')}>{post.active==1 ? <BiCheckDouble className="mx-auto"/>: <BiXCircle className="mx-auto"/>}</td>
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


