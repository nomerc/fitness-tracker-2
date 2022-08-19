import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ExerciseName } from "src/models/exerciseName.model";
import { Workout } from "src/models/workout.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.SERVER_URI;
  }

  //------workout data operations------

  getWorkout(date: Number): Observable<Workout> {
    return this.http.get<Workout>(`${this.ROOT_URL}/workouts/${date}`, {
      withCredentials: true,
    });
  }

  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.ROOT_URL}/workouts`, {
      // observe: "response",
      withCredentials: true,
    });
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.ROOT_URL}/workouts`, workout, {
      withCredentials: true,
    });
  }

  addOrUpdateWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      `${this.ROOT_URL}/workouts/${workout.date}`,
      workout,
      {
        withCredentials: true,
      }
    );
  }

  deleteWorkout(workout: Workout): Observable<Workout> {
    return this.http.delete<Workout>(
      `${this.ROOT_URL}/workouts/${workout.date}`,
      {
        withCredentials: true,
      }
    );
  }

  //------exercise name data operations------
  getAllExerciseNames(): Observable<ExerciseName[]> {
    return this.http.get<ExerciseName[]>(`${this.ROOT_URL}/exercise_names`);
  }

  addExerciseName(name: string): Observable<ExerciseName> {
    return this.http.post<ExerciseName>(`${this.ROOT_URL}/exercise_names`, {
      name,
    });
  }
}
