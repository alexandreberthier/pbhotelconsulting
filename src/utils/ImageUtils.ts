const imageModules = import.meta.glob('../assets/images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function getImage(image: string) {
  const key = `../assets/images/${image}`
  const resolved = imageModules[key]

  if (resolved) {
    return resolved
  }

  return `/images/${image}`
}
