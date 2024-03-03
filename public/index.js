import { incluirNovoDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos")
const formListaDocumentos = document.getElementById("form-adiciona-documento");
const inputNovoDocumento = document.getElementById("input-documento");

function incluirDocumentoLista(nomeDocumento) {
	listaDocumentos.innerHTML += `
	<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">
		${nomeDocumento}
	</a>
	`;
};

function ExcluirDocumentoLista(nomeDocume) {
	const documento = document.getElementById(`documento-${nomeDocume}`);
	console.log(`Documento encontrado: ${documento}`);
	listaDocumentos.removeChild(documento);
};

formListaDocumentos.addEventListener("submit", (evento) => {
	evento.preventDefault();
	console.log(inputNovoDocumento.value);
	if (inputNovoDocumento.value) {
		incluirNovoDocumento(inputNovoDocumento.value)
		inputNovoDocumento.value = "";
	}

})

export { incluirDocumentoLista, ExcluirDocumentoLista }