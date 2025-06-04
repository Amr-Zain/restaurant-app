
export const generateNumbers = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) =>
        (start + i).toString().padStart(2, "0"),
    );
};
export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};