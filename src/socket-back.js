import io from "./servidor.js";

const documentos = [
	{
		nome: "JavaScript",
		texto: "Texto de Javascript..."
	},
	{
		nome: "Node",
		texto: "Texto de Node..."
	},
	{
		nome: "Socket.io",
		texto: "Texto de socket.io..."
	}
]

io.on("connection", (socket) => {

	console.log("Um cliente se conectou! ID:", socket.id);

	socket.on("selecionar_documento", (nomeDocumento, callback) => {

		socket.join(nomeDocumento) // "sala de acordo com o documento" - Join cria um agrupamento para transmissao das mensagens

		const documento = encontrarDocumento(nomeDocumento);
		console.log(documento);
		if (documento){
			// socket.emit("documento_encontrado",documento.texto)  - Forma 1 - Criar um evento de retorno e enviar o texto/documento encontrado
			callback(documento.texto) // Forma 2 - O Front define e envia uma função para atualziar o texto como callback. No tratamento do evento,o back executa a função definida no front /O\

		}

	})

	socket.on("texto_editor", (texto, nomeDocumento) => {
		// socket.broadcast.emit("texto_editor_clientes", texto); // Dispara para todos os outros sockets

		const documento = encontrarDocumento(nomeDocumento);
		if (documento){
			documento.texto = texto
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});

});

function encontrarDocumento(nome){

	const documento = documentos.find((doc)=>{
		return doc.nome === nome;
	})

	return documento;
}