import { Resend } from "resend";
import  serverConfig  from "../config";
export class EmailService {
  private resend = new Resend(serverConfig.RESEND_API_KEY!);
  private project: any;

  constructor(project: any) {
    this.project = project;
  }

  async sendResetPasswordEmail(email: string, link: string) {
    await this.resend.emails.send({
      from: `${this.project.appName} <${this.project.appEmail}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${link}">${link}</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    });
  }
}
