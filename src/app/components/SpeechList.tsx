import { ISpeech } from "../../../types/speeches";
import React from "react";
import Speech from '../components/Speech'

interface SpeechListProps {
  speeches: ISpeech[]
}

const SpeechList: React.FC<SpeechListProps> = ({ speeches }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Modified Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {speeches.map((speech) => (
            <Speech key={speech.id} speech={speech} />
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default SpeechList;