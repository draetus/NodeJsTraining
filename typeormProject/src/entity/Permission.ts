import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Permission {

	@PrimaryGeneratedColumn({type: "int"})
	id: number;

	@Column({type: "int"})
	idUser: number;

	@Column({type: "varchar", length: 100})
	name: string;
	
}