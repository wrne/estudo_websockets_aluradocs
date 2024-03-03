import { ExcluirDocumentoLista, incluirDocumentoLista } from "./index.js";

const socket = io();

socket.emit("listar_documentos", (listaDocs)=>{
	console.log("solicitado a listagem de documentos");
	listaDocs.forEach(doc => {
		incluirDocumentoLista(doc.nome);		
	});
});


function incluirNovoDocumento(nomeDocumento){
	
	// socket.emit("incluir_documento",nomeDocumento,()=>{
	// 	console.log('emitindo evento inlcuir_documento');
	// 	incluirDocumentoLista(nomeDocumento);
	// })
	socket.emit("incluir_documento",nomeDocumento)
}

socket.on("incluir_documento_sucesso", (nomeDoc)=>{

	incluirDocumentoLista(nomeDoc)

})

socket.on("excluir_documento_sucesso", (nome)=>{

	ExcluirDocumentoLista(nome);

})

export {incluirNovoDocumento}