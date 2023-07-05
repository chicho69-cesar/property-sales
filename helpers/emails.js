import nodemailer from 'nodemailer'

const emailRegister = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const { name, email, token } = data

  // Send the email
  await transport.sendMail({
    from: 'BienesRaíces.com',
    to: email,
    subject: 'Confirma tu cuenta en BienesRaíces.com',
    text: 'Por favor, confirma tu cuenta',
    html: `
      <p>Hola ${name}, por favor confirma tu cuenta en BienesRaíces.com</p>
      
      <p>
        Tu cuenta ya está casi lista, solo debes confirmarla haciendo click en el siguiente enlace:
        <a href="${process.env.WEB_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}">
          Confirmar cuenta
        </a>
      </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  })
}

export default emailRegister
