import test from 'ava';
import config from 'config';
import es from '../';

test('EmailServiceProvider - No username', async t => {
  const err = t.throws(() => new es.SendGrid());
  t.is(err.message, 'Username is required for authentication.');
});

test('EmailServiceProvider - No password', async t => {
  const err = t.throws(() => new es.SendGrid(config.SendGrid.username));
  t.is(err.message, 'Password is required for authentication.');
});

test('EmailServiceProvider - No argument while sending', async t => {
  const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
  const err = await t.throws(() => sendgrid.sendEmail());
  t.is(err.message, 'No argument found in the sendEmail function.');
});

test('EmailServiceProvider - No from', async t => {
  const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
  const err = await t.throws(() => sendgrid.sendEmail({
    to: config.SendGrid.to,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text
  }));
  t.is(err.message, '\'from\' string is required in the details argument.');
});

test('EmailServiceProvider - No to', async t => {
  const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
  const err = await t.throws(() => sendgrid.sendEmail({
    from: config.SendGrid.from,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text
  }));
  t.is(err.message, '\'to\' array/string is required in the details argument.');
});

test('SendGrid', async t => {
  const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
  await sendgrid.sendEmail({
    to: config.SendGrid.to,
    from: config.SendGrid.from,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text,
    html: config.SendGrid.html
  });
  t.pass();
});

test('Mailgun', async t => {
  const mailgun = new es.Mailgun(config.Mailgun.username, config.Mailgun.password);
  await mailgun.sendEmail({
    to: config.Mailgun.to,
    from: config.Mailgun.from,
    subject: config.Mailgun.subject,
    text: config.Mailgun.text,
    html: config.Mailgun.html
  });
  t.pass();
});

test('Mandrill', async t => {
  const mandrill = new es.Mandrill(config.Mandrill.username, config.Mandrill.password);
  await mandrill.sendEmail({
    to: config.Mandrill.to,
    from: config.Mandrill.from,
    subject: config.Mandrill.subject,
    text: config.Mandrill.text,
    html: config.Mandrill.html
  });
  t.pass();
});

test('SES - No region', async t => {
  const err = t.throws(() => new es.SES(config.SES.username, config.SES.password));
  t.is(err.message, 'A supported region is needed to connect with AWS.');
});

test('SES', async t => {
  const ses = new es.SES(config.SES.username, config.SES.password, config.SES.region);
  await ses.sendEmail({
    to: config.SES.to,
    from: config.SES.from,
    subject: config.SES.subject,
    text: config.SES.text,
    html: config.SES.html
  });
  t.pass();
});

test('All Providers', async t => {
  const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
  const mailgun = new es.Mailgun(config.Mailgun.username, config.Mailgun.password);
  const mandrill = new es.Mandrill(config.Mandrill.username, config.Mandrill.password);
  const ses = new es.SES(config.SES.username, config.SES.password, config.SES.region);
  const emailService = new es.EmailService([
    sendgrid,
    mailgun,
    mandrill,
    ses
  ]);
  await emailService.sendEmail({
    to: config.SendGrid.to,
    from: config.SendGrid.from,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text,
    html: config.SendGrid.html
  });
  t.pass();
});

test('All Providers - All failures', async t => {
  const sendgrid = new es.SendGrid('username', 'password');
  const mailgun = new es.Mailgun('username', 'password');
  const mandrill = new es.Mandrill('username', 'password');
  const ses = new es.SES('username', 'password', 'region');
  const emailService = new es.EmailService([
    sendgrid,
    mailgun,
    mandrill,
    ses
  ]);
  await emailService.sendEmail({
    to: config.SendGrid.to,
    from: config.SendGrid.from,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text,
    html: config.SendGrid.html
  });
  t.pass();
});

test('All Providers - First one is a failure', async t => {
  const sendgrid = new es.SendGrid('username', 'password');
  const mailgun = new es.Mailgun(config.Mailgun.username, config.Mailgun.password);
  const mandrill = new es.Mandrill(config.Mandrill.username, config.Mandrill.password);
  const ses = new es.SES(config.SES.username, config.SES.password, config.SES.region);
  const emailService = new es.EmailService([
    sendgrid,
    mailgun,
    mandrill,
    ses
  ], {logging: true});
  await emailService.sendEmail({
    to: config.SendGrid.to,
    from: config.SendGrid.from,
    subject: config.SendGrid.subject,
    text: config.SendGrid.text,
    html: config.SendGrid.html
  });
  t.pass();
});

test('No providers', async t => {
  const err = t.throws(() => new es.EmailService());
  t.is(err.message, 'Argument must be an array of EmailServiceProvider instances');
});
