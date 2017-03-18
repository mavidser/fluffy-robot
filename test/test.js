import test from 'ava';
import es from '../';

let sendPassingEmail = (t, emailService, providers) => {
  return emailService.sendEmail({
    from: ['frost.akemi@gmail.com'],
    to: ['frost.akemi0@yopmail.com', 'frost.akemi1@yopmail.com'],
    cc: ['frost.akemi2@yopmail.com', 'frost.akemi3@yopmail.com'],
    bcc: ['frost.akemi4@yopmail.com', 'frost.akemi5@yopmail.com'],
    subject: 'Hi',
    body: '<b>Hi there!</b>',
    isBodyHtml: true
  }, providers)
}

test('SendGrid', async t => {
  const sendgrid = new es.SendGrid();
  const emailService = new es.EmailService();
  const result = await sendPassingEmail(t, emailService, [sendgrid]);
});

test('Mailgun', async t => {
  const mailgun = new es.Mailgun();
  const emailService = new es.EmailService();
  const result = await sendPassingEmail(t, emailService, [mailgun]);
});

test('Mandrill', async t => {
  const mandrill = new es.Mandrill();
  const emailService = new es.EmailService();
  const result = await sendPassingEmail(t, emailService, [mandrill]);
});

test('SES', async t => {
  const ses = new es.SES();
  const emailService = new es.EmailService();
  const result = await sendPassingEmail(t, emailService, [ses]);
});

test('All Providers', async t => {
  const emailServiceConfig = new es.EmailServiceConfig()
                                   .addSendGrid()
                                   .addMailgun()
                                   .addMandrill()
                                   .addSES();
  const emailService = new es.EmailService(emailServiceConfig);
  const result = await sendPassingEmail(t, emailService);
});
