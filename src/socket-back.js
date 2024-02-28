import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("selecionar_documento",(nomeDocumento)=>{
	socket.join(nomeDocumento) // "sala de acordo com o documento" - Join cria um agrupamento para transmissao das mensagens
  })

  socket.on("texto_editor", (texto, nomeDocumento) => {
    // socket.broadcast.emit("texto_editor_clientes", texto); // Dispara para todos os outros sockets
	socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
  });

});
