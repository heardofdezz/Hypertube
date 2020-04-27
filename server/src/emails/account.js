const sgMail = require('@sendgrid/mail');
const sendGridAPIkey = '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';

sgMail.setApiKey(sendGridAPIkey);

const sendConfirmation = async (id, email, code) => {
    await sgMail.send({
        to: email,
        from: 'contact@hypertube.com',
        subject: 'Confirmez votre adresse email',
        html: `<p>Confirmez votre adresse email en <a href="http://localhost/confirmEmail/${id}/${code}">cliquant ici</a></p>`
    });
};

const ResetPassword = async(id, email, code) => {
    await sgMail.send({
        to: email,
        from: 'alexandre.pinhas@deepmemory.io',
        subject: 'Mot de passe oublié',
        html: `<p>Réinitialisez votre mot de passe en <a href="http://localhost/resetPassword/${id}/${code}">cliquant ici</a></p>`
    });
};

module.exports=({
    sendConfirmation,
    ResetPassword
});
