import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from './evento.entity/evento.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
  ) {}

  async crearEvento(evento: EventoEntity): Promise<EventoEntity> {
    if (evento.duracionHoras < 0)
      throw new BusinessLogicException(
        'The event duration needs to be positive',
        BusinessError.NOT_FOUND,
      );
    if (evento ==  && evento.descripcion < 50)
      throw new BusinessLogicException(
        'Description needs to be longer than 50 chars',
        BusinessError.NOT_FOUND,
      );
    if (!evento)
      throw new BusinessLogicException(
        'The event with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.eventoRepository.save(evento);
  }

  async eliminarEvento(id: number) {
    const evento: EventoEntity | null = await this.eventoRepository.findOne({
      where: { id },
    });
    if (!evento)
      throw new BusinessLogicException(
        'The event with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.eventoRepository.remove(evento);
  }

  async findEventoById(id: number): Promise<EventoEntity> {
    const evento: EventoEntity|null = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'asistentes','auditorio'],
    });
    if (!evento)
      throw new BusinessLogicException(
        'The event with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return evento;
  }

  async aprobarEvento(id: number): Promise<EventoEntity> {
    const evento: EventoEntity|null = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'asistentes','auditorio'],
    });
    if (!evento)
      throw new BusinessLogicException(
        'The event with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (evento.auditorio == null)
      throw new BusinessLogicException(
        'The event has no auditory',
        BusinessError.NOT_FOUND,
      );
    evento.estado="aprobado"
    return evento;
  }
}
