export const logger = (req, res, next) => {
  const now = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.log(`[${now}] 📥 ${method} ${url} | IP: ${ip}`);

  next();
};
