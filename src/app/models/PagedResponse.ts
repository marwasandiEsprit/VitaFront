export class PagedResponse<T> {
  content: T[] = [];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
}
