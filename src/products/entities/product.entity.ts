import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from ".";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '07d5ec7f-8b3d-46ad-b4fe-5e26afbd47a1',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price'
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'A comfortable cotton t-shirt',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L', 'XL'],
        description: 'Product sizes'
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['hoodie', 'sweatshirt'],
        description: 'Product tags'
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];


    //images
    @ApiProperty({
        example: ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'],
        description: 'Product images'
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    @ApiProperty({
        example: {
            'id': 'c8676fe1-e53f-4231-b7ee-c5f6c62644f2',
            'email': 'test1@google.com',
            'fullName': 'Test One',
            'isActive': true,
            'roles': [
                'admin'
            ]
        }
    })
    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User;

    @BeforeInsert()
    checkSlugInsert(){

        if(!this.slug){
            this.slug = this.title;
        }

        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
}
