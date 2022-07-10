import { HttpParams } from '@angular/common/http';

export const optionRequest = (req?: any): HttpParams => {
  let option: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      option = option.set(key, req[key]);
    })
  }
  return option;
};
