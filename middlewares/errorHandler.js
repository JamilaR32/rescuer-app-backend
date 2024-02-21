//\\ بسم الله الرحمن الرحيم //\\

module.exports = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
