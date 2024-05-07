import dayjs from 'dayjs';

type Props = {
    date: Date;
    format?: string; // https://day.js.org/docs/en/display/format
} & typeof defaultProps;

const defaultProps = {
    date: new Date()
};

const DateFormat = (props: Props) => {
    return (
        <span className="date-format">{dayjs(props.date).format(props.format)}</span>
    );
};

export default DateFormat;