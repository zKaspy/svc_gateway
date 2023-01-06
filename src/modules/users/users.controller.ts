import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  USERS_SERVICE_NAME,
  GetUserResponse,
  DeleteUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UsersServiceClient,
  FileUploadResponse,
  DownloadFileResponse, DownloadFileRequest,
} from './interfaces/users.pb';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto}  from "./dto/update-user.dto";


@Controller('users')
@ApiTags('Users')
export class UsersController implements OnModuleInit {
  private svc: UsersServiceClient;

  @Inject(USERS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  private createUser(@Body() body: CreateUserRequest): Observable<CreateUserResponse> {
    return this.svc.createUser(body);
  }

  @Get(':id')
  private getUser(@Param('id', ParseIntPipe) id: number): Observable<GetUserResponse> {
    return this.svc.getUser({ id });
  }
  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  private updateUser(@Body() body: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.svc.updateUser(body);
  }

  @Delete(':id')
  private deleteUser(@Param('id', ParseIntPipe) id: number): Observable<DeleteUserResponse> {
    return this.svc.deleteUser({ id });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  private uploadFile(@UploadedFile() file: Express.Multer.File): Observable<FileUploadResponse> {
    return this.svc.uploadFile({ image: file.buffer, originalName: file.originalname });
  }

  @Post('download')
  private downloadFile(@Body() body: DownloadFileRequest): Observable<DownloadFileResponse> {
    return this.svc.downloadFile({ name: body.name});
  }
}
