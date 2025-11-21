import { EventoEntity } from "src/evento/evento.entity/evento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PonenteEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    tipoPonente: string;

    @Column()
    especialidad: string;

    @OneToMany(() => EventoEntity, evento => evento.ponente)
   eventos: EventoEntity[];

}
