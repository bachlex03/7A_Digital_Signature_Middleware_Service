import { Error } from '../errors/error';

export type Result<T, E = Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(public readonly value: T) {}

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Success(fn(this.value));
  }

  flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.value);
  }

  match<U>(onSuccess: (value: T) => U, onFailure: (error: never) => U): U {
    return onSuccess(this.value);
  }

  getValue(): T {
    return this.value;
  }
}

export class Failure<E> {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(public readonly error: E) {}

  map<U>(fn: (value: never) => U): Result<never, E> {
    return this as any;
  }

  flatMap<U, F>(fn: (value: never) => Result<U, F>): Result<never, E> {
    return this as any;
  }

  match<U>(onSuccess: (value: never) => U, onFailure: (error: E) => U): U {
    return onFailure(this.error);
  }

  getError(): E {
    return this.error;
  }
}

// Utility functions
export const success = <T>(value: T): Success<T> => new Success(value);
export const failure = <E>(error: E): Failure<E> => new Failure(error);

// Type guards
export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> => {
  return result.isSuccess;
};

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> => {
  return result.isFailure;
};
