import { AsistenteEntity } from "src/asistente/asistente.entity/asistente.entity";
import { AuditorioEntity } from "src/auditorio/auditorio.entity/auditorio.entity";
import { PonenteEntity } from "src/ponente/ponente.entity/ponente.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    fecha: string;

    @Column()
    duracionHoras: number;

    @Column()
    estado: string;

    @OneToMany(() => AsistenteEntity, asistente => asistente.evento)
  asistentes: AsistenteEntity[];

  @ManyToOne(() => PonenteEntity, ponente => ponente.eventos)
   ponente: PonenteEntity;

    @ManyToOne(() => AuditorioEntity, auditorio => auditorio.eventos)
   auditorio: AuditorioEntity;


}
