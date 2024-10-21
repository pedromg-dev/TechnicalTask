import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from, Observable } from 'rxjs';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})



export class TaskListComponent implements OnInit {
  constructor(private http: HttpClient) { }
  taskList: Task[] = [];
  url: string = 'https://localhost:7064/task';


  ngOnInit(): void {
    const data = from(fetch(this.url + '/getalltasks'));

    data.subscribe({
      next: async (response) => {
        const result: Task[] = await response.json();
        this.taskList = result;
      },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
  }

  createTask(): void {

  }
}