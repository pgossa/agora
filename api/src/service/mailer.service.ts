import * as nodemailer from 'nodemailer'; 
import { Logger } from "../service/logger.service";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(
    private readonly logger: Logger,
    ) {}

  public async sendEmailAndLog(to: string, surveyCode: string) {
    let transporter = await this.buildTransporter();

    let infos = await this.sendEmail(transporter, to, surveyCode);

    this.logInfosMailer(infos, surveyCode);
  }

  private async buildTransporter() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'agora.survey@gmail.com',
        pass: 'hkf8JiS9g3Th'
      }
    })
  }

  private async sendEmail(transporter, to: string, surveyCode: string) {
    return await transporter.sendMail({
      from: '"Agora Foo" <foo@example.com>', // sender address
      to: to, // list of receivers separated with a comma
      subject: "You created a new survey !", // Subject line
      text: `${surveyCode}?`, // plain text body
      html: `<b>${surveyCode}?</b>` // html body
    });
  }

  private logInfosMailer(infos: any, surveyCode: string) {
    let destination = infos.envelope.to;
    if(infos.rejected.length > 0) {
      this.logger.error([
        `Attempt to send the survey ${surveyCode} to ${destination}`,
        `Failed: ${infos.rejected}`
      ]);
    } else {
      this.logger.log([
        `Mail was sent for survey ${surveyCode} to ${destination}`
      ]);
    }
  }
}