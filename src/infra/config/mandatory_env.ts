export function mandatoryEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing mandatory environment variable ${key}`);
  }
  return value;
}
