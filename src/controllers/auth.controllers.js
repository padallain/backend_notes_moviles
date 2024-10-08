const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken'); 
const nodemailer = require("nodemailer");
const crypto = require('crypto');



const register = async (req, res) => {
  const { email_user, password, username } = req.body;
  console.log(email_user, password, username);
  console.log(req.body);

  try {
    // Verificar que los campos requeridos estén presentes
    if (!email_user || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verificar si el usuario o el correo ya existen en la base de datos
    const existingEmail = await User.findOne({
      $or: [{ email_user }]
    });

    if (existingEmail) {
      // Si el usuario o el correo ya existen, no permitir el registro
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const existingUser = await User.findOne({
      $or: [{ username }]
    });

    if (existingUser) {
      // Si el usuario o el correo ya existen, no permitir el registro
      return res.status(400).json({ message: ' Username already exists' });
    }

    // Generar un "salt" para la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Encriptar la contraseña

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email_user,
      password_user: hashedPassword, // Guardar la contraseña encriptada
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
    const { email_user, password } = req.body;
    console.log(email_user, password);

    // Busca el usuario en la base de datos por el email
    const user = await User.findOne({ email_user });
    console.log(user);

    if (user) {
      // Compara la contraseña hasheada
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_user
      );

      if (isPasswordValid) {
        // Iniciar sesión y almacenar información en la sesión
        req.session.isLoggedIn = true;
        req.session.username = user.email_user;

        // Nota: No es seguro almacenar la contraseña en la sesión.
        const sessionId = req.session.id;
        const personId = user._id;

        console.log(`All good and your sessionId is ${sessionId}`);


        res
          .status(200)
          .json({
            success: true,
            message: "Login successful",
            permissions,
            personId,
          });
        return;
      }
    }

    // Si no hay coincidencias o la contraseña es incorrecta
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res
        .status(401)
        .json({ success: false, message: "User or password are incorrect" });
    });
  } catch (err) {
    console.error("Error querying user data:", err);
    res
      .status(500)
      .json({ success: false, message: "Error querying user data" });
  }
};

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
    console.log(email_user)

    if (!email_user) {
      return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
    }

    try {
      const user = await User.findOne({ email_user });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const resetCode = crypto.randomInt(100000, 999999).toString();
      user.resetCode = resetCode;
      await user.save();

      const mailOptions = {
        from: 'tuemail@gmail.com',          // Tu correo
        to: email_user,                          // Correo del destinatario
        subject: 'Restablecimiento de contraseña',
        text: `Tu código de restablecimiento de contraseña es: ${resetCode}. Este código es válido por un tiempo limitado.`
      };

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


module.exports = {
  register,
  createLogin,
  resetPassword

};
