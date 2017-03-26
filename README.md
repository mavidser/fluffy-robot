Email Services library
======================
An npm package whichprovides an abstraction between multiple email service providers.

If one of the services goes down, it failovers to another provider.

## Install
```
npm install mavidser/fluffy-robot
```

## Quick Start

```javascript
const es = require('email-services');

// initialize providers with your credentials
const sendgrid = new es.SendGrid('username', 'password');
const mailgun = new es.Mailgun('username', 'password');

// create the email-service object using the providers you need
const emailService = new es.EmailService([
  sendgrid,
  mailgun
]);

// send the email
emailService.sendEmail({
  to: 'user1@example.com',
  from: 'user@example.com',
  cc: 'user2@example.com',
  subject: 'Hi!',
  text: 'How you doin?',
  html: '<h1>How you doin?</h1>'
})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err.message);
});

```

## Usage

### Importing

```javascript
const es = require('email-services');
```

### Email Service Providers

Initialize a provider by suppying it the required credentials.

The supported providers are -

- Sendgrid
- Mailgun
- Mandrill
- Amazon SES

```javascript
const ses = new es.SES('username', 'password', 'aws-region');
```

### Combining the services

Create a new EmailService object by initializing it with an array of provider objects. More than one accounts for the same provider can be used too.

The failover is executed in the sequence defined by the array.

```javascript
const emailService = new es.EmailService([
  sendgrid1,
  sendgrid2,
  ses,
  mailgun,
  mandrill1,
  mandrill2
]);
```

### Sending the email

Use the sendEmail function of EmailService object to send the email.

```javascript
emailService.sendEmail({
  to: 'user1@example.com',
  from: 'user@example.com',
  subject: 'Hi!',
  text: 'How you doin?',
  html: '<h1>How you doin?</h1>'
})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err.message);
});
```

The providers can also directly be used for sending emails.

```javascript
sendGrid.sendEmail({
  to: 'user1@example.com',
  from: 'user@example.com',
  subject: 'Hi!',
  text: 'How you doin?',
})
```

## Documentation

The module documentation can be found [here](http://mavidser.github.io/fluffy-robot).

## License

MIT
