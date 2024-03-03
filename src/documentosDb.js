import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome){

	const documento = documentosColecao.findOne({nome})

	return documento;

}

async function listarDocumentos(){

	const listaDocs = await documentosColecao.find().toArray();	
	return listaDocs;
}

async function incluirDocumento(nome){

	const atualizacao = await documentosColecao.insertOne({
		nome,
		texto: ""
	})
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

async function excluirDocumento(nome){

	const resultado = await  documentosColecao.deleteOne({nome});
	if (resultado.acknowledged)
		return true;

	return false;
};

export {encontrarDocumento, atualizaDocumento, incluirDocumento, listarDocumentos, excluirDocumento}