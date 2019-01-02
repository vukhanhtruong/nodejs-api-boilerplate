import mailTransporter from '@/services/mail';
import EmailTemplate from 'email-templates';
import constants from '@/config/constants';
import path from 'path';
import pathRoot from 'app-root-path';

class UserEmail {
  inviteEmail = (email, tokenUrl) => {
    try {
      let inviteEmailTemplate = path.join(
        pathRoot.path,
        'src',
        'templates',
        'inviteemail',
      );
      let inviteEmail = new EmailTemplate.EmailTemplate(inviteEmailTemplate);
      let userInfo = { tokenUrl: tokenUrl };
      inviteEmail.render(userInfo, function(error, result) {
        if (error) throw Error(error);
        let message = {
          from: constants.FROM_EMAIL,
          to: email,
          subject: 'Invite Email',
          html: result.html,
        };
        mailTransporter.sendMail(message, function(error) {
          if (error) throw Error(error);
        });
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };
}

export default UserEmail;
