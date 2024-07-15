import React from 'react';
import { useParams } from 'react-router-dom';

export const LearningPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Learning Page for Card {id}</h1>
            <p>This is the detailed learning page for card {id}.</p>
        </div>
    );
};
