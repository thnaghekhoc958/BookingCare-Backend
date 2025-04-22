import LoginSreen from '../../Mobile/service/loginSreen'


let handleLoginUser = async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "mising required parameters",
      users: [],
    });
  }
  let users = await LoginSreen.handleLogin(email,password);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};



module.exports = {
    handleLoginUser: handleLoginUser,
};
