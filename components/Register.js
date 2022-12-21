import { useState } from "react"
import api from '../pages/api/api';


export default function Register() {

  const [ name , setName]                       = useState('');
  const [ email, setEmail ]                     = useState('');
  const [ password, setPassword ]               = useState('');
  const [ confirmPassword, setconfirmPassword ] = useState('');
  const [ message, setMessage ]                 = useState('');
  const [ typeMessage, setTypeMessage ]         = useState('');
  const [ loading, setLoading ]                 = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    if(password !== confirmPassword){
      setLoading(false);
      setMessage('As senhas informadas não são iguais');
      setTypeMessage('error');
      return;
    }

    if (name==''  || email ==='' || password ==='' ){
      setLoading(false);
      setMessage('Preencha todos os campos');
      setTypeMessage('error');
      return;
    }
    
      await api.post("/register", {
        name: name,
        email: email,
        password: password,
      }).then((response) => {
        setMessage(response.data.msg);
        setTypeMessage(response.data.type);
        
      });

   setLoading(false);
   setName('');
   setEmail('');
   setPassword('');
   
  };


  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
         
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Cadastre-se</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <a href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
              efetue seu Login
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" onSubmit={handleSubmit} method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome 
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email 
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="Password"
                    autoComplete="current-confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {message  && typeMessage== 'error' && <p className={`bg-red-200 text-red-700 text-center p-4 rounded-md`}> {message}</p>}
              {message  && typeMessage== 'success' && <p className={`bg-green-200 text-green-700 text-center p-4 rounded-md`}> {message}</p>}
              <div>
                {!loading && <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cadastrar
                </button>
                }
                {loading && <button
                  type="submit"
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Aguarde...
                </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
