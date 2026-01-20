import { Resend } from "resend";
import serverConfig from "../config";

export class EmailService {
  private resend = new Resend(serverConfig.RESEND_API_KEY!);

  async sendResetPasswordEmail(toEmail: string, link: string) {
    try {
      const result = await this.resend.emails.send({
        from: "onboarding@resend.dev", 
        to: toEmail,
        subject: "Reset your password",
        html: `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${link}">${link}</a>
          <p>This link is valid for 15 minutes.</p>
        `,
      });

      console.log("Email sent:", result);
    } catch (err) {
      console.error("Failed to send email:", err);
    }
  }
}
