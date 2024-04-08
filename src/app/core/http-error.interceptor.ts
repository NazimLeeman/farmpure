import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, retry, throwError, timer } from "rxjs";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const retryCounts = 3;

	return next(req).pipe(
		retry({
			count: retryCounts,
			delay: (_, retryCount) => timer(retryCount * 1000),
		}),
		catchError((error) => {
			console.error(`${retryCounts} retries failed, ${error}`);
			return throwError(
				() => new Error(`request failed after ${retryCounts} retries`),
			);
		}),
	);
};
