import { incluirDocumentoLista } from "./index.js";

const socket = io();

socket.emit("listar_documentos", (listaDocs)=>{
	console.log("solicitado a listagem de documentos");
	listaDocs.forEach(doc => {
		incluirDocumentoLista(doc.nome);		
	});
});

socket.on("incluir_documento",(documento)=>{
	console.log(`documento incluido: ${documento}`);
})

function incluirNovoDocumento(nomeDocumento){
	socket.emit("incluir_documento",nomeDocumento,()=>{
		incluirDocumentoLista(nomeDocumento);
	})
}

export {incluirNovoDocumento}