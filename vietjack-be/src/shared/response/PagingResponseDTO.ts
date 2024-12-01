import { ApiProperty } from '@nestjs/swagger';

type PagingObject = {
  totalElements: number;
  totalPages: number;
  elementPerPage: number;
  currentPage: number;
};

export class PagingResponseDTO<T> {
  @ApiProperty()
  private content: T[];
  @ApiProperty()
  private totalElements: number;
  @ApiProperty()
  private totalPages: number;
  @ApiProperty()
  private elementPerPage: number;
  @ApiProperty()
  private currentPage: number;

  constructor(
    content: T[],
    { totalElements, totalPages, currentPage, elementPerPage }: PagingObject,
  ) {
    this.content = content;
    this.elementPerPage = elementPerPage;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
  }

  setContent(data: T[]) {
    this.content = data;
    return this;
  }
  getContent() {
    return this.content;
  }
  setTotalElements(total: number) {
    this.totalElements = total;
    return this;
  }
  getTotalElements() {
    return this.totalElements;
  }
  setTotalPages(total: number) {
    this.totalPages = total;
    return this;
  }
  getTotalPages() {
    return this.totalPages;
  }
  setElementPerPage(total: number) {
    this.elementPerPage = total;
    return this;
  }
  getElementPerPage() {
    return this.elementPerPage;
  }
  setCurrentPage(page: number) {
    this.currentPage = page;
    return this;
  }
  GetCurrentPage() {
    return this.currentPage;
  }
}
