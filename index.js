require('dotenv').config();
const chalk = require('chalk');
const cluster = require('cluster');

const port = process.env.PORT || 80;
const instances = process.env.INSTANCES || 1;
const server = require('./server');

if (cluster.isMaster) {
	console.log(chalk.bgGreen(`Master ${process.pid} started`));

	for (let i = 0; i < instances; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log(chalk.red(`Worker ${worker.process.pid} died`));
		cluster.fork();
	});
} else {
	server.listen(port, () => {
		console.log(
			chalk.cyan(`Worker ${process.pid} started on port ${port}`),
		);
	});
}
