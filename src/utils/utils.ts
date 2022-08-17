import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from "src/app/data.service";
import { Workout } from "src/models/workout.model";

export default class Utils {
  constructor(
    private _snackBar: MatSnackBar,
    public dataService?: DataService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }

  createDefaultWorkoutForNewUser() {
    let workout: Workout = {
      date: 0,
      exercises: [
        { name: "Pull-ups", repsInSets: [1, 0, 0, 0, 0] },
        { name: "Push-ups", repsInSets: [1, 0, 0, 0, 0] },
      ],
    };
    this.dataService?.addOrUpdateWorkout(workout).subscribe((res) => {});
  }
}
