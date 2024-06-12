import { caesarCipher, formatBytes, getRandomNumber } from "@/lib/utils";
import {
  DefaultSharedPermissionMetadata,
  DriveMetadataMinimal,
  DriveMetadataStandard,
  DriveSearchResult,
  FileCreatingMetadata,
  FolderCreatingMetadata,
  PermissionCreatingMetadata
} from "@/models/drive-models";

export async function checkForUploadFolder(userToken: string): Promise<string> {
  try {
    const SEARCH_KEY: string =
      "trashed = false and mimeType = 'application/vnd.google-apps.folder' and visibility = 'anyoneWithLink' and name = 'FileShake'";
    const REQUIRED_FIELDS: string = "files(id, name, mimeType, permissionIds)";
    const _URL: string = `https://www.googleapis.com/drive/v3/files?q=${SEARCH_KEY}&fields=${REQUIRED_FIELDS}`;
    const response: Response = await fetch(_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    const driveSearchResult: DriveSearchResult = await response.json();
    return driveSearchResult.files.length === 0 ? "" : driveSearchResult.files[0].id;
  } catch {
    return "Error";
  }
}

export async function createUploadFolder(userToken: string): Promise<string> {
  const folderMetadata: FolderCreatingMetadata = {
    name: "FileShake",
    mimeType: "application/vnd.google-apps.folder"
  };
  const folderMetadataJSON: string = JSON.stringify(folderMetadata, null, "  ");
  const folderMetadataJSONBlob: Blob = new Blob([folderMetadataJSON], { type: "application/json" });

  try {
    const REQUIRED_FIELDS: string = "id, name, mimeType, permissionIds";
    const _URL: string = `https://www.googleapis.com/drive/v3/files?uploadType=media&fields=${REQUIRED_FIELDS}`;
    const response: Response = await fetch(_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: folderMetadataJSONBlob
    });
    const createdFolder: DriveMetadataMinimal = await response.json();
    const isPermissionCreated: boolean = await createSharedPermission(userToken, createdFolder.id);
    if (isPermissionCreated) {
      return createdFolder.id;
    } else {
      throw new Error("There was a problem in creating the shared folder!");
    }
  } catch {
    return "Error";
  }
}

async function createSharedPermission(userToken: string, folderId: string): Promise<boolean> {
  const permissionMetadata: PermissionCreatingMetadata = { ...DefaultSharedPermissionMetadata };
  const permissionMetadataJSON: string = JSON.stringify(permissionMetadata, null, "  ");
  const permissionMetadataJSONBlob: Blob = new Blob([permissionMetadataJSON], { type: "application/json" });

  try {
    const _URL: string = `https://www.googleapis.com/drive/v3/files/${folderId}/permissions`;
    const response: Response = await fetch(_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: permissionMetadataJSONBlob
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function uploadFile(
  userToken: string,
  fileBuffer: ArrayBuffer,
  fileName: string,
  fileType: string,
  folderId: string
): Promise<string> {
  const fileMetadata: FileCreatingMetadata = {
    name: fileName,
    mimeType: fileType,
    parents: [folderId]
  };
  const fileMetadataJSON: string = JSON.stringify(fileMetadata, null, "  ");
  const fileMetadataJSONBlob: Blob = new Blob([fileMetadataJSON], { type: "application/json" });
  const fileBlob: Blob = new Blob([fileBuffer], { type: fileType });

  const formData: FormData = new FormData();
  formData.append("metadata", fileMetadataJSONBlob);
  formData.append("file", fileBlob);
  try {
    const REQUIRED_FIELDS: string =
      "id, name, mimeType, size, fileExtension, fullFileExtension, webContentLink, parents, permissionIds";
    const _URL: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${REQUIRED_FIELDS}`;
    const response: Response = await fetch(_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: formData
    });
    const uploadResponseFile: DriveMetadataStandard = await response.json();
    const fileId: string = uploadResponseFile.id;
    const fileName2: string = encodeURI(uploadResponseFile.name);
    const fileSize: string = encodeURI(formatBytes(parseInt(uploadResponseFile.size)));
    let fileExtension: string = "";
    switch (uploadResponseFile.fileExtension === "") {
      case true:
        fileExtension = fileName2.slice(fileName2.lastIndexOf(".") + 1).toUpperCase();
        break;
      case false:
        fileExtension = uploadResponseFile.fileExtension.toUpperCase();
        break;
    }
    const downloadKey: string = `${fileId}&${fileName2}&${fileSize}&${fileExtension}`;
    const key: number = getRandomNumber(1, 26);
    const encodedDownloadKey: string = caesarCipher(downloadKey, key);
    const downloadLink = `https://nfs.subhamk.com/r/${encodedDownloadKey}/${key}`;
    return downloadLink;
  } catch {
    return "Error";
  }
}
