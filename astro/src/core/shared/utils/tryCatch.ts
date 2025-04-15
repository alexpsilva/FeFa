type Success<T> = { success: true; data: T };
type Failure = { success: false; error: Error };

export default function tryCatch<T>(promise: Promise<T>): Promise<Success<T> | Failure> {
    return promise
        .then((data) => ({ success: true, data } as Success<T>))
        .catch((error) => ({ success: false, error }));
}