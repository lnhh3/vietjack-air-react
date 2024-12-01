import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument, UserModel } from '@/schemas/user.schema';
import { LoggerService } from '@/shared/logger/logger.service';
import { SystemStatus } from '@/types/common';
import { UserRole } from '@/types/role';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private readonly logger: LoggerService,
  ) {}

  async createUser(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async getByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async getByIdAndSystemStatus(
    id: string,
    systemStatus = SystemStatus.ACTIVE,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id: id, systemStatus });
  }
}
