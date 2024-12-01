export type NewCourseRequest = {
  title: string;
  thumbnailUrl: string;
  description: string;
  price: number;
  discount: number;
  content: string;
  courseType: string;
};

export enum CourseType {
  NONE = 'NONE',
}

export type CourseDetail = {
  id: string;
  title: string;
  thumbnailUrl: string;
  slug: string;
  viewed: number;
  description: string;
  price: number;
  content: string;
  code: string;
  courseType: string;
  discount: number;
  createdAt: number;
  updatedAt: number;
};

export type CourseAllDataDetail = {
  course: Omit<CourseDetail, 'updatedDate' | 'createdDate' | 'systemStatus'>;
  chapters: any[];
  registered: boolean;
};
