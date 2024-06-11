export function getFileIconStyle(fileExtension: string): string {
  const iconStyles: Record<string, string> = {
    "MP4,MKV,WMV,MOV,AVI,AVCHD,FLV,WEBM,MPEG,MPEG-2": "fa-solid fa-video",
    "JPG,JPEG,PNG,SVG,AVIF,GIF,WEBP": "fa-solid fa-image",
    "ZIP,RAR,TAR,GZ": "fa-solid fa-file-zipper",
    "TXT,": "fa-solid fa-file-lines",
    "PDF,": "fa-solid fa-file-pdf",
    "DOC,DOCX": "fa-solid fa-file-word",
    "XLS,XLSX": "fa-solid fa-file-excel",
    "PPT,PPTX": "fa-solid fa-file-powerpoint"
  };
  for (const extensionTypes in iconStyles) {
    if (extensionTypes.includes(fileExtension)) {
      return iconStyles[extensionTypes];
    }
  }
  return "fa-solid fa-file";
}
