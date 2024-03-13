import {
	emitirExcluirDocumento,
	emitirTextoEditor,
	selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuarios = document.getElementById("usuarios-conectados")

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacaoSucesso(payloadToken) {

	selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });

}

function atualizarInterfaceUsuarios(usuariosDocumento) {

	listaUsuarios.innerHTML = "";

	usuariosDocumento.forEach(usuario => {
		listaUsuarios.innerHTML += `<li class="list-group-item">${usuario}</li>`;
	});

}

function informaUsuarioJaNoDocumento(){
	alert("Documento já aberto em outra página.");
	window.location.href = "/";
}

textoEditor.addEventListener("keyup", () => {
	emitirTextoEditor({
		texto: textoEditor.value,
		nomeDocumento,
	});
});

function atualizaTextoEditor(texto) {
	textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
	emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
	if (nome === nomeDocumento) {
		alert(`Documento ${nome} excluído!`);
		window.location.href = "/";
	}
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios, informaUsuarioJaNoDocumento };
