import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
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
    example: '$2b$10$zpfvNrYFZ/72w8Q3VnNrfe8fNXPNbxlRFeLvrM2PIbrNP7YGVhuda',
    description: 'Hashed user password',
  })
  password: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT authentication token',
  })
  token: string;
}