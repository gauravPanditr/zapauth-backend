import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsUUID,
  IsEnum,
  IsIP,
} from "class-validator";
import { DeviceType } from "../types/device";
import { Type } from "class-transformer";

export class CreateSessionDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsDate()
  @Type(() => Date)
  accessTokenExpiry: Date;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsDate()
  @Type(() => Date)
  refreshTokenExpiry: Date;

  @IsEnum(DeviceType)
  deviceType: DeviceType;

  @IsString()
  @IsNotEmpty()
  userAgent: string;

  @IsOptional()
  @IsIP()
  ipAddress: string;
  @IsString()
  @IsOptional()
  os: string;

  constructor(data: {
    userId: string;
    projectId: string;
    accessToken: string;
    accessTokenExpiry: Date | string;
    refreshToken: string;
    refreshTokenExpiry: Date | string;
    deviceType: DeviceType;
    userAgent: string;
    ipAddress: string;
    os:string
  }) {
    this.userId = data.userId;
    this.projectId = data.projectId;

    this.accessToken = data.accessToken;
    this.accessTokenExpiry =
      data.accessTokenExpiry instanceof Date
        ? data.accessTokenExpiry
        : new Date(data.accessTokenExpiry);

    this.refreshToken = data.refreshToken;
    this.refreshTokenExpiry =
      data.refreshTokenExpiry instanceof Date
        ? data.refreshTokenExpiry
        : new Date(data.refreshTokenExpiry);

    this.deviceType = data.deviceType;
    this.userAgent = data.userAgent;
    this.ipAddress = data.ipAddress;
    this.os=data.os;
  }
}
