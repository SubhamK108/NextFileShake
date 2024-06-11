import { UploadedFile } from "@/models/uploaded-file";

export interface AppState {
  userToken: string;
  isSignedIn: boolean;
  isUploadComplete: boolean;
  isDriveUploadInitiated: boolean;
  isDriveUploadComplete: boolean;
  uploadedFiles: UploadedFile[];
  finalZipFileName: string;
  finalDownloadLink: string;
  progressInfo: string;
}

export const initialAppState: AppState = {
  userToken: "",
  isSignedIn: false,
  isUploadComplete: false,
  isDriveUploadInitiated: false,
  isDriveUploadComplete: false,
  uploadedFiles: [],
  finalZipFileName: "",
  finalDownloadLink: "",
  progressInfo: ""
};
