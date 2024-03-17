const Hapi = require("@hapi/hapi");
const routes = require("./routes");

// initializeServer function for the setup server
const initializeServer = async() => {
    const server = Hapi.server({
        port: 9000,
        host: "localhost",
    });

    server.route(routes);

    await server.start();

    console.log("Server running on %s", server.info.uri);
};

// call the initializeServer function
initializeServer();