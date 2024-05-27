import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { loadAllTeams, loadAllUsers } from '../../actions';
import { TeamState, UserState } from '../../reducers/state';
import { EntityStatus, Task as TaskInfo, Team, User } from '../../models';
import Chip from '@mui/material/Chip';
import Tooltip from "@mui/material/Tooltip";
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { blue } from '@mui/material/colors';
import { DateFormat } from '../../components';
import './Task.less';

type Props = { 
    task: TaskInfo;
};

const Task = (props: Props) => { 
    const dispatch = useDispatch();
    const {t} = useTranslation("common");

    const teams = useSelector(state => ((state as any).teams as TeamState)).entities;
    const teamsStatus = useSelector(state => ((state as any).teams as TeamState)).status;

    const users = useSelector(state => ((state as any).users as UserState)).entities;
    const usersStatus = useSelector(state => ((state as any).users as UserState)).status;

    useEffect(() => {
        if(!!props.task.teamId && teamsStatus === EntityStatus.Init) {
            loadAllTeams(dispatch);
        }

        if(usersStatus === EntityStatus.Init) {
            loadAllUsers(dispatch);
        }
    }, [teamsStatus, usersStatus]);

    const renderTags = () => {
        if(!props.task.teamId) {
            return null;
        }

        return (
            <div className="task__tags">
                {renderTeam()}
            </div>
        );
    }

    const renderTeam = () => {
        if(!props.task.teamId) {
            return null;
        }

        if(teamsStatus === EntityStatus.Init) {
            return <LinearProgress className="task__progress_pink" />;
        }

        const team : Team | undefined = teams.find(team => team.id === props.task.teamId);
        const teamName: string = team ? team.name : t('team.name.unknown');
        
        return (
            <Chip 
                className="task__tag_pink"
                size="small" 
                variant="outlined"
                label={teamName}
            />
        );
    };

    const renderResponsibleUser = () => {
        if(!props.task.userId) {
            return null;
        }

        if(usersStatus === EntityStatus.Init) {
            return (
                <div className="task__responsible-user">
                    <LinearProgress />
                </div>
            );
        }

        const user : User | undefined = users.find(user => user.id === props.task.userId);
        const userName: string = user ? user.getFullName() : t('user.name.unknown');
        const userInitials: string = user ? user.getInitials() : '?';

        return (
            <div className="task__responsible-user">
                <Tooltip 
                    title={userName} 
                    arrow 
                    placement="top"
                >
                    <Avatar
                        className="task__responsible-user_avatar"
                        variant="square"
                        sx={{ 
                            bgcolor: blue[500],
                            width: 24, 
                            height: 24
                        }}
                        alt={userName}
                    >
                        {userInitials}
                    </Avatar>
                </Tooltip>
            </div>
        );
    }

    return (
        <div className="task">
            {renderTags()}
            <div className="task__title">
                {props.task.title}
            </div>
            {renderResponsibleUser()}
            <div className="task__date">
                { props.task.dueDate && <DateFormat date={props.task.dueDate} format="DD MMM YYYY"/> }
            </div>
        </div>
    )
}

export default Task;