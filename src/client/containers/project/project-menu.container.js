import React from 'react';
import ProjectMenu from '../../components/project/project-menu.component';
import ArchiveIcon from '../../components/ui/icons/archive.icon';
import CheckCircleIcon from '../../components/ui/icons/check-circle.icon';
import TrashIcon from '../../components/ui/icons/trash.icon';

function ProjectMenuContainer() {
    const menuitems = [
        { label: 'Show completed tasks', onClick: () => console.log('SHow tasks completed'), icon: <CheckCircleIcon className="me-2" /> },
        { label: 'Archive project', onClick: () => console.log('Archive'), icon: <ArchiveIcon className="me-2" /> },
        { label: 'Delete project', onClick: () => console.log('Delete'), icon: <TrashIcon className="me-2" /> }
    ];

    return <ProjectMenu menuitems={menuitems} />
}

export default ProjectMenuContainer;