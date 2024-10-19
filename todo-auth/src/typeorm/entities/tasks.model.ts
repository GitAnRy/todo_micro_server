import { ToDoList } from "src/typeorm/entities/todo-list.model";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tasks'})
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    position: number;


    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 1000})
    description: string;

    @CreateDateColumn()
    date: Date;

    @Column({ nullable: true })
    toDoListId: number

    @ManyToOne(() => ToDoList, (toDoList) => toDoList.tasks)
    toDoList: ToDoList;
}