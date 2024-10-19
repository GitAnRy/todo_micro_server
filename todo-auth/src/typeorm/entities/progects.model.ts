import { ToDoList } from "src/typeorm/entities/todo-list.model";
import { User } from "src/typeorm/entities/users.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'progects'})
export class Progect {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @CreateDateColumn()
    date: Date;

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => User, (user) => user.progects)
    user: User;

    @OneToMany(() => ToDoList, (toDoList) => toDoList.progect)
    toDoLists: ToDoList[];

}