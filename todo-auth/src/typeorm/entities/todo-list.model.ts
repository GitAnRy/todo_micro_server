import { Progect } from "src/typeorm/entities/progects.model";
import { Task } from "src/typeorm/entities/tasks.model";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'lists'})
export class ToDoList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    position: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @CreateDateColumn()
    date: Date;

    @Column({ nullable: true })
    progectId: number

    @ManyToOne(() => Progect, (progect) => progect.toDoLists)
    progect: Progect;

    @OneToMany(() => Task, (task) => task.toDoList)
    tasks: Task[];
}