import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import { getProjectAction } from '../../store/actions/project.action';


function TaskContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <TaskEditor projectName={project?.name} tasks={project?.tasks} />
}

export default TaskContainer;