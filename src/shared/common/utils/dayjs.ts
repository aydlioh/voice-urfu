import dayjs from 'dayjs';
export const formatTime = (timestamp: string) => dayjs(timestamp).format('HH:mm');
