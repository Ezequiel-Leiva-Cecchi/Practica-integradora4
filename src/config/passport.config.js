import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersDAO } from "../dao/users/indexUsers.js";
import { cartDAO } from "../dao/cart/indexCart.js";
import { isValidPassword , createHash } from "../utils/bcrypt.js";

const localStrategy = LocalStrategy;

const initializePassport = () => {
    // Estrategia para el registro de usuarios
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email } = req.body;
            try {
                console.log("Attempting registration for email:", email);
                const user = await usersDAO.getUserByEmail({ email: username });
                if (user) {
                    console.log('User already exists');
                    return done(null, false);
                }
                console.log('Creating new user:', email);

                // Obtener el hash de la contraseña
                const hashedPassword = createHash(password);
                
                const newUser = await usersDAO.addUsers({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                });

                // Crear un carrito para el nuevo usuario registrado
                const newCart = await cartDAO.createCart();
                await usersDAO.updateUserCart(newUser._id, newCart._id);

                return done(null, newUser);
            } catch (error) {
                console.error("Error registering user:", error);
                return done(error);
            }
        }
    ));

    // Estrategia para la autenticación con GitHub
    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.967e1f2adf04d46b',
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
            clientSecret: '57fc8f2c426e76a4f73e2ab6ecdc082b68cd5f54'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('GitHub Profile:', profile); 
                const user = await usersDAO.getUserByEmail({ email: profile._json.email }); 
                if (user) {
                    return done(null, user); 
                }
                const newUser = await usersDAO.addUsers({ 
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email || profile.username, 
                    password: 'CreateWithGithub', 
                });
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serializa el usuario en la sesión
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializa el usuario de la sesión
    passport.deserializeUser(async (id, done) => {
        const user = await usersDAO.getUserById(id); // Obtiene el usuario por ID
        done(null, user); // Devuelve el usuario
    });
};

export default initializePassport;
