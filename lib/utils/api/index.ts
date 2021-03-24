export interface API {
  isError: boolean;
  statusCode: number;
  message: string;
  data: any[];
}

export interface PostItem {
  title: string;
  id: string;
  company: string;
  publishDate: number;
}
