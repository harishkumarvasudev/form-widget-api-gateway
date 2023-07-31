import logger from '../../config/logger.js';

const customHttpLogger = (req, res, next) => {
  logger.debug(
    ` custom HTTP logger - 
    - req  =  ${req.method} ${req.protocol}://${req.subdomains}.${req.hostname}${req.originalUrl}
    - host = ${req.get('host')}
    - url = ${req.originalUrl} 
    - path = ${req.path}
    - params = ${JSON.stringify(req.params)} 
    - query = ${JSON.stringify(req.query)} 
    - body = ${JSON.stringify(req.body)}
    - user agent =  ${req.header('user-agent')}
    - content-type = ${req.header('Content-Type')}`
  );
  return next();
};

export { customHttpLogger };
