const bcrypt = require("bcrypt");
const User = require("../models/user.model"); // Asegúrate de tener un modelo de User

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.send("registrando");
  } catch (err) {
    console.log(err);
  }
};

const createLogin = async (req, res) => {
  try {
    const { email_user, password_user } = req.body;
    console.log(email_user, password_user);

    // Busca el usuario en la base de datos por el email
    const user = await User.findOne({ email_user });
    console.log(user);

    if (user) {
      // Compara la contraseña hasheada
      const isPasswordValid = await bcrypt.compare(
        password_user,
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

        // Cargar permisos y almacenarlos en la sesión (si es necesario)
        const permissions = await loadPermissionsForUser(user._id); // Esto depende de tu lógica de permisos
        req.session.permissions = permissions;

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

module.exports = {
  register,
  createLogin,
};
