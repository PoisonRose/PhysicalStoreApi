import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
];

const logger = winston.createLogger({
    levels,
    format,
    transports,
});

export default logger;
