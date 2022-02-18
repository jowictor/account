import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ApiBase } from "../../utils/ApiBase";
import { AccountService } from "./account.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) { }

  @Post("cnab")
  @UseInterceptors(FileInterceptor("file"))
  public async registerCnab( @UploadedFile() file: Express.Multer.File): Promise<ApiBase.HttpResponse> {
    return ApiBase.handleHttpResponse( await this.accountService.registerCnab(file));
  }
}
