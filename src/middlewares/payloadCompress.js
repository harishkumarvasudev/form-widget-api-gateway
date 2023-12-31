import compression from 'compression';

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false; // no compression
  }

  return compression.filter(req,res);
};


export default shouldCompress