const path = require('path');
const { parseSocketCookieMiddleware, authenticateSocket } = require(path.join(process.cwd(), 'src/server/socket/socket.middlewares'));
const { promisifyFunction } = require(path.join(process.cwd(), 'src/server/utility/promises'));

const Socket = module.exports;

const modules = ['notification'];
const Namespaces = {};

Socket.init = async function (server) {
    requireModules();

    const { Server } = require('socket.io');
    const io = new Server(server);

    io.use(parseSocketCookieMiddleware);
    io.use(authenticateSocket);

    io.on('connection', onConnection);
}

function requireModules() {
    modules.forEach(moduleName => Namespaces[moduleName] = require(`./${moduleName}`));
}

function onConnection(socket) {
    console.log('Socket connected...');
    
    socket.onAny((event, ...args) => {
        const [moduleName, object, action] = event.split('.');

        if (
            !moduleName || 
            !object || 
            !action || 
            !Namespaces[moduleName] || 
            !Namespaces[moduleName][object] || 
            !Namespaces[moduleName][object][action]
        ) return;

        const paramsToCallTheMethod = args.slice(0, -1);
        const methodToCall = Namespaces[moduleName][object][action];

        promisifyFunction(methodToCall, socket, ...paramsToCallTheMethod)
            .then(res => {
                if (args.length && typeof args[args.length-1] === 'function') {
                    const successCallback = args[args.length-1];
                    successCallback(res);
                }
            });
	});

    socket.on('disconnect', () => {
		onDisconnect(socket);
	});
}

function onDisconnect(socket) {
    console.log('Disconnect from index socket page');
}