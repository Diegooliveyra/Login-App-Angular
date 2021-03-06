import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private mainService: MainService) { }

  people$!: Observable<Person[]>

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople()
  }

}
