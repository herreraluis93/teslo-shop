import { Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, CreateUserDto, LoginUserResponseDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {  
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({ 
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });
      await this.userRepository.save( user );
      const createUserResponseDto: CreateUserResponseDto = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
        roles: user.roles,
        token: this.getJwtToken({ id: user.id })
      };
      return createUserResponseDto;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true }
    });

    if( !user )
      throw new UnauthorizedException('Credentials are not valid (email)');

    if( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
    const loginUserResponseDto: LoginUserResponseDto = {
      id: user.id,
      email: user.email,
      password: user.password,
      token: this.getJwtToken({ id: user.id })
    };
    return loginUserResponseDto;
  }

  async checkAuthStatus(user: User) {

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken ( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;
  }
  private handleDBErrors( error: any ): never {

    if( error.code === '23505' ) {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
