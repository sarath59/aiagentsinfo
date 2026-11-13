export const clientIds = [
  "claude-desktop",
  "claude-code",
  "cursor",
  "vscode",
  "vscode-copilot",
  "windsurf",
] as const;

export type ClientId = (typeof clientIds)[number];

export const osIds = ["macos", "windows", "linux"] as const;
export type OsId = (typeof osIds)[number];

export const transportIds = ["stdio", "http", "sse"] as const;
export type TransportId = (typeof transportIds)[number];

export const secretStyles = ["env", "input"] as const;
export type SecretStyle = (typeof secretStyles)[number];

export type ServerDraft = {
  name: string;
  transport: TransportId;
  command: string;
  args: string[];
  envNames: string[];
  url: string;
  headerNames: string[];
};

export type GenerateInput = {
  client: ClientId;
  os: OsId;
  secretStyle: SecretStyle;
  servers: ServerDraft[];
};

export type ConfigPath = {
  os: OsId;
  path: string;
};

export type GeneratedFile = {
  client: ClientId;
  label: string;
  fileName: string;
  folderNote: string;
  kind: "json" | "steps";
  body: string;
  paths: ConfigPath[];
  commands: string[];
  commandNote: string;
  notes: string[];
  limits: string[];
};

export function isClientId(value: string): value is ClientId {
  return (clientIds as readonly string[]).includes(value);
}

export function isOsId(value: string): value is OsId {
  return (osIds as readonly string[]).includes(value);
}

export function isTransportId(value: string): value is TransportId {
  return (transportIds as readonly string[]).includes(value);
}

export function isSecretStyle(value: string): value is SecretStyle {
  return (secretStyles as readonly string[]).includes(value);
}
