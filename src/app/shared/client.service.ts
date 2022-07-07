import { HttpClient } from "@angular/common/http";
import { map, Subject } from "rxjs";

export class ClientService {
  subscription = new Subject<any>()
  items: any = []

  constructor(private http: HttpClient, private url: string) {}
  
  create(item: any) {
    this.http.post<any>(this.url, item)
      .pipe(
        map(res => res?.data)
      )
      .subscribe(
        (item) => {
          this.items.push(item)
          this.subscription.next(this.items.slice())
        }
      )
  }

  get() {
    this.http.get<any>(this.url)
      .pipe(
        map(res => res?.data)
      )
      .subscribe(
        (items) => {
          this.items = items
          this.subscription.next(this.items.slice())
        }
      )
  }

  getById(id: any) {
    // return this.items.find(item => item._id == id)
    return this.http.get<any>(`${this.url}/${id}`)
  }

  update(id: any, updates: any) {
    this.http.patch<any>(`${this.url}/${id}`, updates)
      .pipe(
        map(res => res?.data)
      )
      .subscribe(
        (updatedItem) => {
          this.items = this.items.map(item => {
            if (item._id == id) return updatedItem
            return item
          })
          this.subscription.next(this.items.slice())
        }
      )
  }

  delete(id: any) {
    this.http.delete(`${this.url}/${id}`)
      .subscribe(
        (deletedItem) => {
          this.items = this.items.filter(item => {
            return item._id !== id
          })
          this.subscription.next(this.items.slice())
        }
      )
  }
}