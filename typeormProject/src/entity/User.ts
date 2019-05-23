import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

	@PrimaryGeneratedColumn({type: "int"})
	id: number;

	@Column({type: "varchar", length: 45})
	name: string;

	@Column({type: "int"})
	age: number;

	@Column({type: "varchar", length: 45})
	sex: string;

	@Column({type: "varchar", length: 45})
	phone: string;

	@Column({type: "tinyint"})
	isHuman: boolean;

}