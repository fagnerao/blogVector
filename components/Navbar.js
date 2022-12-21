import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { destroyCookie, parseCookies } from 'nookies'
import { BsFillBellFill, BsMenuUp, BsMenuApp,BsSearch, BsFillPersonCheckFill } from "react-icons/bs"
import { useRouter } from "next/router";
import { HiLockClosed } from "react-icons/hi";
import Link from 'next/link';
import Search from './search';
import Image from 'next/image';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const router = useRouter();
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const {tokenVz} = parseCookies();
    setUserData (tokenVz);
    
  },[userData])
  

  const handleLogoff = () =>{
    
    destroyCookie(null, 'tokenVz')
    router.push('/')
    
  }

   return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    width={50}
                    height={50}
                    className="block lg:hidden h-8 w-auto"
                    src="/static/images/lg.png"
                    alt="Vector Zero"
                  />
                  <Image
                    width={130}
                    height={90}
                    className="hidden lg:block h-8 w-auto"
                    src="/static/images/logo.png"
                    alt="Vector Zero"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  
                  <Link
                    href={"/"}
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Início
                  </Link>
                  <Link
                    href={"/about"}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Sobre Nós
                  </Link>
                  { userData && 
                  <>
                  <Link
                    href={"/admin/Posts"}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Lista de Posts
                  </Link>
                  <Link
                    href={"/admin/banners"}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Banners
                  </Link>
                  <Link
                    href={"/admin/categories"}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Categorias
                  </Link>
                  </>
                  }
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Pesquisa
                  </label>
                  <div className="relative">
                  <Search />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BsMenuApp className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BsMenuUp className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="sr-only flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BsFillBellFill className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                { userData && 
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      <span className="sr-only">Open user menu</span>
                      <BsFillPersonCheckFill className="h-8 w-8 p-2 bg-yellow-400 rounded-full" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <p className="text-gray-500 text-center">{userData ? userData : ''}</p>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={"#"}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Meus Dados
                          </a>
                        )}
                      </Menu.Item>
          
                      {userData && 
                      <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogoff}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sair
                        </button>
                      )}
                    </Menu.Item>
                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
                }
                
                {!userData && 
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                <div>
                <Menu.Item className="pt-4">
                        {({ active }) => (
                          <Link
                            href={"/login"}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <HiLockClosed className="h-8 w-8 p-2 bg-blue-400 rounded-full"/>
                          </Link>
                        )}
                      </Menu.Item>
                    
                  
                </div>
                </Menu>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href={"#"}
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Meus dados
              </Disclosure.Button>
              
              <Disclosure.Button
                as="button"
                onClick={handleLogoff}
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Sobre nós
              </Disclosure.Button>
            </div>
            {userData && 
            <div className="pt-4 pb-3 border-t border-gray-200 ">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                <BsFillPersonCheckFill className="h-8"/>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 sr-only">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">{userData}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BsFillBellFill className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href={"#"}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Meus dados
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href={"/admin/Posts"}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Posts
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href={"/admin/banners"}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Banners
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href={"/admin/categories"}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Categorias
                </Disclosure.Button>
               
                <Disclosure.Button
                  as="button"
                  href={''}
                  onClick={handleLogoff}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logoff
                </Disclosure.Button>
              </div>
            </div>
            }
            {!userData && 
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                <div>
                <Menu.Item className="flex left font-medium">
                        {({ active }) => (
                          <Link
                            href={"/login"}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                           Login
                          </Link>
                        )}
                      </Menu.Item>
                </div>
                </Menu>
                }
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

