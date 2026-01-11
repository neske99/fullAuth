import winston from 'winston'


//replace winston for pino
export default winston.createLogger({
  transports:[new winston.transports.Console]
});