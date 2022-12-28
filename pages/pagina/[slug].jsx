import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import GalleryPage from '../../components/admin/galleryPage';

export default function Pagina({post}){
  
  return (
    <>
    <Navbar/>
    <div className="relative bg-blue-400">
          
      <div className="absolute inset-0 h-42 bg-gradient-to-r from-cyan-600 to-blue-700">
      </div>
      <div className="relative max-w-6xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        {!post && <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl capitalize text-center mb-[200px] lg:text-6xl">Página não encontrada</h1>}
        {post && <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl capitalize lg:text-6xl">{post.result[0].title}</h1>}
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
         
        </p>
      </div>
    </div>
    {post && 
    <>
    <div className=" py-16 bg-white overflow-hidden max-w-7xl mx-auto ">
      <div className="px-4 sm:px-6 lg:px-8">
      
        <div className="mt-6 text-gray-600 "
        dangerouslySetInnerHTML={{__html: post.result[0].content}}
        >
        </div>
    </div>
  </div>

    <GalleryPage props={post.result[0].id}/>
    </>
}
    <Footer/>
    </>
  )
}

export async function getServerSideProps({ query }){
  
 const slug = query.slug
 const res   = await fetch (`${process.env.baseURL}/postBySlug?slug=${slug}`)
 const post = await res.json()
 
  return {
    props: {
      post
    }
  }
}


