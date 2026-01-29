const healthController = {
  health: ( _, res ) => {
    res.status(200).send({
      status: 'ok',
      uptime: process.uptime(),
      timeStamp: Date(),
    });
  },
};

module.exports = {healthController};
