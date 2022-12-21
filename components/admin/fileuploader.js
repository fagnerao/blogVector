import { useRef, useState } from 'react';


function FileUpload(data) {
  const filesElement = useRef(null);
 

  const [ message, setMessage ]                 = useState('');
  const [ typeMessage, setTypeMessage ]         = useState('');
  const [ loading, setLoading ]                 = useState('');
 

  const [postId, setPostId] = useState(data.props.postId);

  const sendFile = async () => {

    const dataForm = new FormData();
    setMessage('');
    setLoading(true);

    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    dataForm.append('postId', postId);
    
    const res = await fetch(`${process.env.baseURL}/upload`, {
      method: 'POST',
      body: dataForm,
    });

    const data = await res.json();
    setMessage(data.msg);
    setTypeMessage(data.type);
    setLoading(false);
    window.location.reload();
  };


  return (
    <>
      {message  && typeMessage== 'error' && <p className={`bg-red-200 text-red-700 text-center p-4 rounded-md`}> {message}</p>}
      {message  && typeMessage== 'success' && <p className={`bg-green-200 text-green-700 text-center p-4 rounded-md`}> {message}</p>}
             
    <div className="flex">
      <input type="file" multiple  ref={filesElement} />

        {!loading && <button
          type="submit"
          onClick={sendFile}
          className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload
        </button>
        }
        {loading && <button
          type="submit"
          disabled
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Enviando...
        </button>
        }
    </div>
    
  </>
  );
}

export default FileUpload; 