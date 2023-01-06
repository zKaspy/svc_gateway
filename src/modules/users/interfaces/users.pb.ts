import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import * as Buffer from 'buffer';

export const protobufPackage = 'users';

export interface CreateUserRequest {
  name: string;
  age: string;
}

export interface CreateUserResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindUserData {
  id: number;
  name: string;
  age: number;
}

export interface GetUserRequest {
  id: number;
}

export interface GetUserResponse {
  status: number;
  error: string[];
  data: FindUserData | undefined;
}

export interface DeleteUserRequest {
  id: number;
}

export interface DeleteUserResponse {
  status: number;
}

export interface UpdateUserRequest {
  id: number;
  name: string;
  age: string;
}
export interface UpdateUserResponse {
  status: number;
}

export interface FileUploadRequest {
  image: Buffer;
  originalName: string;
}

export interface FileUploadResponse {
  name: string;
  status: string;
}

export interface DownloadFileRequest {
  name: number;
}

export interface DownloadFileResponse {
  error: string;
}

export interface GetUsersRequest {
  status: string;
}

export interface GetUsersResponse {
  data: string;
}

export const USERS_PACKAGE_NAME = 'users';

export interface UsersServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  getUsers(request: GetUsersRequest): Observable<GetUsersResponse>;
  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  uploadFile(request: FileUploadRequest): Observable<FileUploadResponse>;
  downloadFile(request: DownloadFileRequest): Observable<DownloadFileResponse>;
}

// export interface UsersServiceController {
//   createUser(request: CreateUserRequest): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
//   getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;
//   updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;
//   deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
// }

// export function UsersServiceControllerMethods() {
//   return function (constructor: Function) {
//     const grpcMethods: string[] = ['createUser', 'getUser', 'updateUser', 'deleteUser'];
//     for (const method of grpcMethods) {
//       const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
//       GrpcMethod('UsersService', method)(constructor.prototype[method], method, descriptor);
//     }
//     const grpcStreamMethods: string[] = [];
//     for (const method of grpcStreamMethods) {
//       const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
//       GrpcStreamMethod('UsersService', method)(constructor.prototype[method], method, descriptor);
//     }
//   };
//}

export const USERS_SERVICE_NAME = 'UsersService';

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
