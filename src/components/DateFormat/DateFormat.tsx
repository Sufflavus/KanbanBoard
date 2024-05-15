import { formatDate } from '../../utils/locale.helper';

type Props = {
    date: Date;
    format?: string; // https://momentjs.com/docs/#/displaying/
} & typeof defaultProps;

const defaultProps = {
    date: new Date()
};

const DateFormat = (props: Props) => {
    return (
        <span className="date-format">{formatDate(props.date, props.format)}</span>
    );
};

export default DateFormat;