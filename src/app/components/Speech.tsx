'use client';
import { FormEventHandler, useState } from "react";
import { ISpeech } from "../../../types/speeches";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { editSpeech, deleteSpeech } from '../../../api';

interface SpeechProps {
  speech: ISpeech
}

const Speech:React.FC<SpeechProps> = ({ speech }) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);

  const [speechToEditTitle, setSpeechToEditTitle] = useState<string>(speech.title);
  const [speechToEditAuthor, setSpeechToEditAuthor] = useState<string>(speech.author);
  const [speechToEditKeywords, setSpeechToEditKeywords] = useState<string>(speech.keywords);
  const [speechToEditContent, setSpeechToEditContent] = useState<string>(speech.content);

  const handleSubmitEditSpeech: FormEventHandler<HTMLFormElement> = async (e) => {
    
    e.preventDefault();
    await editSpeech({
      id: speech.id,
      title: speechToEditTitle,
      author: speechToEditAuthor,
      keywords: speechToEditKeywords,
      content: speechToEditContent,
      timestamp: new Date().toLocaleString() + ""
    })
    setModalOpenEdit(false);
    router.refresh();
  };
  const handleDeleteSpeech = async (id:string) => {
    await deleteSpeech(id);
    setModalOpenDelete(false);
    router.refresh();
  }


  return (
        <tr key={speech.id}>
        <td>{speech.title}</td>
        <td>{speech.author}</td>
        <td>{speech.timestamp}</td>
        <td className="flex gap-5">

<FiEdit size={25} className="text-blue-500" onClick={() => setModalOpenEdit(true)}/>

<Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
  <form onSubmit={handleSubmitEditSpeech}>
    <h3 className='font-bold text-lg'>Edit Speech</h3>
    <div className='modal-action w-full '>
            

<div className="flex flex-col w-full  border-opacity-50">
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Type Title here" className="input input-bordered w-full " 
                      value={speechToEditTitle} onChange={e => setSpeechToEditTitle(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <input type="text" placeholder="Type Author here" className="input input-bordered w-full " 
                      value={speechToEditAuthor} onChange={e => setSpeechToEditAuthor(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Keyword(s)</span>
                </label>
                <input type="text" placeholder="Type Keyword(s) here" className="input input-bordered w-full " 
                      value={speechToEditKeywords} onChange={e => setSpeechToEditKeywords(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Type Speech here"
                      value={speechToEditContent} onChange={e => setSpeechToEditContent(e.target.value)}>
                </textarea>
              </div>
  </div>
  <div className="grid h-20 card place-items-center">
          <button type="submit" className='btn w-full'>Submit</button>
  </div>
</div>

           
    </div>
    
  </form>
</Modal>




<FiTrash2 size={25} className="text-red-500" onClick={() => setModalOpenDelete(true)} />
<Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
    <h3 className="text-lg">Are you sure, you want to delete this Speech?</h3>
    <div className="modal-action">
      <button onClick={() => handleDeleteSpeech(speech.id)}>Yes</button>
      {/* <button onClick={() => handleDeleteSpeech(speech.id)}>No</button> */}
    </div>
</Modal>











          
        </td>
    </tr>
  );
}

export default Speech;