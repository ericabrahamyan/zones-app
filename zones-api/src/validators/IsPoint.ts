import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPoint', async: false })
class IsPointConstraint implements ValidatorConstraintInterface {
  validate(point: any) {
    return (
      Array.isArray(point) &&
      point.length === 2 &&
      typeof point[0] === 'number' &&
      typeof point[1] === 'number'
    );
  }

  defaultMessage() {
    return 'Each point must be an array of two numbers.';
  }
}
export function IsPoint(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPointConstraint,
    });
  };
}
