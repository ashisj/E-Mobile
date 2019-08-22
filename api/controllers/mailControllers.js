const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD
    }
});

const setMailOption = (email,message) => { 
    return {
        from: '"E-Mobile" ashisjenamfs@gmail.com', 
        to: email, 
        subject: 'Order Details',
        text: message,
        html: `<b>${message}</b>`
    }
};

exports.sendMail = (userEmail,message) => {
    mailOptions = setMailOption(userEmail,message);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
