export function convertMsToTime(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    let hoursDisplay = hours > 0 ? hours + " hr " : "";
    let minutesDisplay = minutes > 0 ? minutes + " min" : "";

    return hoursDisplay + minutesDisplay;
}


export function convertMsToMinutesSeconds(ms) {
    const totalSeconds = Math.floor(ms / 1000); // Tính tổng số giây
    const minutes = Math.floor(totalSeconds / 60); // Lấy phần phút
    const seconds = totalSeconds % 60; // Lấy phần giây còn lại sau khi trừ phút

    // Nếu giây chỉ có 1 chữ số, thêm số 0 phía trước
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${formattedSeconds}`;
}

export function convertSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Lấy số phút
    const remainingSeconds = seconds % 60; // Lấy số giây còn lại

    // Đảm bảo số giây luôn hiển thị 2 chữ số nếu dưới 10
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return minutes + ':' + formattedSeconds;
}