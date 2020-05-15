import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

interface HeaderProps {
    title: string
}

export const UserPanelHeader:React.FC<HeaderProps> = ({title}: HeaderProps) => (
    <Header inverted floated="left" as="h2">
        <Icon name="code" />
        <Header.Content>{title}</Header.Content>
    </Header>
)