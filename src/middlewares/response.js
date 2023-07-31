import { StatusCodes } from 'http-status-codes';
import config from '../../config/config.js';

/*

  200 - success               - OK
  400 - missing params        - BAD_REQUEST
  401 - unauthenticated       - UNAUTHORIZED
  403 - unauthorized          - FORBIDDEN
  404 - Not found             - NOT_FOUND
  413 - payload too large     - REQUEST_TOO_LONG
  500 - internal server Error - INTERNAL_SERVER_ERROR

*/

const response = (req, res, next) => {
  res.success = ({ data, code }) =>
    res
      .status(StatusCodes.OK)
      .send({ status: config.standardResponse.success.status, data: data || '' });

  res.invalid = ({ error, code }) =>
    res.status(StatusCodes.BAD_REQUEST).send({
      status: config.standardResponse.invalid.status,
      data: { message: error.data || config.standardResponse.invalid.message },
    });

  res.notFound = ({ error, code }) =>
    res.status(StatusCodes.NOT_FOUND).send({
      status: config.standardResponse.notFound.status,
      data: { message: error.data || config.standardResponse.notFound.message },
    });

  res.failure = ({ error, code }) =>
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: config.standardResponse.failure.status,
      data: { message: error.data || config.standardResponse.failure.message },
    });

  res.notSupported = ({ error, code }) =>
    res.status(StatusCodes.BAD_REQUEST).send({
      status: config.standardResponse.notSupportedMethod.status,
      data: { message: error.data || config.standardResponse.notSupportedMethod.message },
    });

  res.unauthorized = ({ error, code }) =>
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ status: config.standardResponse.unauthorized.status, data: { message: error.data || config.standardResponse.unauthorized.message } });


  res.forbidden = ({ error, code }) =>
    res
      .status(StatusCodes.FORBIDDEN)
      .send({ status: config.standardResponse.forbidden.status, data: { message: error.data || config.standardResponse.forbidden.message } });
  
  next();
};

export default response;
