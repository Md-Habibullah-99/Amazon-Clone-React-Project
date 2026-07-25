const assetModules = import.meta.glob('../images/**/*', {
  eager: true,
  import: 'default',
});

export function getAssetUrl(assetPath) {
  return assetModules[assetPath] ?? new URL(assetPath, import.meta.url).href;
}