import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export default function (database: any) {
  async function login(recievedData: any) {
    const data: any = await database.getUserByUsername(recievedData.username);
    if (
      data &&
      recievedData.username === data.username &&
      (await bcrypt.compare(recievedData.password, data.password))
    ) {
      return data ? data : null;
    }

    return null;
  }

  async function postUser(receivedData: any) {
    const isValid = await validateUsername(receivedData.username);
    console.log(isValid)
    if (isValid) {
      let data = await database.postUser({
        user_id: uuid(),
        username: receivedData.username,
        password: await bcrypt.hash(receivedData.password, 10),
        role: "user",
      });
      return data ? data : null;
    }

    return null;
  }

  async function validateUsername(data: any) {
    console.log(data)
    const isTaken: any = await database.getUserByUsername(data);
    console.log(isTaken);
    if (isTaken) {
      return false;
    } else {
      return true;
    }
  }

  return { login, postUser };
}
