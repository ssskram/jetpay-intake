import "./stringFormat";
import sendgridPost from "./sendgridEndpoint";

export default async function post(request, user) {
  let emailBody;
  // prepare email
  await fetch("files/emailTemplate.html")
    .then(response => response.text())
    .then(
      text =>
        (emailBody = String.format(
          text,
          user.name, // 0
          request.department.value, // 1
          request.cashClosings, // 2
          request.paymentTypes, // 3
          request.customerFacing.value, // 4
          request.onlineOrCounter, // 5
          request.listComputers
        ))
    ); // 6

  const args = {
    to: "jetpayhelp@pittsburghpa.gov",
    user: user,
    subject: "JetPay: New Reader Request",
    email: emailBody,
    attachment: undefined
  };

  const success = await sendgridPost(args);
  return success;
}
