import { HydratedDocument, Model, Schema } from 'mongoose';

export const SchemaObjectId = Schema.Types.ObjectId;

export enum SystemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type BaseDocumentType<T> = HydratedDocument<T, ITimestamps>;
export type BaseModelType<T> = Model<T, T, ITimestamps>;
