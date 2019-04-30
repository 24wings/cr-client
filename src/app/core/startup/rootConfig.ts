import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
/*
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class rootConfig {
  constructor(
    private httpClient: HttpClient,
  ) {

  }

  public requestUrl = "http://localhost:55659/api/";
}
