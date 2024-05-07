import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { DateFormat } from '../../components';
import './Task.less';

const Task = () => { 
    return (
        <div className="task">
            <div className="task__tags">
                <Chip 
                    className="task__tag_pink"
                    size="small" 
                    variant="outlined"
                    label="Design" 
                />
            </div>
            <div className="task__title">
                Donec fermentum velit vel lectus lobortis condimentum.
            </div>
            <div className="task__responsible-user">
                <Avatar
                    className="task__responsible-user_avatar"
                    variant="square"
                    sx={{ 
                        bgcolor: blue[500],
                        width: 24, 
                        height: 24
                    }}
                    alt="User Name"
                >
                    UN
                </Avatar>
            </div>
            <div className="task__date">
                <DateFormat date={new Date()} format="DD MMM YYYY"/>
            </div>
        </div>
    )
}

export default Task;