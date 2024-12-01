import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
};
