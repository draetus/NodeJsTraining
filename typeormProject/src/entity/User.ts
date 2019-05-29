import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

	@PrimaryGeneratedColumn({type: "int"})
	id: number;

	@Column({type: "varchar", length: 200})
	login: string;

	@Column({type: "varchar", length: 500})
	password: string;

	@Column({type: "varchar", length: 100})
	name: string;

	@Column({type: "int", default: null})
	age: number;

	@Column({type: "tinyint", default: false})
	isHuman: boolean;

	@Column({type: "float", default: 0})
	balance: number;

}