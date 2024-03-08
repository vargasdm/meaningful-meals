import userDao from "../repository/userDAO";
const uuid = require("uuid");
const bcrypt = require("bcrypt");

async function login(recievedData: any) {
  const data : any = await userDao.getEmployeeByUsername(recievedData.username);
  if (
    data &&
    recievedData.username === data[0].username &&
    (await bcrypt.compare(recievedData.password, data[0].password))
  ) {
    return data ? data : null;
  }

  return null;
}

async function postEmployee(receivedData: any) {
  if (await validateUsername(receivedData.username)) {
    let data = await userDao.postEmployee({
      user_id: uuid.v4(),
      username: receivedData.username,
      password: await bcrypt.hash(receivedData.password, 10),
      role: "user",
    });
    return data ? data : null;
  }

  return null;
}

async function validateUsername(data: any) {
  const isTaken : any = await userDao.getEmployeeByUsername(data);
  if (isTaken.length > 0) {
    return false;
  } else {
    return true;
  }
}

export { postEmployee, login };
