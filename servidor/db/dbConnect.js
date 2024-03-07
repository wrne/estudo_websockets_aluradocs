import { MongoClient } from "mongodb";
const user = process.env.USER_MONGODB || 'root'
const pwd = process.env.PWD_MONGODB || '123'
const cliente = new MongoClient(`mongodb://${user}:${pwd}@localhost:27017/admin`)


let documentosColecao;
let usuariosColecao;

try {
	await cliente.connect();

	const db = cliente.db("alura-websockets");
	documentosColecao = db.collection("documentos");
	usuariosColecao = db.collection("usuarios");

	console.log("Conectado ao banco de dados com sucesso!");

} catch (erro) {
	console.log(erro);
}

export { documentosColecao, usuariosColecao };
