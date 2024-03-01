import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome){

	const documento = documentosColecao.findOne({nome})

	return documento;

}

async function listarDocumentos(){
	const listaDocs = await documentosColecao.find().toArray();
	console.log(listaDocs);
	return listaDocs;
}

async function incluirDocumento(nome){

	const atualizacao = await documentosColecao.insertOne({
		nome,
		texto: ""
	})
	console.log(atualizacao);
	return atualizacao.acknowledged;

}

function atualizaDocumento(nome, texto){

	const atualizacao = documentosColecao.updateOne({nome},{
		$set: {
			texto
		}
	})

	return atualizacao;

}
export {encontrarDocumento, atualizaDocumento, incluirDocumento, listarDocumentos}