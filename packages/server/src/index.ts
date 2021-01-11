import logger from './logger';
import app from './app';

const appName = app.get('app');
const port = process.env.PORT || app.get('port');
const host = app.get('host');

const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);

server.on('listening', () => {
  logger.info('%s app started on http://%s:%d', appName, host, port);
  logger.info(
    '%s API documentation started on http://%s:%d%s',
    appName,
    host,
    port,
    '/docs\n',
  );
});
