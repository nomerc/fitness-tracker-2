import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/data.service";
import { Workout } from "src/models/workout.model";
import { ExerciseName } from "src/models/exerciseName.model";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.css"],
})
export class DetailsPageComponent implements OnInit {
  exercises!: ExerciseName[];
  date!: number;
  exerciseName!: string;

  workout: Workout = {
    date: Date.now(),
    exercises: [],
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      //get the date from params or use current date
      this.date = Date.parse(params.get("date") ?? Date());
    });
    this.getWorkoutData();
  }

  getWorkoutData() {
    this.dataService.getWorkout(this.date).subscribe((res) => {
      if (res.date && res.exercises) this.workout = res;
    });
  }
}
