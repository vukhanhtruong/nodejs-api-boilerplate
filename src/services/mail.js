import nodeMailer from 'nodemailer';
import sendGridConfig from '@/config/sendgrid';
import sendGridTransport from 'nodemailer-sendgrid-transport';

const mailTransporter = nodeMailer.createTransport(
  sendGridTransport(sendGridConfig),
);
mailTransporter.verify(function(error, success) {
  if (error) {
    throw Error(error);
  }
});

export default mailTransporter;
