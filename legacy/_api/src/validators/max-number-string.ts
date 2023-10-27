import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MaxNumberString(property: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'maxNumberString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const maxValue = Number(args.constraints[0])
          const numberValue = Number(value)

          return typeof value === 'string' && typeof numberValue === 'number' && !isNaN(numberValue)
            && typeof maxValue === 'number' && !isNaN(maxValue)
            && numberValue <= maxValue;
        },
      },
    });
  };
}