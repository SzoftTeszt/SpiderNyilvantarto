import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const isloggedGuard: CanActivateFn = (route, state) => {
   const auth =inject(AuthService)
  
    return auth.getLoggedUser();
};
