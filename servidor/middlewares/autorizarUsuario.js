import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
	const tokenJwt = socket.handshake.auth.token;

	try {

		// Dispara erro caso o token seja inválido
		jwt.verify(tokenJwt, process.env.SEGREDO_JWT);
		
		next();

	} catch (error) {
		next(error)
	}

}

export default autorizarUsuario