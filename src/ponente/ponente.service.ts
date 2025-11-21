import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PonenteEntity } from './ponente.entity/ponente.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class PonenteService {
    constructor(
        @InjectRepository(PonenteEntity)
        private readonly ponenteRepository: Repository<PonenteEntity>
    ) {}

    async crearPonente(ponente: PonenteEntity): Promise<PonenteEntity> {
       return await this.ponenteRepository.save(ponente);
   }

    async eliminarPonente(id: number) {
       const ponente: PonenteEntity|null = await this.ponenteRepository.findOne({where:{id}});
       if (!ponente)
         throw new BusinessLogicException("The ponent with the given id was not found", BusinessError.NOT_FOUND);
       if (ponente.eventos.length != 0)
         throw new BusinessLogicException("Cannot have events", BusinessError.NOT_FOUND);
 
       await this.ponenteRepository.remove(ponente);
   }

    async findPonenteById(id: number): Promise<PonenteEntity> {
       const ponente: PonenteEntity|null = await this.ponenteRepository.findOne({where: {id}, relations: ["evento"] } );
       if (!ponente)
         throw new BusinessLogicException("The ponent with the given id was not found", BusinessError.NOT_FOUND);
 
       return ponente;
   }



}
