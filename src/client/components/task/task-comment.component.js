import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MentionInput from '../lib/mention-input';
import parse from 'html-react-parser';
import SubmitButton from '../ui/buttons/submit-button.component';
import { convertTimeToWords, getInitials } from '../../utility';

function Comment({ comment, isReply, showDelete, onDelete, onReply, onMentionSuggestion }) {
    const [isReplying, setIsReplying] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [commentMentions, setCommentMentions] = useState([]);

    const hasReply = comment.replies?.length > 0;

    const handleCommentSubmitSuccess = () => {
        setCommentText('');
        setCommentMentions([]);
        setIsReplying(false);
    };

    const handleCommentInputChange = (value, mentions) => {
        setCommentText(value);
        setCommentMentions(mentions);
    };

    return <>
        <div className={`comment ${!isReply && 'parent-comment'}`}>
            <div className='comment-header'>
                <div className='comment-initials'>{getInitials(`${comment.user.first_name} ${comment.user.last_name}`)}</div>
                <div className='comment-username'>{comment.user.first_name} {comment.user.last_name}</div>
            </div>
            <div className='comment-body'>
                <div className='comment-body-content'>{parse(comment.comment)}</div>
            </div>
            <div className='comment-footer'>
                {!isReply && 
                    <>
                        <div className='comment-action' onClick={() => setIsReplying(true)}>Reply</div>
                        <div className='comment-seperator'>|</div>
                    </>
                }
                {showDelete(comment) && 
                    <>
                        <div className='comment-action' onClick={() => onDelete(comment.id)}>Delete</div>
                        <div className='comment-seperator'>|</div>
                    </>
                }
                <div className='comment-time'>{convertTimeToWords(comment.created_at)}</div>
            </div>
        </div>
        {hasReply && <div className='ms-4'>
            {comment.replies.map(reply => <Comment 
                key={reply.id} 
                isReply={true} 
                comment={reply} 
                showDelete={showDelete}
                onDelete={onDelete}
            />)}
        </div>}
        {isReplying && <div className='ms-4 mt-2 mb-3 me-2'>
            <TaskCommentInput 
                commentText={commentText}
                mentions={commentMentions}
                parentID={comment.id}
                onCommentInputChange={handleCommentInputChange}
                onCommentSubmit={onReply}
                onMentionSuggestion={onMentionSuggestion}
                onCommentSubmitSuccess={handleCommentSubmitSuccess}
            />    
        </div>}
    </>
}

function TaskCommentInput({ commentText, parentID, mentions, onCommentInputChange, onMentionSuggestion, onCommentSubmit, onCommentSubmitSuccess }) {
    return <div className='mt-3 task-comment-input'>
        <MentionInput 
            value={commentText} 
            dataProvider={onMentionSuggestion} 
            onChange={onCommentInputChange} 
            placeholder='Write a comment...'
        />
        <div className='d-flex justify-content-end mt-3'>
            <SubmitButton className="btn btn-comment-submit" label='Submit' onClick={() => onCommentSubmit(commentText, parentID, mentions, onCommentSubmitSuccess)} />
        </div>
    </div>
}

function TaskComments({ comments, currentUserID, onMentionSuggestion, onCommentSubmit, onCommentDelete }) {
    const [commentText, setCommentText] = useState('');
    const [commentMentions, setCommentMentions] = useState([]);

    const handleCommentInputChange = (value, mentions) => {
        setCommentText(value);
        setCommentMentions(mentions);
    };

    const handleCommentSubmitSuccess = () => {
        setCommentText('');
        setCommentMentions([]);
    };

    return <>
        <div className='comment-section'>
            {
                comments.map(comment => 
                    <Comment 
                        key={comment.id} 
                        comment={comment}
                        showDelete={comment => comment.user_id === currentUserID}
                        onDelete={onCommentDelete}
                        onMentionSuggestion={onMentionSuggestion}
                        onReply={onCommentSubmit}
                    />)
            }
        </div>
        <TaskCommentInput 
            commentText={commentText}
            mentions={commentMentions}
            onCommentInputChange={handleCommentInputChange}
            onCommentSubmit={onCommentSubmit}
            onMentionSuggestion={onMentionSuggestion}
            onCommentSubmitSuccess={handleCommentSubmitSuccess}
        />
    </>
}

Comment.defaultProps = {
    isReply: false,
    showDelete: () => true
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    isReply: PropTypes.bool,
    showDelete: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onMentionSuggestion: PropTypes.func.isRequired
};

TaskComments.defaultProps = {
    comments: []
};

TaskComments.propTypes = {
    comments: PropTypes.array.isRequired,
    currentUserID: PropTypes.string.isRequired,
    onMentionSuggestion: PropTypes.func.isRequired,
    onCommentSubmit: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired
};

export default TaskComments;