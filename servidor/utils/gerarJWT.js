import jwt from "jsonwebtoken";

function gerarJWT(payload) {

	const tokenJwt = jwt.sign(payload, process.env.SEGREDO_JWT, { expiresIn: "1h" })

	return tokenJwt;
};

export default gerarJWT;