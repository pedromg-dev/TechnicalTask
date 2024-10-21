import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { TaskService } from '../task.service';
import { TaskModel } from '../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})



export class TaskListComponent implements OnInit {
  taskList: TaskModel[] = []
  taskTitle: string = "";
  constructor(private http: HttpClient, private taskService: TaskService) { }

  ngOnInit(): void {

    this.refreshTaskList();
  }

  refreshTaskList() {
    this.taskService.getTasks().subscribe({
      next: async (response) => {
        this.taskList = response;
      },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
  }

  createTask(): void {
    if(this.taskTitle != null && this.taskTitle !== "") {
      this.taskService.createTask(this.taskTitle).subscribe({
        next: async (response) => {
          this.refreshTaskList();
        },
        error(err) { console.error('Error: ' + err); },
        complete() { console.log('Completed'); }
      })
    }
  }
}