import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function obterUsuarios() {
	const usuarios = usuariosColecao.find().toArray();
	return usuarios;
}

async function adicionarUsuario({nome, senha}) {
	const { hashSenha, saltSenha } = criaHashESalSenha(senha);
	const resultado = await usuariosColecao.insertOne({nome,hashSenha, saltSenha});

	if (resultado.acknowledged)
		return true;

	return false;
}

async function encontrarUsuario(nome) {
	const usuario = await usuariosColecao.findOne({
		nome,
	});

	// console.log(usuario);
	return usuario;
}

function atualizaUsuario(nome, texto) {
	const atualizacao = usuariosColecao.updateOne(
		{
			nome,
		},
		{
			$set: {
				texto,
			},
		}
	);

	return atualizacao;
}

function excluirUsuario(nome) {
	const resultado = usuariosColecao.deleteOne({
		nome,
	});

	return resultado;
}

export {
	encontrarUsuario,
	atualizaUsuario,
	obterUsuarios,
	adicionarUsuario,
	excluirUsuario,
};
