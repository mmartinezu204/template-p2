import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsistenteEntity } from './asistente.entity/asistente.entity';
import { Repository } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AsistenteService {
    constructor(
        @InjectRepository(AsistenteEntity)
        private readonly asistenteRepository: Repository<AsistenteEntity>,
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>,
      ) {}
    
      async refistrarAsistente(eventoId: number, asistente: AsistenteEntity): Promise<EventoEntity> {
       const evento: EventoEntity|null = await this.eventoRepository.findOne({where: {id: eventoId}, relations: ["asistentes"]});
 
       if (!evento)
         throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
 
       for (let i = 0; i < artworks.length; i++) {
         const artwork: ArtworkEntity = await this.artworkRepository.findOne({where: {id: artworks[i].id}});
 
       evento.asistentes;
       return await this.eventoRepository.save(evento);
     }

    
       async findAsistentesByEvento(eventoId: number): Promise<AsistenteEntity[]> {
       const evento: EventoEntity|null = await this.eventoRepository.findOne({where: {id: eventoId}, relations: ["asistentes"]});
       if (!evento)
         throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
 
       return evento.asistentes;
   }
}
