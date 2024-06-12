export interface FolderCreatingMetadata {
  name: string;
  mimeType: string;
}

export interface FileCreatingMetadata extends FolderCreatingMetadata {
  parents: string[];
}

export interface DriveMetadataMinimal {
  id: string;
  mimeType: string;
  name: string;
  permissionIds: string[];
}

export interface DriveMetadataStandard extends DriveMetadataMinimal {
  size: string;
  fileExtension: string;
  fullFileExtension: string;
  webContentLink: string;
  parents: string[];
}

export interface DriveSearchResult {
  files: DriveMetadataMinimal[];
}

export interface PermissionCreatingMetadata {
  role: string;
  type: string;
}

export const DefaultSharedPermissionMetadata: PermissionCreatingMetadata = {
  role: "reader",
  type: "anyone"
};
