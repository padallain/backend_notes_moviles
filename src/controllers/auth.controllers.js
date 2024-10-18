const User = require("../models/user.model");
const jwt = require('jsonwebtoken'); 
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { time } = require("console");



const register = async (req, res) => {
  try {
    const { email_user, password, username } = req.body;

    // Verificar que los campos requeridos estén presentes
    if (!email_user || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validación del formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_user)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validación de la contraseña (mínimo 8 caracteres, mayúsculas, minúsculas y caracteres especiales)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one special character' });
    }

    // Verificar si el usuario o el correo ya existen en la base de datos
    const existingEmail = await User.findOne({ email_user });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email_user,
      password_user: password,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log("Error en el registro:", err);
    res.status(500).json({ message: 'Error registering user' });
  }
};


const createLogin = async (req, res) => {
  try {
      const { username, password } = req.body;
      console.log(username, password);
      
      // Busca el usuario en la base de datos por el email
      const user = await User.findOne({ username });
      console.log(user);
      
      if (user) {
          // Compara la contraseña de forma simple (sin hashear)
          if (password === user.password_user) {
              // Iniciar sesión y almacenar información en la sesión
              req.session.isLoggedIn = true;
              req.session.username = user.email_user;
              
              const sessionId = req.session.id;
              const personId = user._id;
              console.log(`All good and your sessionId is ${sessionId}`);
              
              res.status(200).json({
                  success: true,
                  message: "Login successful",
                  personId,
              });
              return;
          }
      }
      res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
      console.error('Error creating login:', err);
      res.status(500).json({ success: false, message: "Server error" });
  }}



console.log("mi rey")

userGmail = "padallain2000@gmail.com"
passwordGmail = "ywun mzua oxyw swlo"

const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses
  auth: {
    user: userGmail, // Tu correo
    pass: passwordGmail    // Contraseña o App Password
  },
  logger: true,  // Habilitar el registro de errores
  debug: true    // Habilitar modo de depuración
});

const resetPassword = async (req, res) => {
  const { email_user } = req.body;

  // Verificar si el correo fue proporcionado
  if (!email_user) {
    return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
  }

  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email_user });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Generar un código aleatorio de 6 dígitos
    const resetCode = crypto.randomInt(100000, 999999).toString();

    // Establecer el tiempo de expiración a 10 minutos desde ahora
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 10);

    // Guardar el código de restablecimiento en el campo "token" y la expiración en "resetTokenExpires"
    user.token = resetCode;
    user.resetTokenExpires = expiresIn;

    // Guardar el usuario con el nuevo token y la fecha de expiración
    await user.save();

    // Configurar las opciones para el correo electrónico
    const mailOptions = {
      from: 'tuemail@gmail.com', // Tu correo
      to: email_user,            // Correo del destinatario
      subject: 'Restablecimiento de contraseña',
      text: `Tu código de restablecimiento de contraseña es: ${resetCode}. Este código es válido por 10 minutos.`
    };

    // Enviar el correo con el token
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo.' });
      } else {
        console.log('Correo enviado: ' + info.response);
        return res.status(200).json({ message: 'Correo de restablecimiento enviado exitosamente.', resetCode });
      }
    });

  } catch (err) {
    console.error('Error en la solicitud de restablecimiento de contraseña:', err);
    return res.status(500).json({ message: 'Error en la solicitud de restablecimiento de contraseña.' });
  }
};


const checkResetToken = async (req, res) => {
  const { email_user, resetCode } = req.body;
  console.log(req.body)
  console.log(email_user, resetCode)

  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email_user });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el código es correcto y si no ha expirado
    if (user.token !== resetCode || new Date() > user.resetTokenExpires) {
      return res.status(400).json({ message: 'Código inválido o ha expirado.' });
    }

    // Si todo es correcto, enviar un mensaje de éxito
    return res.status(200).json({ message: 'El código es válido. Puedes restablecer la contraseña.' });

  } catch (err) {
    console.error('Error verificando el código:', err);
    return res.status(500).json({ message: 'Error verificando el código.' });
  }
};



const savePassword = async (req, res) => {
  const { email_user, newPassword, confirmPassword } = req.body;

  console.log(req.body)

  // Verificar si las contraseñas coinciden
  if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
  }

  // Validación de la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character' });
  }

  try {
     
      // Actualizar la contraseña del usuario en la base de datos
      const user = await User.findOneAndUpdate(
          { email_user },
          { password_user:newPassword },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
      console.error('Error updating password:', err);
      res.status(500).json({ message: 'Server error' });
  }
};


const eraseAccount = async (req, res) => {
  const { username } = req.body;

  try {
      const result = await User.findOneAndDelete({username});
      if (result) {
          res.status(200).json({ message: `User with email ${username} deleted successfully.` });
      } else {
          res.status(404).json({ message: `User with email ${username} not found.` });
      }
  } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};


module.exports = {
  register,
  createLogin,
  resetPassword,
  checkResetToken,
  savePassword, 
  eraseAccount

}
