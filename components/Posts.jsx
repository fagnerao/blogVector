import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import api from '../pages/api/api';


// // get last posts

// export async function getStaticProps() {
//     try {
//       const res  = await fetch (`${process.env.baseURL}/getblog`)
//       const data = await res.json()
//       const posts = data.result
//       return {
//         props: { posts  },
//       }

//     } catch (error) {
//       return {
//         notFound: true,
//       }
//     }

//  }




export default function Posts() {
  const [posts, setPosts] = useState();

  useEffect (()=>{
    // get Post list 
    api.get("/getBlog").then((response) => {
      setPosts (response.data.result);
      });

   
  },[])

 console.log("dados no front",posts)

  return (

        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">

          {posts.map((post) => (
            <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                   width={300}
                   height={350}
                   className="h-48 w-full object-cover" src={post.file} alt={post.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-indigo-600">
                    <a href={post.slug} className="hover:underline">
                      {post.category}
                    </a>
                  </div>
                  <Link href={`pagina/${post.slug}`} className="block mt-2">
                    <p className="text-xl font-semibold capitalize text-gray-900">{post.title}</p>
                  </Link>
                 
                    <div className="mt-3 text-base text-gray-500" dangerouslySetInnerHTML={{__html: post.content}} ></div>
               
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
    
  )
}




