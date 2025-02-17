const nodemailer = require('nodemailer');  

const transporter = nodemailer.createTransport({  
  service: 'gmail', // O el servicio que prefieras  
  auth: {  
    user: 'tu_email@gmail.com',  
    pass: 'tu_contraseña', // Considera usar variables de entorno para mayor seguridad  
  },  
});  

const sendPasswordResetEmail = (email, token) => {  
  const url = `http://localhost:3000/reset-password/${token}`;  
  transporter.sendMail({  
    to: email,  
    subject: 'Restablecer contraseña',  
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${url}`,  
  });  
};  

module.exports = { sendPasswordResetEmail };

const userSchema = new mongoose.Schema({  
    username: { type: String, required: true, unique: true },  
    password: { type: String, required: true },  
    resetPasswordToken: { type: String },  
    resetPasswordExpires: { type: Date },  
  });

  