import { ISpeech } from "./types/speeches";

const baseUrl = 'http://localhost:3001';

export const getAllSpeeches = async (): Promise<ISpeech[]> => {
  const res = await fetch(`${baseUrl}/speeches`, {cache: 'no-store' });
  const speeches = await res.json();
  return speeches;
}

export const addSpeech = async (speech: ISpeech): Promise<ISpeech> => {
  const res =await fetch(`${baseUrl}/speeches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(speech)
  })
  const newSpeech = await res.json();
  return newSpeech;
}

export const editSpeech = async (speech: ISpeech): Promise<ISpeech> => {
  const res =await fetch(`${baseUrl}/speeches/${speech.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(speech)
  })
  const updatedSpeech = await res.json();
  return updatedSpeech;
}

export const deleteSpeech = async (id: string): Promise<void> => {
  const res =await fetch(`${baseUrl}/speeches/${id}`, {
    method: 'DELETE',
  })
}