export interface PermissionRecord {
  allow: string[];
  deny: string[];
}

export interface SandboxPermissions {
  fileSystem: {
    read: PermissionRecord;
    write: PermissionRecord;
  };
  network: {
    inbound: PermissionRecord;
    outbound: PermissionRecord;
  };
}

export interface SandboxRunOutput {
  stdout?: string;
  stderr?: string;
  exitCode: number;
}
