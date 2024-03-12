import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumentos from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";


import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

// Referencia do namespace de usuarios
const nspUsuarios = io.of("/usuarios");

// middleware usado somente para o namespace "usuarios"
nspUsuarios.use(autorizarUsuario);

// middleware usado somente para o namespace "usuarios"
nspUsuarios.on("connection", (socket) => {

	registrarEventosInicio(socket, nspUsuarios);
	registrarEventosDocumentos(socket, nspUsuarios);

});

// middleware usado somente para o namespace "principal"
io.of("/").on("connection", (socket) => {

	registrarEventosCadastro(socket, io);
	registrarEventosLogin(socket, io);

});
