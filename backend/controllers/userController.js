import { Contact, Session, User } from '../models/userModels.js';


/********/
//Contact
/********/
export const createUserControllers = (app) => {  
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.post('/contact', async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.json(contact);
    } catch (error) {
      res.status(402).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.put('/contact/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.delete('/contact/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.json({ message: 'Contact deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });


  /********/
  //Session
  /********/

  app.get('/sessions', async (req, res) => {
    try {
      const sessions = await Session.find();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.post('/session', async (req, res) => {
    try {
      const session = new Session(req.body);
      await session.save();
      res.json(session);
    } catch (error) {
      res.status(403).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.put('/session/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const session = await Session.findByIdAndUpdate(id, req.body, { new: true });
      res.json(session);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.delete('/session/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Session.findByIdAndDelete(id);
      res.json({ message: 'Session deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });


  /*****/
  //User
  /*****/

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.post('/user', async (req, res) => {
    try {
      const user = new User(req.body);
      console.log(JSON.stringify(req.body, null, 2));
      console.log(JSON.stringify(user, null, 2));
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(403).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.put('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.delete('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

   //Parte MASS

 // Ruta para "olvidé contraseña"  
app.post('/forgot-password', async (req, res) => {  
  const { username } = req.body;  

  // Validar si el usuario existe  
  const usuario = await User.findOne({ username });  
  if (!usuario) {  
      return res.status(400).json({ error: 'User not found' });  
  }  

  // Generar un código aleatorio de 5 dígitos  
  const codigo = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');  

  // Enviar el código al correo del usuario  
  const mailOptions = {  
      from: process.env.EMAIL_USER,  
      to: usuario.email, // Suponiendo que tienes el correo del usuario en la base de datos  
      subject: 'Password reset code',  
      text: `Your password reset code is: ${codigo}`,  
  };  

  try {  
      await transporter.sendMail(mailOptions);  
      // Aquí podrías guardar el código en la base de datos para su posterior validación o simplemente  
      // informar que se ha enviado el código al correo  
      res.json({ message: 'Code sent to email' });  
  } catch (error) {  
      return res.status(500).json({ error: 'Error sending email' });  
  }  
});
}