import test from 'ava';
import es from '../';

const passingEmail = {
  from: 'frost.akemi@gmail.com',
  to: ['frost.akemi0@yopmail.com', 'frost.akemi1@yopmail.com'],
  cc: ['frost.akemi2@yopmail.com', 'frost.akemi3@yopmail.com'],
  bcc: ['frost.akemi4@yopmail.com', 'frost.akemi5@yopmail.com'],
  subject: 'Hi',
  html: '<b>Hi there!</b>'
};

test('EmailServiceProvider - No username', async t => {
  const err = t.throws(() => new es.SendGrid());
  t.is(err.message, 'Username is required for authentication.');
});

test('EmailServiceProvider - No password', async t => {
  const err = t.throws(() => new es.SendGrid('username'));
  t.is(err.message, 'Password is required for authentication.');
});

test('EmailServiceProvider - No argument while sending', async t => {
  const sendgrid = new es.SendGrid('username', 'password');
  const err = await t.throws(() => sendgrid.sendEmail());
  t.is(err.message, 'No argument found in the sendEmail function.');
});

test('EmailServiceProvider - No from', async t => {
  const sendgrid = new es.SendGrid('username', 'password');
  const err = await t.throws(() => sendgrid.sendEmail({
    to: 'frost.akemi@gmail.com',
    subject: 'Hi',
    text: 'Hi there!'
  }));
  t.is(err.message, '\'from\' string is required in the details argument.');
});

test('EmailServiceProvider - No to', async t => {
  const sendgrid = new es.SendGrid('username', 'password');
  const err = await t.throws(() => sendgrid.sendEmail({
    from: 'frost.akemi@gmail.com',
    subject: 'Hi',
    text: 'Hi there!'
  }));
  t.is(err.message, '\'to\' array/string is required in the details argument.');
});

test('SendGrid', async t => {
  const sendgrid = new es.SendGrid('user','pass');
  await sendgrid.sendEmail(passingEmail);
  t.pass();
});

test('Mailgun', async t => {
  const mailgun = new es.Mailgun('user', 'pass');
  await mailgun.sendEmail(passingEmail);
  t.pass();
});

test('Mandrill', async t => {
  const mandrill = new es.Mandrill('user','pass');
  await mandrill.sendEmail(passingEmail);
  t.pass();
});

test('SES', async t => {
  const ses = new es.SES('user','pass');
  await ses.sendEmail(passingEmail);
  t.pass();
});

test('All Providers', async t => {
  const sendgrid = new es.SendGrid('user','pass');
  const mailgun = new es.Mailgun('user','pass');
  const mandrill = new es.Mandrill('user','pass');
  const ses = new es.SES('user','pass');
  const emailService = new es.EmailService([
    sendgrid,
    mailgun,
    mandrill,
    ses
  ]);
  await emailService.sendEmail(passingEmail);
  t.pass();
});

test('No providers', async t => {
  const err = t.throws(() => new es.EmailService());
  t.is(err.message, 'Argument must be an array of EmailServiceProvider instances');
});
