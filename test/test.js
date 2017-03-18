import test from 'ava';
import es from '../';

const passingEmail = {
  from: ['frost.akemi@gmail.com'],
  to: ['frost.akemi0@yopmail.com', 'frost.akemi1@yopmail.com'],
  cc: ['frost.akemi2@yopmail.com', 'frost.akemi3@yopmail.com'],
  bcc: ['frost.akemi4@yopmail.com', 'frost.akemi5@yopmail.com'],
  subject: 'Hi',
  body: '<b>Hi there!</b>',
  isBodyHtml: true
};

test('SendGrid', async t => {
  const sendgrid = new es.SendGrid();
  await sendgrid.sendEmail(passingEmail);
  t.pass();
});

test('Mailgun', async t => {
  const mailgun = new es.Mailgun();
  await mailgun.sendEmail(passingEmail);
  t.pass();
});

test('Mandrill', async t => {
  const mandrill = new es.Mandrill();
  await mandrill.sendEmail(passingEmail);
  t.pass();
});

test('SES', async t => {
  const ses = new es.SES();
  await ses.sendEmail(passingEmail);
  t.pass();
});

test('All Providers', async t => {
  const sendgrid = new es.SendGrid();
  const mailgun = new es.Mailgun();
  const mandrill = new es.Mandrill();
  const ses = new es.SES();
  const emailService = new es.EmailService([
    sendgrid,
    mailgun,
    mandrill,
    ses
  ]);
  await emailService.sendEmail(passingEmail);
  t.pass();
});
