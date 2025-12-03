// Boards.tsx
import React, { useState } from 'react';
import Boards from '../boards/boards';
import { useQuery } from '@tanstack/react-query';
import fetchBoardsAndCategories from '../../api/services/fetchCategories&Boards';
import Threads from '../threads/threads';

//we will be declaring the interface where we are recieving the data.
export type BoardData = {
    name: string,
    slug: string
}

const BoardCategories: React.FC = () => {
    const [selectedBoardDetails, setSelectedThreadDetails] = useState<BoardData>();

    const { data } = useQuery({
        queryKey: ["fetchCategories"],
        queryFn: fetchBoardsAndCategories
    });

    return (
        <div className="flex flex-col text-slate-50 my-10">

            <h2 className="text-3xl font-bold mb-2 mx-5">Board Categories:</h2>

            <div className="flex flex-col gap-5 mx-15">

                {data?.boardCategories.map((v) => (
                    <div key={v.category_id} className='flex'>
                        <div>
                            <p key={v._id} className='text-amber-300 w-40'>{v.name}</p>
                            <h2 className="text-red-600">(Boards):</h2>
                        </div>
                        <Boards boardId={v._id} setSelectedThreadDetails={setSelectedThreadDetails} response={data} />
                    </div>
                ))}
            </div>
            {/* <Counter /> */}
            {selectedBoardDetails && <Threads selectedBoardDetails={selectedBoardDetails} />}
        </div>
    );
};

export default BoardCategories;