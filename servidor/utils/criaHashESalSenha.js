import {randomBytes, scryptSync, } from "crypto";

function criaHashESalSenha(senhaDigitada){

	const saltSenha =  randomBytes(16).toString("hex")
	const hashSenha = scryptSync(senhaDigitada, saltSenha, 64).toString("hex");

	return { saltSenha, hashSenha }
}

export default criaHashESalSenha