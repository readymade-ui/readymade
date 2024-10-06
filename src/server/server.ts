import { installShimOnGlobal } from './shim';

installShimOnGlobal();

import path from 'path';
import chalk from 'chalk';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { config } from './config';

import ssr from './middleware/ssr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app: express.Application = express();
  const env: string = process.env.NODE_ENV || 'development';

  const corsOptions =
    env === 'production'
      ? { origin: `${config.protocol}://${config.host}` }
      : {};

  const helmetConfig = {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: [
          "'self'",
          () => `'sha256-5+YTmTcBwCYdJ8Jetbr6kyjGp0Ry/H7ptpoun6CrSwQ='`,
        ],
      },
    },
  };

  app.use(helmet(helmetConfig));
  app.use(cors(corsOptions));

  if (env === 'production') {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('../client'), {
        index: false,
      }),
    );
    app.use('*', ssr);
  }

  return { app };
}

createServer().then(({ app }) => {
  const port: string = process.env.PORT || config.port || '4443';
  app.listen(port, (): void => {
    const addr = `${config.protocol === 'HTTPS' ? 'https' : 'http'}://localhost:${port}`;
    process.stdout.write(
      `\n [${new Date().toISOString()}] ${chalk.green(
        'Server running:',
      )} ${chalk.blue(addr)} \n`,
    );
  });
});
