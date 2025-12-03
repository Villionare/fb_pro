// BoardItem.tsx
import React from 'react';
import useSessionContext from '../../context/useContext';

interface BoardItemProps {
  board: {
    id: number;
    name: string;
    title: string;
  };
  onDelete: (id: number) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, onDelete }) => {
  const { user } = useSessionContext();

  return (
    <div className="">
      <div className="">
        <div className="">
          {board.name}
        </div>
        <div>
          <h3 className="">{board.title}</h3>
          <p className="">/{board.name}/</p>
        </div>
      </div>
      {
        user?.session_data?.type === "admin" ?
          <button
            onClick={() => onDelete(board.id)}
            className=""
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> : null
      }

    </div>
  );
};

export default BoardItem;