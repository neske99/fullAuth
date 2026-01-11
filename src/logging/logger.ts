import pino from 'pino';
import winston from 'winston'


//replace winston for pino
export default pino(
  pino.transport({
  target:'pino-pretty'
  }
  )
);