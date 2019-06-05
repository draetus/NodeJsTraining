import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Movimentation {

	@PrimaryGeneratedColumn({type: "int"})
	id: number;

	@Column({type: "int"})
	idProduct: number;

	@Column({type: "int"})
	idUser: number;

	@Column({type: "date"})
	date: Date;

	@Column({type: "float"})
	price: number;

	@Column({type: "int", default: 1})
	quantity: number;

}