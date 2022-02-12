import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { clearSearchUsersResultAction, debouncedSearchUsersAction } from '../../store/actions/user.actions';
import ProjectShareForm from '../../components/project/project-share-form.component';
import { getProjectUsersAction, revokeProjectUserAccessAction, shareProjectAction } from '../../store/actions/project.action';

function ProjectShareFormContainer({ onClose, projectID }) {
    const dispatch = useDispatch();
    const suggestedUsers = useSelector(state => state.user.suggestedUsers);
    const shareForm = useSelector(state => state.project.shareForm);
    const projectUsers = shareForm?.users || [];

    const handleSuggestedUserSelect = (selectedUserID) => {
        dispatch(shareProjectAction(projectID, { user_id: selectedUserID }));
        dispatch(clearSearchUsersResultAction());
        dispatch(getProjectUsersAction(projectID));
    };

    const handleRevokeAccess = userID => {
        dispatch(revokeProjectUserAccessAction(projectID, userID));
    }

    const handleUserSearchQueryChange = query => {
        query 
            ? dispatch(debouncedSearchUsersAction(query, projectID))
            : dispatch(clearSearchUsersResultAction());
    };

    const handleUserAccessChange = (userID, access) => {
        if (access === 'write') {
            dispatch(shareProjectAction(projectID, { user_id: userID, can_write: true }));
        } else {
            dispatch(shareProjectAction(projectID, { user_id: userID, can_write: false, can_read: true }));
        }
    };

    useEffect(() => {
        dispatch(clearSearchUsersResultAction());
        dispatch(getProjectUsersAction(projectID));
    }, []);

    return <ProjectShareForm 
        projectUsers={projectUsers}
        searchUsersResult={suggestedUsers}
        onRevokeAccess={handleRevokeAccess}
        onSuggestedUserSelect={handleSuggestedUserSelect}
        onSearchQueryChange={handleUserSearchQueryChange}
        onUserAccessChange={handleUserAccessChange}
    />;
}

ProjectShareFormContainer.propTypes = {
    onClose: PropTypes.func,
    projectID: PropTypes.string
}

export default ProjectShareFormContainer;