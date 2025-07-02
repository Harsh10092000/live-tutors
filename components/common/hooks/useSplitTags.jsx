import { useState, useEffect } from 'react';
import { splitTags } from '../splitTags';

export const useSplitTags = (tags) => {
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        setTagsList(splitTags(tags));
    }, [tags]);

    return tagsList;
}; 