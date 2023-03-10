import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home({posts}) {
 console.log('posts',posts)

  return (
     <>
     <Navbar/>
      <div className="relative bg-indigo-800">
      <div className="absolute inset-0 h-42 bg-gradient-to-r from-cyan-600 to-blue-700">
        
        
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Get in touch</h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque lacus nisi urna, arcu sociis eu. Orci vel
          lectus nisl eget eget ut consectetur. Sit justo viverra non adipisicing elit distinctio.
        </p>
      </div>
    </div>
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">

{posts.result.map((post) => (
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
          
       
      </div>
    </div>
     <Footer/>
    </>
  )
}


export async function loadPosts() {
 
  // Fetch data from external API
  const res  = await fetch('http://127.0.0.1:3001/getBlog');
  const data = await res.json();

  return data
}


export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadPosts()

  // Props returned will be passed to the page component
  return { props: {posts} }
}