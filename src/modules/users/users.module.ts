import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE_NAME, USERS_PACKAGE_NAME } from './interfaces/users.pb';
import { UsersController } from './users.controller';
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: USERS_PACKAGE_NAME,
          protoPath: join(__dirname, '../../proto/users.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
