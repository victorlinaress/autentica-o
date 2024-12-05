import { MailtrapClient } from "mailtrap";

export const sendEmail = async (to: string, subject: string, body: string) => {
  const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN as string,
    testInboxId: 3313774,
  });

  try {
    await mailtrap.testing.send({
      from: { name: "sistema", email: "sistema@gmail.com" },
      to: [{ email: to }],
      subject,
      text: body,
    });

    return true;
  } catch (err) {
    return false;
  }
};
