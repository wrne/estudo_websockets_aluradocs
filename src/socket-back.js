import { atualizaDocumento, encontrarDocumento, incluirDocumento, listarDocumentos } from "./documentosDb.js";
import io from "./servidor.js";


io.on("connection", (socket) => {

	console.log("Um cliente se conectou! ID:", socket.id);

	socket.on("listar_documentos", async (callback)=>{
		const listaDocs = await listarDocumentos()
		if ( listaDocs ){
			console.log(listaDocs);
			callback(listaDocs);
		}
	})

	socket.on("incluir_documento", (nomeDocumento, callback)=>{
		if ( incluirDocumento(nomeDocumento)){
			callback(nomeDocumento);
		}
	})

	socket.on("selecionar_documento", async (nomeDocumento, callback) => {

		socket.join(nomeDocumento) // "sala de acordo com o documento" - Join cria um agrupamento para transmissao das mensagens

		const documento = await encontrarDocumento(nomeDocumento);
		

		console.log(documento);
		if (documento){
			// socket.emit("documento_encontrado",documento.texto)  - Forma 1 - Criar um evento de retorno e enviar o texto/documento encontrado
			callback(documento.texto) // Forma 2 - O Front define e envia uma função para atualziar o texto como callback. No tratamento do evento,o back executa a função definida no front /O\

		}

	})

	socket.on("texto_editor", async (texto, nomeDocumento) => {
		// socket.broadcast.emit("texto_editor_clientes", texto); // Dispara para todos os outros sockets

		const documento = await atualizaDocumento(nomeDocumento, texto);
		if (documento){
			documento.texto = texto
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});

});

