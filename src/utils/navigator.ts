import type { StarlightRouteData } from '@astrojs/starlight/route-data';

export function isCurrentPage(id: string, label: string) {
  const [current] = id.split('/');
  return label === pathFormatter(current);
}

export function recursionEntries(
  entries: StarlightRouteData['sidebar'],
): string {
  const [entry] = entries || [];
  if (entry?.type === 'link') return entry.href;
  if (entry?.type === 'group') return recursionEntries(entry.entries);
  return '/';
}

export function pathFormatter(path: string) {
  return path.replace(/\d+-/, '');
}
