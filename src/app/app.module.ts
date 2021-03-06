import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry-component/entry-component.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatButtonToggleModule
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';

import { ControlUnitComponent } from './entry-component/control-unit/control-unit.component';
import { EntryUnitComponent } from './entry-component/entry-unit/entry-unit.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { PrompterService } from './prompter.service';
import { PrompterComponent } from './prompter/prompter.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    AppNavbarComponent,
    ControlUnitComponent,
    EntryUnitComponent,
    ControlBarComponent,
    PrompterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    MatTooltipModule,
    MatSliderModule
  ],
  providers: [PrompterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
