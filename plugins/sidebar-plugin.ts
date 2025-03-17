import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types';

import { pathFormatter } from '../src/utils/navigator';

export const sidebarPlugin: StarlightPlugin = {
  name: 'sidebarPlugin',
  hooks: {
    'config:setup': ({ updateConfig }) => {
      const sidebar = generateSidebar();
      updateConfig({
        sidebar,
      });
    },
  },
};

function generateSidebar(): StarlightUserConfig['sidebar'] {
  const basepath = resolve(cwd(), './src/content/docs');
  const dirs = readdirSync(basepath);
  const result: StarlightUserConfig['sidebar'] = [];
  for (const dirname of dirs) {
    if (statSync(resolve(basepath, dirname)).isDirectory()) {
      result.push({
        label: pathFormatter(dirname),
        autogenerate: { directory: dirname },
      });
    }
  }
  return result;
}
