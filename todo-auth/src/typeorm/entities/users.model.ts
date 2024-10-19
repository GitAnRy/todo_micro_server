import { Progect } from "src/typeorm/entities/progects.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    nickname: string;

    @Column({type: 'varchar'})
    password: string;

    @OneToMany(() => Progect, (progect) => progect.user)
    progects: Progect[];
}