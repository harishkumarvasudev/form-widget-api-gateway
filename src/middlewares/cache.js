import config from "../../config/config.js";

const setCache = (req, res, next) => {
  const period = config.cache.cachePeriod;
  res.set("Cache-Control", `no-store`);
  next();
};

export { setCache };
