export type TagsResponse = string[];

export interface CatParams {
  tag: string;
  text: string;
}

export interface CatResponse {
  tags: TagsResponse;
  createdAt: string;
  updatedAt: string;
  validated: boolean;
  owner: string;
  file: string;
  mimetype: string;
  size: number;
  _id: string;
  url: string;
}
