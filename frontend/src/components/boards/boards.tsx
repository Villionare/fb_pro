import React from 'react';
import type { HomeDataMain } from '../../Types/apiBoardCategories';
import type { BoardData } from '../boardCategories/boardCategories';

interface prop {
    boardId: string,
    response: HomeDataMain | null,
    setSelectedThreadDetails: (val: BoardData) => void
}

const Boards: React.FC<prop> = ({ boardId, response, setSelectedThreadDetails }) => {

    //now boards will be fitered acc. to board category id
    // console.log("board cat id ", boardId);

    return (
        <div className="flex gap-3">
            <div className="flex gap-2 flex-wrap">
                {response?.boards?.filter((v) => v.board_category === boardId)
                    .map((board) => (
                        <div className='text-white' key={board._id}>
                            <h2 onClick={() => setSelectedThreadDetails({ name: board.name, slug: board.slug })}>
                                <span className='text-gray-500'>[{board.slug}]</span>
                                <span className='hover:text-red-600 cursor-pointer'> {board.name}</span>
                                <span className='text-yellow-400'>|</span>
                            </h2>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Boards;