import { Express, Router } from "express";
import path from 'node:path';
import fg from 'fast-glob'; // yarn add fast-glob
import { resolveRuntimePath } from './paths';

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  const routesDir = resolveRuntimePath('routes');
  const files = fg.sync(['**/*.js', '**/*.ts'], { cwd: routesDir, absolute: true });

  // em produção, vai achar .js; em dev, .ts
  for (const file of files) {
    const mod = require(file);
    const mount = mod.default ?? mod; // default export
    if (typeof mount === 'function') {
      mount(router);
    }
  }
};
