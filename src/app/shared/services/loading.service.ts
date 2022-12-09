import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  private load: boolean = false;
  
  constructor() { 

  }

  show(){
    this._loading.next(true);
    return true;
  }
  hide(){
    this._loading.next(false);
    return true;
  }

  setLoading(load: boolean){
    this.load = load;
  }
  getLoading(): boolean{
    return this.load;
  }
}
