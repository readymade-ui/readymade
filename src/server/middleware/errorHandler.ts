import path from 'path';
import { Response } from 'express';

const errorHandler = (err: Error, req: any, res: Response, next: any) =>
    res.status(404).json({
        status: 'error',
        message: err.message,
        stack:
            process.env.NODE_ENV === 'development' &&
            (err.stack || '')
                .split('\n')
                .map((line: string) => line.trim())
                .map((line: string) => line.split(path.sep).join('/'))
                .map((line: string) =>
                    line.replace(
                        process
                            .cwd()
                            .split(path.sep)
                            .join('/'),
                        '.'
                    )
                ),
    });

export default errorHandler;