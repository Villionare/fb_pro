import React from 'react';
import globalContextZustand from './tempGlobal';
// import CounterGlobalStateZust from './GlobalStates';

// Define the component using TypeScript
const Counter: React.FC = () => {

    // const count = CounterGlobalStateZust((state) => state.count);
    // const handleIncrease = CounterGlobalStateZust((state) => state.increaseCount);
    // const handleDecrease = CounterGlobalStateZust((state) => state.decreaseCount);
    const counter = globalContextZustand((state) => state.normalVal);
    const increase = globalContextZustand((state) => state.increaseIt);
    const decrease = globalContextZustand((state) => state.decreaseIt); 1

    return (
        // Tailwind classes for the main container
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl shadow-lg border border-gray-200">

            {/* Display the current count */}
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                Current Count: <span className="text-gray-800">{counter}</span>
            </h1>

            {/* Container for the buttons */}
            <div className="flex space-x-4">

                {/* Decrease Button */}
                <button
                    onClick={decrease}
                    // Tailwind classes for styling (red for decrease)
                    className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out shadow-md disabled:opacity-50"
                    // Disable the button if the count is 0
                    disabled={counter === 0}
                >
                    Decrease
                </button>

                {/* Increase Button */}
                <button
                    onClick={increase}
                    // Tailwind classes for styling (green for increase)
                    className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 ease-in-out shadow-md"
                >
                    Increase
                </button>
            </div>
            <div className='flex gap-10 text-red-600'>

                {/* <span>
                    replyid:
                    {replyId}
                </span>
                <span>
                    opid:
                    {opid}
                </span>
                <span>
                    threadid:
                    {thread}
                </span> */}
            </div>
        </div>
    );
};

export default Counter;