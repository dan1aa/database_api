import { Prisma } from '@prisma/client';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';
import { Request, Response, NextFunction } from 'express';


// You can read about errors code of prisma here: https://www.prisma.io/docs/reference/api-reference/error-reference
const prismaErrorHandler = (    
    error: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            const cause = error.meta?.cause as string || 'Record does not exist';
            throw new NotFoundError(cause);
        } else if (error.code === 'P2002') {
            const cause = error.meta?.target
                ? `Unique constraint failed on the ${error.meta.target}`
                : 'Unique constraint failed';
          throw new BadRequestError(cause);
        } else if (error.code === 'P2003') {
            const cause = error.meta && error.meta['field_name']
                ? `Foreign key constraint failed on the field: ${error.meta['field_name']}`
                : 'Foreign key constraint failed';
          throw new NotFoundError(cause);
        }
    }

    next(error);
}

export default prismaErrorHandler;