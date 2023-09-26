import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../core/auth/account.service';
import { ChannelService } from '../../core/channel.service';
import { StorageService } from '../../core/auth/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
})
export class SidenavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private accountService = inject(AccountService);
  private channelService = inject(ChannelService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  public isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(),
  );

  public account$ = this.accountService.account;
  public users$ = this.channelService.users;

  public logout() {
    this.channelService.getAllUsers();
    // this.storageService.deleteToken();
    // this.router.navigate(['/']);
  }
}
