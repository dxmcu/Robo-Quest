import { Component, OnInit } from '@angular/core';
import {RobotDBService} from '../services/robot-db.service';
import {RobotManagerService} from '../services/robot-manager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-robot',
  templateUrl: './read-robot.component.html',
  styleUrls: ['./read-robot.component.css']
})
export class ReadRobotComponent implements OnInit {

  robots: any = [];     //Robots found from the database
  selectedJob: string;      //Get selected Job value
  selectedTeam: string;     //Get selected Team value

  //Array of available jobs
  jobs: string[];

  //Array of available teams
  teams: string[];

  //Connect to the Router service
  constructor(private router: Router, private route: ActivatedRoute,
    private roboRoute: RobotDBService, private roboManager: RobotManagerService) { }

  ngOnInit() {
    //Get the available jobs from the robot manager service
    this.jobs = this.roboManager.jobs;
    //Get the available teams from the robot manager service
    this.teams = this.roboManager.teams;
    
    //Makes an asynchronous call
    this.roboRoute.GetRobots().subscribe((data) => {
    //Return data from the web service
    this.robots = data.robots;
    console.log(this.robots);
    })
  }

  //Delete a robot from the database
  DeleteRobot(id: string){
    //Use the service to delete the robot from the database
    this.roboRoute.DeleteRobot(id).subscribe(
      //Adds asynchronous functionality
      () =>{
        //Add functionality to refresh the page automatically
        this.ngOnInit();
      }
    )
  }

  //Search for robots by their job
  SearchByJob(job: string){
    //Check to make sure the string isn't empty
    if(job != null){
      console.log("Selected job is: " + job);
      //Redirect to search component
      this.router.navigate(['/search/' + job]);
    }else{
      //Tell the user they need to select an option
      console.log("Please select an option");
    }
  }

  //Search for robots by their job
  SearchByTeam(team: string){
    //Check to make sure the string isn't empty
    if(team != null){
      console.log("Selected team is: " + team);
      //Redirect to search component
      this.router.navigate(['/search/' + team]);
    }else{
      //Tell the user they need to select an option
      console.log("Please select an option");
    }
  }

}
