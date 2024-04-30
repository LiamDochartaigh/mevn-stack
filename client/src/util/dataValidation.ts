import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateAndTransform<T extends object>(cls: new (...args: any[]) => T, plainObject: any): Promise<T> {
    const instance = plainToInstance(cls, plainObject);
    const errors = await validate(instance);
    if (errors.length > 0) {
        throw new Error(`Error validating ${cls.name}`);
    }
    return instance;
}
