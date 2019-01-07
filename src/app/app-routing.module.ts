import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry-component/entry-component.component';
import { PrompterComponent } from './prompter/prompter.component';

const routes: Routes = [{
    path: '', component: EntryComponent
}, {
    path: 'prompter', component: PrompterComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
