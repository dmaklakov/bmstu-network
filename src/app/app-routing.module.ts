import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HeadBigComponent } from './head-big/head-big.component';
import { BlockComponent } from './block/block.component';
import { FooterComponent } from './footer/footer.component';
import { SideFiguresComponent } from './side-figures/side-figures.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { HeadSmallComponent } from './head-small/head-small.component';
import { GraphComponent } from './graph/graph.component';
import { ExitComponent } from './exit/exit.component';


const routes: Routes = [
  { path: 'vk_get_auth', component: AuthComponent }, 
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'graph-new', component: GraphComponent },
  { path: 'search', component: SearchComponent },
  { path: 'main', redirectTo: '', pathMatch: 'full' },
  { path: 'user/:token', component: UserComponent },
  { path: 'user', redirectTo: 'user/' + localStorage.getItem('token'), pathMatch: 'full' },
  { path: 'exit', component: ExitComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
