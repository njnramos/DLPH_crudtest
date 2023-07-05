import Image from 'next/image'
import SpeechAdd from './components/SpeechAdd'
import SpeechList from './components/SpeechList'
import { getAllSpeeches } from '../../api'

export default async function Home() {
  const speeches = await getAllSpeeches();
  
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Speech Crud Test</h1>
        <SpeechAdd />
      </div>
      <SpeechList speeches={speeches} />
    </main>
  )
}
