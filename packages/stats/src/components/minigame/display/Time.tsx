import React from 'react';
import {Typography} from 'antd';

interface TimeProps
{
	ms: number;
}

export const Time: React.FunctionComponent<TimeProps> = (props) =>
{
	const ms = props.ms.toString().slice(-3).padStart(3, '0');
	const seconds = Math.floor(props.ms / 1000).toString().padStart(2, '0');
	const minutes = Math.floor(props.ms / 1000 / 60).toString().padStart(2, '0');
	const hours = Math.floor(props.ms / 1000 / 60 / 60).toString().padStart(2, '0');

	return <div>
		<Typography.Text type={hours === '00' ? 'secondary' : undefined}>{hours}</Typography.Text>
		<Typography.Text type={'secondary'}>:</Typography.Text>
		<Typography.Text type={minutes === '00' ? 'secondary' : undefined}>{minutes}</Typography.Text>
		<Typography.Text type={'secondary'}>:</Typography.Text>
		<Typography.Text type={seconds === '00' ? 'secondary' : undefined}>{seconds}</Typography.Text>
		<Typography.Text type={'secondary'}>.</Typography.Text>
		<Typography.Text type={ms === '000' ? 'secondary' : undefined}>{ms}</Typography.Text>
	</div>;
};
