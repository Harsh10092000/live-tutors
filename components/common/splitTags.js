export const splitTags = (tags) => {
    return tags ? tags.split(',').map(tag => tag.trim()) : [];
}; 