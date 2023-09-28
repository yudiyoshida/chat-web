import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../core/auth/account.service';
import { SocketioService } from '../../core/services/socketio.service';

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
export class SidenavComponent implements OnInit {
  public account$ = this.accountService.account;
  public users$ = this.socketService.onUserList(this.socketService.account);

  public isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService,
    private socketService: SocketioService,
  ) {}

  ngOnInit(): void {
    this.socketService.emitUserList();
  }

  public online() {
    this.socketService.emitUserOnline();
  }

  public offline() {
    this.socketService.emitUserOffline();
  }

  public logout() {
    this.accountService.deleteSession();
    this.socketService.disconnect();
  }
}
