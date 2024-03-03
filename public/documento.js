import { emitirExclusaoDoc, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome")

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor(textoEditor.value, nomeDocumento);
});



function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
	emitirExclusaoDoc(nomeDocumento)
})

function RedirecionarParaHome(nomeDoc){
	
	if (nomeDoc === nomeDocumento){
		window.location.href = "/";
	}
};

export { atualizaTextoEditor, RedirecionarParaHome };
