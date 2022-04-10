import { ContactModel } from "./src/contacts/model";
import { connect } from "./src/configs/mongoConn"
(async () => {
  connect();
  const users = [
    { name: "TestCard", contactType: 'personnel' },
  ];
  try {
    for (const user of users) {
      const storedUser = await ContactModel.create(user);
      console.log('storedUser is ', storedUser)
    }
  } catch (e) {
    console.error('error in the createDummy is ', e);
  }
})();
