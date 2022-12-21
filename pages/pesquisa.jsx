import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


export default function Pesquisa({post}){
  
  return (
    <>
    <Navbar/>
    <div className="relative max-w-7xl mx-auto">
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {post.map((post) => (
              <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                <Image
                   width={300}
                   height={350}
                  className="h-48 w-full object-cover" src={post.file} alt={post.title} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href={post.slug} className="hover:underline">
                        {post.category}
                      </a>
                    </p>
                    <Link href={`pagina/${post.slug}`} className="block mt-2">
                      <p className="text-xl font-semibold capitalize text-gray-900">{post.title}</p>
                      <div className="mt-3 text-base text-gray-500" dangerouslySetInnerHTML={{__html: post.content}} ></div>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    
                    <div className="ml-3">
                    
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.created_at}>{post.created_at}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    <Footer/>
    </>
  )
}

export async function getServerSideProps({ query }){
 
 const slug = query.search
 
 const res  = await fetch (`http://localhost:3001/search?search=${slug}`)
 const post = await res.json()
 
  return {
    props: {
      post : post.result
    }
  }
}


