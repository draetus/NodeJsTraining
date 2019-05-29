import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {

	@PrimaryGeneratedColumn({type: "int"})
	id: number;

	@Column({type: "varchar", length: 200})
	name: string;

	@Column({type: "float"})
	price: number;

	@Column({type: "int", default: 0})
	quantity: number;

}