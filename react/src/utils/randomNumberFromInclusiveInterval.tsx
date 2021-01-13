export default function randomNumberFromInclusiveInterval(min: number = 0.001, max: number = 0.04): number {
    return Math.random() * (max - min) + min;
};