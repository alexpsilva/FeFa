import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MinNumberString(property: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minNumberString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const minValue = Number(args.constraints[0])
          const numberValue = Number(value)

          return typeof value === 'string' && typeof numberValue === 'number' && !isNaN(numberValue)
            && typeof minValue === 'number' && !isNaN(minValue)
            && numberValue >= minValue;
        },
      },
    });
  };
}