import {scryptSync, timingSafeEqual} from "crypto";

function autenticarUsuario(senhaDigitada, usuario){

	const hashTeste = scryptSync(senhaDigitada, usuario.saltSenha, 64);

	// Para fazer a comparação dos hash, precisamos comparar os Buffers
	const hashReal = Buffer.from(usuario.hashSenha, "hex");

	const autenticado = timingSafeEqual(hashTeste, hashReal);

	return autenticado;
}

export default autenticarUsuario