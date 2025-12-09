import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  fullName: string;

  @ApiProperty({
    example: true,
    description: 'User active status',
  })
  isActive: boolean;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'Array of user roles',
    type: [String],
  })
  roles: string[];

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT authentication token',
  })
  token: string;
}