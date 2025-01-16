export const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const elapsedMilliseconds = now - then;

    if (elapsedMilliseconds < 60000) {
        // Less than a minute
        return 'Just now';
    } else if (elapsedMilliseconds < 3600000) {
        // Less than an hour
        const minutes = Math.floor(elapsedMilliseconds / 60000);
        return `${minutes}m`;
    } else if (elapsedMilliseconds < 86400000) {
        // Less than a day
        const hours = Math.floor(elapsedMilliseconds / 3600000);
        return `${hours}h`;
    } else if (elapsedMilliseconds < 604800000) {
        // Less than a week
        const days = Math.floor(elapsedMilliseconds / 86400000);
        return `${days}d`;
    } else if (elapsedMilliseconds < 2592000000) {
        // Less than a month
        const weeks = Math.floor(elapsedMilliseconds / 604800000);
        return `${weeks}w`;
    } else if (elapsedMilliseconds < 31536000000) {
        // Less than a year
        const months = Math.floor(elapsedMilliseconds / 2592000000);
        return `${months}mo`;
    } else {
        // More than a year
        const years = Math.floor(elapsedMilliseconds / 31536000000);
        return `${years}y`;
    }
};
