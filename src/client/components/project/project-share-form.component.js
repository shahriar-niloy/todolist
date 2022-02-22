import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '../lib/popover';
import DeleteIcon from '../ui/icons/delete.icon';

function ProjectShareForm({ 
    projectUsers, 
    searchUsersResult, 
    onRevokeAccess, 
    onSuggestedUserSelect, 
    onSearchQueryChange,
    onUserAccessChange
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const getSearchQueryError = (searchQuery) => {
        console.log(searchQuery);
        if (!searchQuery) return 'This field must not be empty';
        if (searchQuery.length > 30) return 'This field must at most 30 characters long';
        return '';
    }

    const renderSearchQueryError = () => {
        const errorMessage = getSearchQueryError(searchQuery);
        return isTouched && errorMessage && <div className='validation-error'>{errorMessage}</div>
    }

    return <div className="container p-3 user-select-none" >
        <div className="row justify-content-center form-primary">
            <div className="col">
                <div className='mb-3'>
                    <div className='fw-bold font-size-17'>Users with access to the project</div>
                    <div className='py-2'>
                        {
                            projectUsers && projectUsers.map(user => 
                                <div className="d-flex justify-content-between py-1">
                                    <div>
                                        {user.first_name} {user.last_name}<span className='project-owner'>{user.is_owner ? ' (Owner)' : ''}</span>
                                    </div>
                                    <div className='align-y'>
                                        <select 
                                            disabled={user.is_owner} 
                                            className='project-permission-select' 
                                            value={user.can_write ? 'write' : 'read' }
                                            onChange={e => onUserAccessChange(user.id, e.target.value)}
                                        >
                                            <option value='write'>Write</option>
                                            <option value='read'>Read</option>
                                        </select>
                                        <DeleteIcon 
                                            className={`ms-3 ${user.is_owner ? 'disabled' : ''}`}
                                            fontSize={16}
                                            onClick={() => onRevokeAccess(user.id)}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div class="form-group">
                    <label className='fw-bold mb-1 font-size-17'>Share with</label>
                    <input 
                        type="search" 
                        name="search-query" 
                        className="form-control" 
                        id="search-query" 
                        placeholder="Enter a name or email" 
                        value={searchQuery}
                        autoComplete='off'
                        onChange={e => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            setIsTouched(true);
                            !getSearchQueryError(value) && onSearchQueryChange(value);
                        }}
                        onBlur={() => setIsTouched(true)}
                    />
                    {renderSearchQueryError()}
                </div>
                <Popover 
                    className='popover-autosuggest'
                    placement='bottom-start' 
                    isOpen={!!searchUsersResult?.length} 
                    component={() => {
                        return <div>
                            {
                                searchUsersResult && searchUsersResult.map(user => 
                                    <div 
                                        key={user.id} 
                                        className='suggestion' 
                                        onClick={e => {
                                            onSuggestedUserSelect(user.id);
                                            setSearchQuery('');
                                        }} 
                                    > 
                                        <span className='suggestion-header'>{user.first_name} {user.last_name}</span>
                                        <span className='suggestion-info'> ({user.email})</span>
                                    </div>
                                )
                            }
                        </div>
                    }}
                >
                </Popover>
            </div>
        </div>
    </div>;
}

ProjectShareForm.propTypes = {
    onSearchQueryChange: PropTypes.func.isRequired,
    onSuggestedUserSelect: PropTypes.func.isRequired,
    onRevokeAccess: PropTypes.func.isRequired,
    onUserAccessChange: PropTypes.func.isRequired
}

export default ProjectShareForm;