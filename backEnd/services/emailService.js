import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: '"Admin Flotte" <admin@flotte.com>',
            to,
            subject,
            text
        });
    } catch (error) {
        console.log('Erreur en envoyant l\'email :', error);
        throw error;
    }
};
export default { sendMail };
