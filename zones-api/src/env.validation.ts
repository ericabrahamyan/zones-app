import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum EnvStage {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(EnvStage)
  STAGE: EnvStage;

  @IsNumber()
  PORT: number;

  @IsString()
  CSV_FILE_PATH: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    // Custom error message formatting
    const errorMessages = errors
      .map((err) => {
        // Map each property with validation errors
        const constraints = Object.values(err.constraints || {}).join(', '); // Join multiple constraints for the same property
        return `${err.property}: ${constraints}`;
      })
      .join('\n');

    throw new Error(`Environment validation failed:\n${errorMessages}`);
  }

  return validatedConfig;
}
