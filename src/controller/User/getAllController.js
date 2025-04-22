// import newUserServices from "../../services/UserService/newUsersServicee"
import usersAdjustment from "../../services/UserService/userServiceReact";

let handleGetAllUsers = async (req, res) => {
  // console.log(req.body)
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "mising required parameters",
      users: [],
    });
  }
  let users = await usersAdjustment.getAllOfUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateUsers = async (req, res) => {
  console.log(req.body);
  let users = await usersAdjustment.createNewUser(req.body);
  return res.status(200).json(users)
};

let handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "missing require parameter!",
    });
  }
  if (req.body) {
    console.log("req.body is: ", req.body);
    // let users = 
    return res.status(200).json(await usersAdjustment.deleteUsers(req.body))
  } else {
    console.log("khong the tim thay nguoi dung!");
  }
};

let handleGetAllEditUsers = async (req, res) => {
  let data = req.body;
  let users = await usersAdjustment.getEditData(data);

  return res.status(200).json(users);
};

let getAllCode = async (req, res) => {
  try {
    let data = await usersAdjustment.getAllCodeService(req.query.type);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errcode: 1,
      message: "Error from server",
    });
  }
};

let UpdateUserRedux = async (req,res) => {
  let data = req.body;
  console.log('data',data)
  return res.status(200).json(await usersAdjustment.UpdateUserDataOfRedux(data))
}

module.exports = {
  handleGetAllUsers: handleGetAllUsers,
  handleGetAllEditUsers: handleGetAllEditUsers,
  handleCreateUsers: handleCreateUsers,
  handleDeleteUsers: handleDeleteUsers,
  getAllCode: getAllCode,
  UpdateUserRedux:UpdateUserRedux,
};
