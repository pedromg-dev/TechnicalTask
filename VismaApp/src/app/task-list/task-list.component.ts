import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskModel } from '../models/task.model';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule], // Importar aquí también
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})



export class TaskListComponent implements OnInit {
  constructor(private http: HttpClient) { }
  taskList : Task[] = [];
  url: string = 'https://localhost:7064/task';

  ngOnInit(): void {
    this.http.get<Task[]>(this.url + '/getalltasks')
      .subscribe((result: Task[]) => {
        console.log(result);
        this.taskList = result;
      })
  }
}