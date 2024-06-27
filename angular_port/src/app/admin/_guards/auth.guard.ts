import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('nexuslens_cms_token');
  if(token != null && token.length>0){
    return true;
  }
  return false;
};
