import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { UserBuilder } from '@/schemas/builder/user.builder';
import { schemaOptions } from '@/shared/common/schema';
import { BaseDocumentType, BaseModelType, SystemStatus } from '@/types/common';
import { UserRole } from '@/types/role';

export type UserDocument = BaseDocumentType<User>;
export type UserModel = BaseModelType<User>;

@Schema({
  collection: 'users',
  ...schemaOptions,
})
export class User {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHashed: string;

  @Prop({ type: String, required: true })
  passwordSalt: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String })
  lastIpAddress: string;

  @Prop({ enum: SystemStatus })
  systemStatus: SystemStatus;

  @Prop({ enum: UserRole })
  userRole: UserRole;

  static get schema() {
    return SchemaFactory.createForClass(User);
  }

  static get model(): AsyncModelFactory {
    return {
      name: User.name,
      useFactory: () => {
        return this.schema;
      },
    };
  }

  static builder() {
    return new UserBuilder();
  }
}
