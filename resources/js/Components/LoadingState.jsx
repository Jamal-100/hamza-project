import React from 'react';

export default function LoadingState({ message }) {
    return (
        <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">{message}</p>
        </div>
    );
}