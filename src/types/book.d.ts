export interface VolumeInfo {
  title: string;
  authors: string[];
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  imageLinks?: {
    thumbnail: string;
  };
  canonicalVolumeLink?: string;
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}