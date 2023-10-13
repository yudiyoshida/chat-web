import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../core/auth/account.service';
import { Observable } from 'rxjs';
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
export class SidenavComponent {
  public account$ = this.accountService.account;

  @Input() title!: string;
  @Input() resources$!: Observable<any>;

  @Output() onAddButtonEvent = new EventEmitter<null>();
  @Output() onRowClick = new EventEmitter<any>();

  public isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService,
    private socket: SocketioService,
  ) {}

  public buttonClick() {
    this.onAddButtonEvent.emit();
  }

  public rowClick(resource: any) {
    this.onRowClick.emit(resource);
  }

  public logout() {
    this.socket.disconnect();
    this.accountService.deleteSession();
  }
}
