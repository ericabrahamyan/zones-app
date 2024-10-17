import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import * as path from 'path';

@ValidatorConstraint({ name: 'isValidPath', async: false })
export class IsValidPathConstraint implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    try {
      const resolvedPath = path.resolve(text);
      const normalizedPath = path.normalize(text);
      return resolvedPath === normalizedPath;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.value} is not a valid filesystem path.`;
  }
}

export function IsPath() {
  return Validate(IsValidPathConstraint);
}
