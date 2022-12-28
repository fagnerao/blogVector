import React, {useState, useEffect,useContext} from 'react'
import api from '../../pages/api/api';
import {slugUrl} from '../../helper/index'
import { BiCheckDouble, BiXCircle, BiCommentEdit, BiTrash } from "react-icons/bi";
import { userLoginContext } from '../../pages/contexts/userDataContext'
import Router from 'next/router';

  export default function CatList(){

    const {verifyUser} = useContext(userLoginContext);
    console.log(verifyUser)
      useEffect(() => {
      if(verifyUser != true){
        Router.push('/')
        
      };
    },[verifyUser])

  const [ catId, setCatId]            = useState('');
  const [ category, setCategory]      = useState('');
  const [ categoryUp, setCategoryUp ] = useState(0);
  const [ active, setActive ]         = useState(1);
  
  const [ message, setMessage ]                 = useState('');
  const [ typeMessage, setTypeMessage ]         = useState('');
  const [ loading, setLoading ]                 = useState('');
  const [ flag, setFlag ]    = useState(false);

  // Get list of categories
  const [categories, setCategories] = useState();
  useEffect(() =>{

    api.get("/categories").then((response) => {
      setCategories (response.data.result);
      
    });

 },[flag])

//  Update list at useEffetc
 const flagUpdate = ()=>(setFlag(!flag));

  //  Insert new category
    const handleNewCat = async (e) => {
        e.preventDefault();
     
        setMessage('');
        setLoading(true);
    
        if (category=='' ){
          setLoading(false);
          setMessage('Preencha o nome da categoria');
          setTypeMessage('error');
          return;
        }  
    
          await api.post("/category", {
            catId: catId,
            category: category,
            active: active,
            slug: slugUrl(category),
            categoryUp: categoryUp,
    
          }).then((response) => {
            setCatId('')
            setCategory('')
            setMessage();
            setTypeMessage();
            
          });

          // upadate cat list
          flagUpdate();
          setLoading(false);
       
      };

      function handleEditCat (catId) {
        
        api.get("/catById/",{params: {
        catId: catId
      }}).then((response) => {

        const data  = response.data.result.map((data)=>(

          setCatId(data.id),
          setCategory (data.category),
          setCategoryUp (data.category_up),
          setActive (data.active)
        ));
        
        })
         // upadate cat list
         flagUpdate();
      }
      
     
      // remove category
      function handleDeleteCat (catId) {
        
        api.get("/delItem/",{params: {
        catId: catId,
        table: 'category'
      }}).then((response) => {

        setCatId(response.data.id),
        setMessage(response.data.msg);
        setTypeMessage(response.data.type);
        
        })
        // upadate cat list
        flagUpdate();
      }

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-10">
      <h1 className="text-center font-bold text-2xl py-2 text-indigo-500 ">Categorias</h1>

      <form className="max-w-3xl mx-auto">
      
        <div>
          <div className="mt-1 ">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Nome
              </label>
              <div className=" sm:col-span-2">
              <input  type="text" name="category"  id="category"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"   />
              <input  type="hidden"   name="catId"  id="catId"   value={catId} />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Categoria Pai
              </label>
              <div className=" sm:col-span-2">
              <select id="categoryUp" defaultValue="Select 1"
              onChange={(e) => setCategoryUp(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                  {categoryUp && <option value={categoryUp} selected>{categoryUp}</option>}
                <option value="0"> - </option>
                <option value="1">Geral</option>
                <option value="2">Serviços</option>
              </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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
          </div>
        </div>
      <div className="pt-5">
          {message  && typeMessage== 'error' && <p className={`bg-red-200 text-red-700 text-center p-4 rounded-md`}> {message}</p>}
          {message  && typeMessage== 'success' && <p className={`bg-green-200 text-green-700 text-center p-4 rounded-md`}> {message}</p>}
        <div className="flex justify-end">
  
                {!loading && <button
                  type="submit"
                  onClick={handleNewCat}
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
                    Categoria Pai
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
           
                {categories && categories.map((cat) => (
                  <tr key={cat.id} className={cat.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    
                      <button type="button" onClick={()=>handleEditCat(cat.id)}
                        className="text-indigo-600 hover:text-indigo-900 text-center text-2xl"
                        >
                        <BiCommentEdit className="mx-auto"/>
                      </button>
                      
                      <button type="button" 
                       onClick={ () => { if (window.confirm('Atenção ! você irá remover este item')) handleDeleteCat( cat.id ) } }
                        className="text-red-600 hover:text-red-900 text-center ml-4 text-2xl"
                        >
                        <BiTrash className="mx-auto"/>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{cat.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{cat.slug}</td>
                    <td className={'py-4 whitespace-nowrap text-2xl text-white text-center' + (cat.active==1 ? ' bg-green-500' : ' bg-red-600')}>{cat.active==1 ? <BiCheckDouble className="mx-auto"/>: <BiXCircle className="mx-auto"/>}</td>
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


