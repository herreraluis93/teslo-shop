import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto, CreateUserResponseDto, LoginUserResponseDto } from './dto';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered', type: CreateUserResponseDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'User logged in', type: LoginUserResponseDto })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({ status: 200, description: 'User auth checked', type: CreateUserResponseDto })
  checkAuthStatus(
    @GetUser() user: User,
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {

    console.log(request);
    return {
      ok: true,
      message: 'Hola mundo private',
      user,
      userEmail,
      rawHeaders,
    };
  }
  
  @Get('private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
  // @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards( AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
      return {
        ok: true,
        user,
      };
    }

  @Get('private3')
  @Auth()
  privateRoute3(
    @GetUser() user: User,
  ) {
      return {
        ok: true,
        user,
      };
    }
}
