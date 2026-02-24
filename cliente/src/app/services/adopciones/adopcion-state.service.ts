import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionStateService {
  private mascotaIdSource = new BehaviorSubject<number | null>(null);
  private userIdSource = new BehaviorSubject<number | null>(null);
  private isFromAdoptButtonSource = new BehaviorSubject<boolean>(false);

  mascotaId$ = this.mascotaIdSource.asObservable();
  userId$ = this.userIdSource.asObservable();
  isFromAdoptButton$ = this.isFromAdoptButtonSource.asObservable();

  setIds(mascotaId: number, userId: number) {
    this.mascotaIdSource.next(mascotaId);
    this.userIdSource.next(userId);
    this.isFromAdoptButtonSource.next(true);
  }

  clearIds() {
    this.mascotaIdSource.next(null);
    this.userIdSource.next(null);
    this.isFromAdoptButtonSource.next(false);
  }
}