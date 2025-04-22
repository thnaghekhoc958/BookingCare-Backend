import db from '../../models/index'
import UserService from "../../services/UserService/UserService"

let postCrud = async (req,res) => {
    let message = await UserService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from sever');
}

let getHomePage = async (req,res) => {
    return res.render('homepage.ejs');
}

let getAboutHome = (req,res) => {
    return res.render('test/test.ejs');
}

let getCreateAccount = (req,res) => {
    return res.render('index_create_account.ejs');
}

// let getRepairData = async (req,res) => {
//     let user_id = req.query.id;
//     if (user_id) {
//         let user_data = await  UserService.getIdOfUsers(user_id);
//         //check users data
//         return res.render('edit_user.ejs',{
//             user : user_data
//         });
//     } else {
//         return res.send('User not found!!!')
//     }

// }

let getRepairData = async (req,res) => {
    let user_id = req.query.id;
    if (user_id) {
        let user_data = await  UserService.getIdOfUsers(user_id);
        //check users data
        return res.render('edit_user.ejs',{
            user : user_data
        });
    } else {
        return res.send('User not found!!!')
    }

    
    
}

let getUpdateData = async (req,res) => {
    let data = req.body;
    // console.log(data)
    if (data){
        let e_data =  await UserService.updateUsersData(data);
        return res.render('index_read_account.ejs',{
            data : e_data
        });
    }else{
        console.log('that bai ')
    }
    // console.log(data)
    
}


///////////////////////////////////////////////////////
let displayUser = async (req,res) => {
    try {
        let data = await UserService.getAllUser();
        return res.render('index_read_account.ejs',{
            data: data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while retrieving users');
    }
}
///////////////////////////////////////////////////////


let getDeleteDisplay = async(req,res) => {
    let data = req.query.id;
    console.log(data);
    if (data) {
        let user_data = await UserService.deleteUsers(data);
        return res.render('index_read_account.ejs',{
            data : user_data
        })
    } else {
        console.log('failure!!! vi co data')
    }
}

// }

// let displayUser = async (req,res) => {
//     try {
//         let data = await UserService.getAllUser();
//         return res.render('index_read_account.ejs',{
//             data: data
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('An error occurred while retrieving users');
//     }
// }

module.exports = {
    getHomePage: getHomePage,
    getAboutHome: getAboutHome,
    postCrud: postCrud,
    getCreateAccount : getCreateAccount,
    displayUser : displayUser,
    getRepairData : getRepairData,
    getUpdateData : getUpdateData,
    getDeleteDisplay : getDeleteDisplay,
}