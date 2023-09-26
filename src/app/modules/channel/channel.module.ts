import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelComponent } from './channel.component';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';


@NgModule({
  declarations: [
    ChannelComponent,
  ],
  imports: [
    CommonModule,
    ChannelRoutingModule,
    SidenavComponent,
  ],
})
export class ChannelModule { }
