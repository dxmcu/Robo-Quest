import { Component, OnInit } from '@angular/core';
import {RobotDBService} from '../services/robot-db.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-robot',
  templateUrl: './read-robot.component.html',
  styleUrls: ['./read-robot.component.css']
})
export class ReadRobotComponent implements OnInit {

  robots: any = [];     //Robots found from the database

  //Connect to the Router service
  constructor(private roboRoute: RobotDBService) { }

  ngOnInit() {
     //Makes an asynchronous call
     this.roboRoute.GetRobots().subscribe((data) => {
      //Return data from the web service
      this.robots = data.robots;
      console.log(this.robots);
    })
  }

}
