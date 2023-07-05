'use client';
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addSpeech } from '../../../api';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';

const SpeechAdd = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newSpeechTitleValue, setNewSpeechTitleValue] = useState<string>("");
  const [newSpeechAuthorValue, setNewSpeechAuthorValue] = useState<string>("");
  const [newSpeechKeywordsValue, setNewSpeechKeywordsValue] = useState<string>("");
  const [newSpeechContentValue, setNewSpeechContentValue] = useState<string>("");

  const handleSubmitNewSpeech: FormEventHandler<HTMLFormElement> = async (e) => {
    
    e.preventDefault();
    await addSpeech({
      id: v4(),
      title: newSpeechTitleValue,
      author: newSpeechAuthorValue,
      keywords: newSpeechKeywordsValue,
      content: newSpeechContentValue,
      timestamp: new Date().toLocaleString() + ""
    })
    setNewSpeechTitleValue("");
    setNewSpeechAuthorValue("");
    setNewSpeechKeywordsValue("");
    setNewSpeechContentValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add new Speech <AiOutlinePlus size={18} className='ml-2'/></button>

<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
  <form onSubmit={handleSubmitNewSpeech}>
    <h3 className='font-bold text-lg'>Add new Speech</h3>
    <div className='modal-action w-full '>
            

<div className="flex flex-col w-full  border-opacity-50">
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Type Title here" className="input input-bordered w-full " 
                      value={newSpeechTitleValue} onChange={e => setNewSpeechTitleValue(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <input type="text" placeholder="Type Author here" className="input input-bordered w-full " 
                      value={newSpeechAuthorValue} onChange={e => setNewSpeechAuthorValue(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Keyword(s)</span>
                </label>
                <input type="text" placeholder="Type Keyword(s) here" className="input input-bordered w-full " 
                      value={newSpeechKeywordsValue} onChange={e => setNewSpeechKeywordsValue(e.target.value)}/>
              </div>
  </div>
  <div className="grid card ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Type Speech here"
                      value={newSpeechContentValue} onChange={e => setNewSpeechContentValue(e.target.value)}>
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




    </div>
  );
};

export default SpeechAdd;