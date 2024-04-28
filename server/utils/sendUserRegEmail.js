//Utils
const sendEmailHTML = require("./sendEmailHTML");
const toCapitalize = require("./toCapitalize");

const sendUserRegEmail = async (user, userType) => {
  const { name, dob, email, registrationNumber, department, joiningYear } =
    user;

  const avatar = user.avatar;
  const avatarSize = `100px`;

  const role = userType.toString().toCapitalize();
  const dateOfBirth = new Date(dob).toLocaleDateString("en-GB");

  const message = `<div>
        <h1>College ERP - ${role} Registration</h1>
        <img src=${avatar} alt="Avatar" style="display:flex;object-fit:cover;width:${avatarSize};aspect-ratio:1/1" />
        <br>
        <pre>Registration Number: ${registrationNumber}</pre>
        <pre>Role: ${role}</pre>
        <pre>Department: ${department}</pre>
        <pre>Joining Year: ${joiningYear}</pre>
        <br>
        <pre>Password: Your default password is DDMMYYYY of your date of birth (DD/MM/YYYY).</pre>
        <br>
        <pre>Name: ${name}</pre>
        <pre>D.O.B.: ${dateOfBirth}</pre>
        <pre>Email: ${email}</pre>
        <br>
        <p>Thanks for Register!</p>
      </div>`;

  try {
    await sendEmailHTML({
      email,
      subject: `${role} Registration`,
      message,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendUserRegEmail;
