import React from 'react';
import { Menu } from 'semantic-ui-react';
import { UserPanel } from './UserPanel';

export const SidePanel: React.FC = () => (
    <Menu size="large" inverted fixed="left" vertical style={{background: '#4c3c4c', fontsize:'1.2rem'}}>
        <UserPanel />
    </Menu>
)