import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome){
	socket.emit("selecionar_documento", nome, (texto)=>{atualizaTextoEditor(texto)}); // envio do call para o backend executar a função de atualizar texto economiza um evento de retorno
}

function emitirTextoEditor(texto, nomeDocumento) {
  socket.emit("texto_editor", texto, nomeDocumento);
}

// apos envio da AtualizaTextoEditor como callback para o backend, o evento de retorno "documento_encontrado" se torna obsoleto
// socket.on("documento_encontrado", (texto) => { 
//   atualizaTextoEditor(texto);
// });

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };
