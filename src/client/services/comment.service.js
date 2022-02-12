export function buildCommentHierarchy(comments) {
    const commentToReply = new Map();
    
    comments.forEach(comment => {
        if (commentToReply.has(comment.parent_id)) {
            const replies = commentToReply.get(comment.parent_id);
            replies.push(comment);
            commentToReply.set(comment.parent_id, replies);
        } else {
            commentToReply.set(comment.parent_id, [comment]);
        }
    });

    return comments
        .filter(comment => !comment.parent_id)
        .map(comment => {
            comment.replies = commentToReply.get(comment.id) || [];
            return comment;
        });
}