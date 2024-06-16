import { Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

export const routes: Routes = [
    {
        path:"", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path:"admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
];
