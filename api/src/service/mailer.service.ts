import * as nodemailer from 'nodemailer';
import { Logger } from '../service/logger.service';
import { Injectable } from '@nestjs/common';
import { base64Agora } from '../assets/base64_logo_agora';
import { base64Isen } from '../assets/base64_logo_isen';

@Injectable()
export class MailerService {
  constructor(
    private readonly logger: Logger,
    ) {}

  public async sendEmailAndLog(to: string, surveyCode: string) {
    const transporter = await this.buildTransporter();

    const infos = await this.sendEmail(transporter, to, surveyCode);

    this.logInfosMailer(infos, surveyCode);
  }

  private async buildTransporter() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'agora.survey@gmail.com',
        pass: 'passwd',
      },
    });
  }

  private async sendEmail(transporter, to: string, surveyUuid: string) {
    let htmlContent = this.generateHtmlBody(surveyUuid);

    return await transporter.sendMail({
      from: '"Agora" <agora.survey@gmail.com>', // sender address
      to, // list of receivers separated with a comma
      subject: 'You created a new survey !', // Subject line
      html: htmlContent, // html body
      attachments: [
        {
          filename: 'Agora.png',
          path: 'src/assets/logo_isen.png',
          cid: 'logoisencid'
        },
        {
          filename: 'ISENToulon.png',
          path: 'src/assets/logo_agora.png',
          cid: 'logoagoracid'
        }
      ]
    });
  }

  private logInfosMailer(infos: any, surveyCode: string) {
    const destination = infos.envelope.to;
    if (infos.rejected.length > 0) {
      this.logger.error([
        `Attempt to send the survey ${surveyCode} to ${destination}`,
        `Failed: ${infos.rejected}`,
      ]);
    } else {
      this.logger.log([
        `Mail was sent for survey ${surveyCode} to ${destination}`,
      ]);
    }
  }

  private generateHtmlBody(surveyUuid: string){
    return `<html>
    <div style="background-color:#666666">
    <img style="display:block;margin:auto;width:30%;padding-top:2em" src="cid:logoagoracid">
    <h1 style="margin:1em 0 1em 1em;color:white;font-family:sans-serif">You created a new survey !</h1>
    <div style="height:10px;background-color:#2A7032"></div>
    </div>
    <div style="background-color:#363F5A;color:white;font-size:20px;font-family:sans-serif;padding:1em">
    <p>The next step is to share it with your audience and check the results in real time.</p>
    <p>Thanks to the power of Agora, you can visualize the results on any device.</p>
    <div style="padding:1em;margin:1em 0 1em 0">
    <a style="color:white;text-decoration:none;text-transform:uppercase;background-color:#2A7032;font-weight:bold;padding:1em;border-radius:5px;" href="http://89.83.80.125/result/${surveyUuid}">Go to your survey</a>
    </div>
    </div>
    <div style="display:flex;background-color:black;padding:1em">
    <p style="color:white;width:30%"><span style="font-weigth:bold">Agora </span><span style="font-style: italic">Crowd booster </span>is a cross platform survey application developed as part of studies at ISEN Toulon. The team: Gulliem CHAMAYOU, Romain JACQUIEZ, Pierre GOSSA & Julien LUNA. If you have any questions please contact us at <span style="font-weight:bold;font-style:italic">agora.survey@gmail.com</span></p>
    <img style="width:20%;margin: 0 0 0 2em" src="cid:logoisencid">
    </div>
    </html>`;
  }
}
