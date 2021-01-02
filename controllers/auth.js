module.exports.login = function (req, res) {
  const login = req.body.login;
  const password = req.body.password;
  res.status(200).json({
    login,
    password,
  });
};

module.exports.register = function (req, res) {
  res.status(200).json({
    register: true,
  });
};
