import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from './models/task.model';

interface Request {
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private apiUrl: string = 'https://localhost:7064/task';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<TaskModel[]>(`${this.apiUrl}/getalltasks`);
  }

  createTask(title: any) {
    const task = { title };
    return this.http.post(`${this.apiUrl}/createtask`, task);
  }

  completeTask(id: any) {
    const task = { id };
    return this.http.put(`${this.apiUrl}/completetask`, task);
  }
}
