import UserEmail from '@/components/users/user.mail';

describe('send email', () => {
  test('Should return true', () => {
    let userMail = new UserEmail();
    let isSent = userMail.inviteEmail(
      'lan.nguyen@codeenginestudio.com',
      'token',
    );
    expect(isSent).toBe(true);
  });
});
