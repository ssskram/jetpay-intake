import * as types from "../../store/types";

// handles sendgrid POSTs

interface args {
  to: string;
  user: types.user;
  subject: string;
  email: string;
  attachment: any;
}

interface sgLoad {
  to: string;
  from: {
    email: string;
    name: string;
  };
  subject: string;
  html: string;
  attachments?: any;
}

export default async function sendgridEndpoint(args: args) {
  let postSuccess = true;
  const to = args.to;
  let sendgridLoad: sgLoad = {
    to: to,
    from: {
      email: args.user.email,
      name: "JetPay Intake"
    },
    subject: args.subject,
    html: args.email
    // attachment comes later, if existent
  };

  // endpoint
  const post = async load =>
    fetch("https://sendgridproxy.azurewebsites.us/sendMail/single", {
      method: "POST",
      body: load,
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_SENDGRID_API,
        "Content-type": "application/json"
      })
    }).catch(err => (postSuccess = false));

  // attachment transform
  const handleAttachment = async attachment => {
    // transform file, base64
    let reader = new FileReader();
    reader.readAsDataURL(attachment);
    reader.onload = async () => {
      // once complete, build sendgrid load with attachment
      const fullString: any = reader.result;
      // add attachment to load
      sendgridLoad.attachments = [
        {
          content: fullString.split(",")[1],
          filename: attachment.name,
          disposition: "attachment"
        }
      ];
      // post load
      await post(JSON.stringify(sendgridLoad));
    };
  };

  if (args.attachment) {
    await handleAttachment(args.attachment);
  } else await post(JSON.stringify(sendgridLoad));

  return postSuccess;
}
