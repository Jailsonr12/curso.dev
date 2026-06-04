function status(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}

export default status;
